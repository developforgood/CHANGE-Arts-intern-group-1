import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Image,
  Button,
  ButtonGroup,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  CheckboxGroup,
  Checkbox,
  Heading,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Badge,
} from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import { RiArrowDropDownLine } from 'react-icons/ri';
import EventCard from '../components/EventCard';
import DistanceSlider from '../components/DistanceSlider';
import AgeSlider from '../components/AgeSlider';
import TagField from '../components/FormComponents/TagField';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import vectorhoriz from '../assets/vector-horiz.png';
import vector from '../assets/vector.png';
import noevents from '../assets/no-events.png';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import eventJSON from '../../db/events.json';
import categoryJSON from '../../db/categories.json';
import themeJSON from '../../db/themes.json';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const MODE = import.meta.env.VITE_MODE;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function IndeterminateCheckbox({
  category,
  disciplines,
  categoryFilter,
  setCategoryFilter,
  disciplineFilter,
  setDisciplineFilter,
}) {
  const [checkedDisciplines, setCheckedDisciplines] = useState(
    new Array(disciplines.length).fill(false),
  );

  const allChecked = checkedDisciplines.every(Boolean);
  const isIndeterminate = checkedDisciplines.some(Boolean) && !allChecked;

  // console.log('selected:', category, checkedDisciplines, isIndeterminate);

  useEffect(() => {
    if (!categoryFilter.has(category)) {
      setCheckedDisciplines(new Array(disciplines.length).fill(false));
    }
  }, [categoryFilter]);

  const handleCategoryFilter = (checked, category) => {
    if (checked) {
      setCategoryFilter(prev => new Set(prev).add(category));
    } else {
      setCategoryFilter(prev => {
        const next = new Set(prev);
        next.delete(category);
        return next;
      });
    }
  };

  const handleDisciplineFilter = (checked, discipline) => {
    if (checked) {
      setDisciplineFilter(prev => new Set(prev).add(discipline));
    } else {
      setDisciplineFilter(prev => {
        const next = new Set(prev);
        next.delete(discipline);
        return next;
      });
    }
  };

  return (
    <>
      <Stack spacing={[1, 3]} direction={['column']}>
        <Checkbox
          isChecked={
            disciplines.length > 0
              ? allChecked || categoryFilter.has(category)
              : categoryFilter.has(category)
          }
          isIndeterminate={isIndeterminate}
          onChange={e => {
            handleCategoryFilter(e.target.checked, category);
            setCheckedDisciplines(
              new Array(disciplines.length).fill(e.target.checked),
            );
          }}
        >
          {category}
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          {disciplines.length > 0 &&
            disciplines.map((discipline, i) => (
              <Checkbox
                key={i}
                isChecked={
                  checkedDisciplines[i] || disciplineFilter.has(discipline)
                }
                onChange={e => {
                  handleDisciplineFilter(e.target.checked, discipline);
                  checkedDisciplines[i] = e.target.checked;
                  setCheckedDisciplines([...checkedDisciplines]);
                }}
              >
                {discipline}
              </Checkbox>
            ))}
        </Stack>
      </Stack>
    </>
  );
}

export default function Search() {
  const location = useLocation();
  const {
    initialQuery,
    attendanceType,
    initialCategory,
    initialAgeMin,
    initialAgeMax,
    initialStartDate,
    initialEndDate,
    latitude,
    longitude,
    initialDistance,
  } = location.state || {};
  const [firstRender, setFirstRender] = useState(true);
  const [events, setEvents] = useState([]);
  const [categoryDB, setCategoryDB] = useState([]);
  const [themeDB, setThemeDB] = useState([]);

  const [query, setQuery] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const [virtualFilter, setVirtualFilter] = useState(
    attendanceType ? attendanceType === 'virtual' : true,
  );
  const [inPersonFilter, setInPersonFilter] = useState(
    attendanceType ? attendanceType === 'inPerson' : true,
  );
  const [tagsData, setTagsData] = useState({ tags: [] });
  const [warningsData, setWarningsData] = useState({ warnings: [] });
  const [categoryFilter, setCategoryFilter] = useState(new Set());
  const [disciplineFilter, setDisciplineFilter] = useState(new Set());
  const [styleFilter, setStyleFilter] = useState(new Set());
  const [themeFilter, setThemeFilter] = useState(new Set());

  const [minAge, setMinAge] = useState(initialAgeMin);
  const [maxAge, setMaxAge] = useState(initialAgeMax ? initialAgeMax : 21);
  const [ageSliderDisabled, setAgeSliderDisabled] = useState(
    !initialAgeMin && !initialAgeMax ? true : false,
  );
  const [distanceSliderDisabled, setDistanceSliderDisabled] = useState(
    initialDistance ? false : true,
  );

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const geocodingLibrary = useMapsLibrary('geocoding');

  const [distance, setDistance] = useState(
    initialDistance ? initialDistance : 0,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const ResultsPerPage = 12;
  const startIndex = (currentPage - 1) * ResultsPerPage;
  const endIndex = startIndex + ResultsPerPage;

  const disciplines = category =>
    Object.entries(categoryDB).filter(item => item[0] === category)[0][1][
      'disciplines'
    ];

  const styles = Object.entries(categoryDB)
    .flatMap(item => item[1]['styles'])
    .sort();
  const distinctStyles = [...new Set(styles)];
  const themes = Object.values(themeDB).flat();

  // Initial Query
  // TODO: Handle partial/complete search logic better
  const getQueryResults = keyword =>
    events.filter(
      item =>
        // Check if attendance dropdown applied
        ((virtualFilter && item.location_types.includes('virtual')) ||
          (inPersonFilter && item.location_types.includes('inPerson'))) &&
        // Check search term
        (containsPhrase(item.title.toLowerCase(), keyword.toLowerCase()) ||
          containsPhrase(item.organizer.toLowerCase(), keyword.toLowerCase()) ||
          containsPhrase(
            item.description.toLowerCase(),
            keyword.toLowerCase(),
          )),
    );

  const containsPhrase = (text, phrase) => {
    return text.includes(`${phrase}`);
  };

  const navigate = useNavigate();

  const handleSearchInputChange = e => {
    const input = e.target.value;
    setQuery(input);
  };

  const handleSearch = input => {
    const results = getQueryResults(input);
    setFilteredEvents(results);
  };

  const handleStyleFilter = (checked, style) => {
    if (checked) {
      setStyleFilter(prev => new Set(prev).add(style));
    } else {
      setStyleFilter(prev => {
        const next = new Set(prev);
        next.delete(style);
        return next;
      });
    }
  };

  const handleThemeFilter = (checked, theme) => {
    if (checked) {
      setThemeFilter(prev => new Set(prev).add(theme));
    } else {
      setThemeFilter(prev => {
        const next = new Set(prev);
        next.delete(theme);
        return next;
      });
    }
  };

  const handleFilterChange = async () => {
    const categoryArray = Array.from(categoryFilter);
    const disciplineArray = Array.from(disciplineFilter);

    const results = await Promise.all(
      events.map(async item => {
        // Check search term
        const searchTermMatch =
          containsPhrase(item.title.toLowerCase(), query.toLowerCase()) ||
          containsPhrase(item.organizer.toLowerCase(), query.toLowerCase()) ||
          containsPhrase(item.description.toLowerCase(), query.toLowerCase());

        if (!searchTermMatch && query) return false;

        // Age Restrictions
        const ageFilter = item.min_age <= minAge && maxAge <= item.max_age;

        // Location Type
        const locationFilter =
          (virtualFilter && item.location_types.includes('virtual')) ||
          (inPersonFilter && item.location_types.includes('inPerson'));

        // Date Range
        const dateFilter =
          (!endDate ||
            !item.start_date ||
            new Date(item.start_date) <= new Date(endDate)) &&
          (!startDate ||
            !item.end_date ||
            new Date(item.end_date) >= new Date(startDate));

        // Category and Discipline
        const categoryDisciplineFilter =
          (categoryArray.length === 0 ||
            categoryArray.some(category => item.category === category)) &&
          (disciplineArray.length === 0 ||
            disciplineArray.some(discipline => item.discipline === discipline));

        // Tag
        const tagFilter =
          tagsData['tags'].length === 0 ||
          tagsData['tags'].some(tag => item.tags.includes(tag));

        // Content Warnings
        const warningFilter =
          warningsData['warnings'].length === 0 ||
          !warningsData['warnings'].some(warning =>
            item.content_warnings.includes(warning),
          );

        // Distance
        let distanceFilter = true;
        if (
          item.address &&
          !(virtualFilter && item.location_types.includes('virtual'))
        ) {
          const { latitude: eventLat, longitude: eventLng } = await new Promise(
            (resolve, reject) => {
              geocodeAddress(item.address, ({ latitude, longitude }) => {
                resolve({ latitude, longitude });
              });
            },
          );
          const itemDist = calculateDistance(
            latitude,
            longitude,
            eventLat,
            eventLng,
          );
          distanceFilter = itemDist <= distance;
        }

        return (
          (ageSliderDisabled || ageFilter) &&
          locationFilter &&
          categoryDisciplineFilter &&
          tagFilter &&
          warningFilter &&
          ((startDate && endDate) || dateFilter) &&
          (distanceSliderDisabled || distanceFilter)
        );
      }),
    );

    const filteredResults = events.filter((_, index) => results[index]);

    setFilteredEvents(filteredResults);
    setIsFilterApplied(true);
  };

  const fetchData = async () => {
    let eventData = new Array();
    if (MODE == 'prod') {
      await getDocs(collection(db, 'events'))
        .then(querySnapshot => {
          eventData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
        })
        .catch(() => {
          console.log('Error fetching events');
        });
    } else {
      for (let i = 0; i < eventJSON.length; i++) {
        let event = eventJSON[i];
        eventData.push(JSON.parse(event));
      }
    }
    setEvents(eventData);
    setCategoryDB(categoryJSON);
    setThemeDB(themeJSON);
  };

  const geocodeAddress = (address, callback) => {
    if (!geocodingLibrary) return;
    const geocoder = new geocodingLibrary.Geocoder();
    // Define the geocoding request
    const geocodingRequest = {
      address: address,
    };
    geocoder.geocode(geocodingRequest, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          callback({ latitude, longitude });
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  };

  const displayedEvents = (
    filteredEvents.length === 0 && !query && !isFilterApplied
      ? events
      : filteredEvents
  ).slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    (filteredEvents.length === 0 && !query && !isFilterApplied
      ? events.length
      : filteredEvents.length) / ResultsPerPage,
  );

  const handleTagData = (field, newData) => {
    setTagsData(prevData => ({
      ...prevData,
      [field]: newData,
    }));
  };

  const handleWarningsData = (field, newData) => {
    setWarningsData(prevData => ({
      ...prevData,
      [field]: newData,
    }));
  };

  const handleDeleteSearchTag = (tagID, value = true) => {
    switch (tagID) {
      case 'age':
        setAgeSliderDisabled(true);
        break;
      case 'virtual':
        setVirtualFilter(false);
        break;
      case 'inPerson':
        setInPersonFilter(false);
        break;
      case 'category':
        setCategoryFilter(prev => {
          const next = new Set(prev);
          next.delete(value);
          return next;
        });
        break;
      default:
        break;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance / 1.6;
  };

  useEffect(() => {
    if (initialCategory) {
      setCategoryFilter(prev => new Set(prev).add(initialCategory));
    }

    // Loading initial render
    const loadFirstRender = async () => {
      if (firstRender) {
        if (events.length !== 0) {
          setQuery(initialQuery || '');
          handleFilterChange();
          setFirstRender(false);
        } else {
          await fetchData();
        }
      }
    };

    loadFirstRender();
  }, [attendanceType, initialCategory, events, initialQuery, firstRender]);

  useEffect(() => {
    handleFilterChange();
  }, [
    query,
    virtualFilter,
    inPersonFilter,
    categoryFilter,
    disciplineFilter,
    styleFilter,
    themeFilter,
    minAge,
    maxAge,
    tagsData,
    warningsData,
    ageSliderDisabled,
    startDate,
    endDate,
    distance,
    distanceSliderDisabled,
  ]);

  return (
    <APIProvider apiKey={'AIzaSyAU4Rd2-QC-mxDH7RDZN_acpbLLEkdz0og'}>
      <>
        <NavigationBar />
        {/* Search bar */}

        <Flex>
          <Flex
            backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${vector})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            {/* Filters */}
            <Flex
              direction={'column'}
              flexBasis={'fit-content'}
              minWidth={'30vw'}
              gap={'3vh'}
              margin={'2vw'}
              padding={'2vw'}
              borderRadius={'md'}
              bg={'rgba(200, 200, 200, 0.5)'}
              boxShadow={'lg'}
            >
              <Text
                fontSize="4xl"
                color="white"
                font="DM Sans"
                textAlign={'center'}
              >
                Find Your Art.
              </Text>

              {/* Search */}
              <InputGroup width="100%">
                <InputLeftElement pointerEvents="none">
                  <CiSearch color="white" />
                </InputLeftElement>
                <Input
                  color="white"
                  variant="flushed"
                  placeholder="What are you looking for today?"
                  _placeholder={{ opacity: 0.5, color: 'white' }}
                  value={query}
                  onChange={handleSearchInputChange}
                />
              </InputGroup>

              {/* Virtual filter */}
              <Flex>
                <CheckboxGroup>
                  <Stack spacing={[1, 100]} direction={['row']}>
                    <Checkbox
                      isChecked={virtualFilter}
                      colorScheme="white"
                      color="white"
                      onChange={e => setVirtualFilter(e.target.checked)}
                    >
                      Virtual
                    </Checkbox>
                    <Checkbox
                      isChecked={inPersonFilter}
                      colorScheme="white"
                      color="white"
                      onChange={e => setInPersonFilter(e.target.checked)}
                    >
                      In-person
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Flex>

              <Flex width="100%">
                {/* Start Date Field */}
                <FormControl isDisabled>
                  <FormLabel color="white">Start Date</FormLabel>
                  <Input
                    type="date"
                    placeholder="Select start date"
                    color="white"
                    defaultValue={initialStartDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </FormControl>

                {/* End Date Field */}
                <FormControl ml={4} isDisabled>
                  <FormLabel color="white">End Date</FormLabel>
                  <Input
                    type="date"
                    placeholder="Select end date"
                    color="white"
                    defaultValue={initialEndDate}
                    onChange={e => {
                      setEndDate(e.target.value);
                      console.log('End Date selected:', e.target.value);
                    }}
                  />
                </FormControl>
              </Flex>

              {/* Location Slider */}
              <Stack direction="column">
                <Button
                  variant="outline"
                  color="white"
                  size="sm"
                  fontWeight={'sm'}
                  width="100%"
                  mt="2"
                  mb="2"
                  onClick={() =>
                    setDistanceSliderDisabled(!distanceSliderDisabled)
                  }
                >
                  {distanceSliderDisabled ? 'Enable' : 'Disable'} Distance
                  Filter
                </Button>
                {!distanceSliderDisabled && (
                  <Stack mb="6" spacing="1" color="white">
                    <Text>Distance</Text>
                    <DistanceSlider
                      color="gray"
                      onValueChange={distance => {
                        if (!distance) {
                          setDistanceSliderDisabled(true);
                        }
                        setDistance(distance);
                      }}
                      initialValue={initialDistance}
                    />
                  </Stack>
                )}
              </Stack>

              {/* Age Slider */}
              <Stack direction="column">
                <Button
                  variant="outline"
                  color="white"
                  size="sm"
                  fontWeight={'sm'}
                  width="100%"
                  mb="2"
                  onClick={() => setAgeSliderDisabled(!ageSliderDisabled)}
                >
                  {ageSliderDisabled ? 'Enable' : 'Disable'} Age Filter
                </Button>
                {!ageSliderDisabled && (
                  <Stack mb="6" spacing="1" color="white">
                    <Text mb="1">Age Range</Text>
                    <AgeSlider
                      onValuesChange={(minValue, maxValue) => {
                        setMinAge(minValue);
                        setMaxAge(maxValue);
                      }}
                      isDisabled={ageSliderDisabled}
                      initialMin={minAge}
                      initialMax={maxAge}
                    />
                  </Stack>
                )}
              </Stack>

              {/* Tags */}
              <TagField
                title="Tags"
                placeholder="e.g., History"
                field="tags"
                data={tagsData}
                handleData={handleTagData}
                message={''}
                color="white"
              />

              {/* Content Warnings */}
              <TagField
                title="Content Warnings"
                placeholder="e.g., Violence"
                field="warnings"
                data={warningsData}
                handleData={handleWarningsData}
                message={'Filter out content'}
                color="white"
              />

              {/* Checkbox Filters */}
              <Accordion allowToggle defaultIndex={[0]}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" color="white">
                        Category
                      </Box>
                      <RiArrowDropDownLine color="white" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup colorScheme="white">
                      <Stack
                        spacing={[1, 3]}
                        direction={['column']}
                        color="white"
                      >
                        {Object.keys(categoryDB).map((category, id) => (
                          <IndeterminateCheckbox
                            key={id}
                            category={category}
                            disciplines={disciplines(category)}
                            categoryFilter={categoryFilter}
                            setCategoryFilter={setCategoryFilter}
                            disciplineFilter={disciplineFilter}
                            setDisciplineFilter={setDisciplineFilter}
                          />
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem isDisabled>
                  <h2>
                    <AccordionButton>
                      <Flex as="span" flex="1" direction="row" textAlign="left">
                        <Text color="white">Universal Themes</Text>
                      </Flex>
                      <Badge variant="subtle"> Coming Soon! </Badge>
                      {/* <RiArrowDropDownLine color="white"/> */}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup>
                      <Stack spacing={[1, 3]} direction={['column']}>
                        {themes.map((theme, id) => (
                          <Checkbox
                            key={id}
                            color="white"
                            isChecked={themeFilter.has(theme)}
                            onChange={e =>
                              handleThemeFilter(e.target.checked, theme)
                            }
                          >
                            {theme}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem isDisabled>
                  <h2>
                    <AccordionButton>
                      <Flex as="span" flex="1" direction="row" textAlign="left">
                        <Text color="white">Styles</Text>
                      </Flex>
                      <Badge variant="subtle"> Coming Soon! </Badge>
                      {/* <RiArrowDropDownLine color="white"/> */}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup>
                      <Stack spacing={[1, 3]} direction={['column']}>
                        {distinctStyles.map((style, id) => (
                          <Checkbox
                            key={id}
                            color="white"
                            isChecked={styleFilter.has(style)}
                            onChange={e =>
                              handleStyleFilter(e.target.checked, style)
                            }
                          >
                            {style}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>

          {/* Search Sentence */}
          <Stack>
            {query || isFilterApplied ? (
              <Flex direction="column">
                {filteredEvents.length ? (
                  <Text ml="1.25rem">
                    {filteredEvents.length} results match your search
                  </Text>
                ) : (
                  ''
                )}
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  mt={'0.75rem'}
                  ml="1.25rem"
                >
                  {query ? (
                    <Tag
                      size="lg"
                      colorScheme="facebook"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>{`"${query}"`}</TagLabel>
                    </Tag>
                  ) : (
                    <Tag
                      size="lg"
                      colorScheme="facebook"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>All Events</TagLabel>
                    </Tag>
                  )}
                  {!distanceSliderDisabled && distance && (
                    <Tag
                      size="lg"
                      colorScheme="blackAlpha"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>Within {distance} miles</TagLabel>
                    </Tag>
                  )}
                  {!ageSliderDisabled &&
                    (minAge === 0 && maxAge >= 21 ? (
                      <Tag
                        size="lg"
                        colorScheme="orange"
                        borderRadius="full"
                        mr={2}
                      >
                        <TagLabel>All Ages</TagLabel>
                        <TagCloseButton
                          onClick={() => handleDeleteSearchTag('age')}
                        />
                      </Tag>
                    ) : (
                      <Tag
                        size="lg"
                        colorScheme="orange"
                        borderRadius="full"
                        mr={2}
                      >
                        <TagLabel>
                          Ages {minAge === '' ? '0' : minAge}
                          {maxAge >= 21 ? '+' : ` - ${maxAge}`}
                        </TagLabel>
                        <TagCloseButton
                          onClick={() => handleDeleteSearchTag('age')}
                        />
                      </Tag>
                    ))}
                  {virtualFilter && (
                    <Tag
                      size="lg"
                      colorScheme="purple"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>Virtual</TagLabel>
                      <TagCloseButton
                        onClick={() => handleDeleteSearchTag('virtual')}
                      />
                    </Tag>
                  )}
                  {inPersonFilter && (
                    <Tag
                      size="lg"
                      colorScheme="purple"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>In-person</TagLabel>
                      <TagCloseButton
                        onClick={() => handleDeleteSearchTag('inPerson')}
                      />
                    </Tag>
                  )}
                  {Array.from(categoryFilter).map((category, index) => (
                    <Tag
                      key={index}
                      size="lg"
                      colorScheme="green"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>{category}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          handleDeleteSearchTag('category', category)
                        }
                      />
                    </Tag>
                  ))}
                  {/* {Array.from(disciplineFilter).map((discipline, index) => (
                      <Tag key={index} size='lg' colorScheme='green' borderRadius='full' mr={2}>
                        <TagLabel>{discipline}</TagLabel>
                        <TagCloseButton/>
                      </Tag>
                  ))} */}
                  {Array.from(tagsData['tags']).map((tag, index) => (
                    <Tag
                      key={index}
                      size="lg"
                      colorScheme="blue"
                      borderRadius="full"
                      mr={2}
                    >
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                  {Array.from(warningsData['warnings']).map(
                    (warning, index) => (
                      <Tag
                        key={index}
                        size="lg"
                        colorScheme="red"
                        borderRadius="full"
                        mr={2}
                      >
                        <TagLabel>Exclude {warning}</TagLabel>
                      </Tag>
                    ),
                  )}
                </Stack>
              </Flex>
            ) : (
              <></>
            )}

            {/* Query Results */}
            {filteredEvents.length !== 0 ? (
              <Flex flexWrap={'wrap'} gap={5} padding={'1vw'}>
                {displayedEvents.map((event, id) => (
                  <EventCard key={id} {...event} />
                ))}
              </Flex>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                height="600px"
                ml="350"
              >
                <Image
                  src={noevents}
                  alt="No events found"
                  width="300px"
                  height="auto"
                  transform="scale(0.5)"
                />
                <Text color="gray.600">
                  No events found. Try refining your search!
                </Text>
              </Flex>
            )}

            {/* Pagination controls */}
            {filteredEvents.length !== 0 && (
              <Box mt={4} ml={225}>
                <ButtonGroup spacing={20}>
                  {/* Previous page button */}
                  <Button
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      scrollToTop();
                    }}
                    style={
                      currentPage === 1
                        ? { pointerEvents: 'none', opacity: 0.5 }
                        : {}
                    }
                    {...(currentPage === 1 && { pointerEvents: 'none' })}
                  >
                    Previous
                  </Button>
                  <Text mt={2}>
                    {' '}
                    Page {currentPage} of {totalPages}{' '}
                  </Text>
                  {/* Next page button */}
                  <Button
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      scrollToTop();
                    }}
                    style={
                      currentPage === totalPages
                        ? { pointerEvents: 'none', opacity: 0.5 }
                        : {}
                    }
                    {...(currentPage === totalPages && {
                      pointerEvents: 'none',
                    })}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </Stack>
        </Flex>
        <Footer />
      </>
    </APIProvider>
  );
}
