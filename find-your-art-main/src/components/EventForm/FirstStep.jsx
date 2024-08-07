import { useState, forwardRef, useEffect, useRef } from 'react';
import { TimeIcon, CalendarIcon } from '@chakra-ui/icons';
import { MdUploadFile } from 'react-icons/md';

import DatePicker from 'react-datepicker';
import categoriesData from '../../../db/categories.json';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Tag,
  Flex,
  TagLabel,
  TagCloseButton,
  FormHelperText,
  RadioGroup,
  Stack,
  Radio,
  Select,
  InputGroup,
  InputLeftElement,
  Textarea,
  List,
  Button,
  ListItem,
  Checkbox,
  CheckboxGroup,
  Box,
  VStack,
  Icon,
} from '@chakra-ui/react';
import AddressField from '../FormComponents/AddressField';

const ChakraDatePickerInput = forwardRef(
  ({ value, onClick, onChange }, ref) => (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none" // Allows the click event to pass through to the input
        children={<CalendarIcon />} // Here's the calendar icon from Chakra UI
      />
      <Input
        pl="2.5rem" // Adjust padding to fit the icon
        value={value}
        onChange={onChange} // Handle change event
        onClick={onClick} // <-- Make sure to pass down the onClick handler
        ref={ref} // Forward the ref to the input element
        readOnly
        cursor="pointer"
      />
    </InputGroup>
  ),
);

export default function FirstStep({ data, handleData }) {
  const fileInput = useRef(null);
  const [isInPersonSelected, setIsInPersonSelected] = useState(false);
  const [isVirtualSelected, setIsVirtualSelected] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const disciplines = data.category
    ? categoriesData[data.category]?.disciplines || []
    : [];
  const styles = data.category
    ? categoriesData[data.category]?.styles || []
    : [];

  const updateLocationTypes = (isChecked, type) => {
    let updatedLocationTypes = [...data.location_types];

    if (isChecked) {
      if (!updatedLocationTypes.includes(type)) {
        updatedLocationTypes.push(type);
      }
    } else {
      updatedLocationTypes = updatedLocationTypes.filter(t => t !== type);
    }

    handleData('location_types', updatedLocationTypes);
  };

  function handleTagKeyDown(e) {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value) {
      handleData('tags', [...data['tags'], e.target.value]);
      e.target.value = '';
      e.preventDefault();
    } else return;
  }

  function handleWarningKeyDown(e) {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value) {
      handleData('content_warnings', [
        ...data['content_warnings'],
        e.target.value,
      ]);
      e.target.value = '';
      e.preventDefault();
    } else return;
  }

  function handleDeleteTag(pIndex) {
    handleData(
      'tags',
      data['tags'].filter((tag, index) => pIndex !== index),
    );
  }

  function handleDeleteWarning(pIndex) {
    handleData(
      'content_warnings',
      data['content_warnings'].filter((warning, index) => pIndex !== index),
    );
  }

  const handleInPersonChange = e => {
    setIsInPersonSelected(e.target.checked);
    updateLocationTypes(e.target.checked, 'inPerson');
  };

  const handleVirtualChange = e => {
    setIsVirtualSelected(e.target.checked);
    updateLocationTypes(e.target.checked, 'virtual');
  };

  function handleStartDateChange(e) {
    const dateString = e.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    handleData('start_date', dateString);
    setStartDate(e);
  }

  function handleEndDateChange(e) {
    const dateString = e.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    handleData('end_date', dateString);
    setEndDate(e);
  }

  function handleAddressData(field, value) {
    handleData(field, value);
  }

  // Set date to current date unless changed by user through date picker
  useEffect(() => {
    handleStartDateChange(startDate);
    handleEndDateChange(endDate);
  }, []);

  return (
    <Flex ml={'2.25rem'}>
      <Flex
        direction={'column'}
        position={'fixed'}
        justifySelf={'left'}
        mt={'6rem'}
      >
        <List>
          <ListItem mb={'1.5rem'}>
            <a href="#basic-information">Basic Information</a>
          </ListItem>
          <ListItem mb={'1.5rem'}>
            <a href="#tags">Themes</a>
          </ListItem>
          <ListItem mb={'1.5rem'}>
            <a href="#location">Location</a>
          </ListItem>
          <ListItem mb={'1.5rem'}>
            <a href="#date&time">Date & Time</a>
          </ListItem>
          <ListItem mb={'1.5rem'}>
            <a href="#event-description">Event Description</a>
          </ListItem>
          <ListItem mb={'1.5rem'}>
            <a href="#event-images">Event Image(s)</a>
          </ListItem>
        </List>
      </Flex>
      <Flex direction={'column'} w={'50%'} ml={'25%'} mt={'6rem'}>
        <Heading as={'h1'} mb={'1rem'}>
          User Registration
        </Heading>
        <Text mb={'2rem'}>
          Please provide more information about this event by filling out this
          form. If you have any questions throughout this process, feel free to
          check out our FAQs page or reach out to us at info@changearts.org.
        </Text>

        <Heading
          id="basic-information"
          as={'h2'}
          scrollMarginTop={'4.25rem'}
          mb={'1rem'}
          size={'lg'}
        >
          Basic Information
        </Heading>
        <FormControl isRequired mb={'1rem'}>
          <FormLabel htmlFor="create-title">Event Title</FormLabel>
          <Input
            id="create-title"
            type="text"
            placeholder="e.g., Technicolour Dreams"
            defaultValue={data.title ? data.title : ''}
            onChange={e => handleData('title', e.target.value)}
          />
        </FormControl>

        <Stack mb={'1rem'}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              defaultValue={data.category}
              onChange={e => handleData('category', e.target.value)}
            >
              {Object.keys(categoriesData).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          <Stack ml={'2rem'}>
            <FormLabel>Discipline</FormLabel>
            <Select
              placeholder="Select discipline"
              defaultValue={data.discipline}
              onChange={e => handleData('discipline', e.target.value)}
            >
              {disciplines.map(discipline => (
                <option key={discipline} value={discipline}>
                  {discipline}
                </option>
              ))}
            </Select>
          </Stack>

          <Stack ml={'2rem'}>
            <FormLabel>Style</FormLabel>
            <Select
              placeholder="Select style"
              defaultValue={data.style}
              onChange={e => handleData('style', e.target.value)}
            >
              {styles.map(style => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </Select>
          </Stack>
        </Stack>

        <FormControl isRequired mb={'1rem'}>
          <FormLabel htmlFor="create-url">Ticket Purchase Link</FormLabel>
          <Input
            id="create-url"
            type="text"
            placeholder="https://google.com"
            defaultValue={data.ticketURL ? data.ticketURL : ''}
            onChange={e => handleData('ticketURL', e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={'1rem'}>
          <FormLabel htmlFor="create-student-price">
            Ticket Price - Student
          </FormLabel>
          <Input
            id="create-student-price"
            type="number"
            defaultValue={data.student_price ? data.student_price : 0}
            onChange={e => handleData('student_price', e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mb={'2rem'}>
          <FormLabel htmlFor="create-adult-price">
            Ticket Price - Teacher/Chaperone
          </FormLabel>
          <Input
            id="create-adult-price"
            type="number"
            defaultValue={data.adult_price ? data.adult_price : 0}
            onChange={e => handleData('adult_price', e.target.value)}
          />
        </FormControl>

        <Heading
          id="tags"
          size={'lg'}
          as={'h2'}
          scrollMarginTop={'4.25rem'}
          mb={'1rem'}
        >
          Tags
        </Heading>
        <FormControl>
          <Text mb={'1rem'}>
            Increase the discoverability of your event by adding up to 10 tags.
            Furthemore, notify users of mature content.
          </Text>
          <FormLabel htmlFor="create-tags">Tags</FormLabel>
          <Flex
            borderRadius={'0.375rem'}
            p={'0 0.25rem 0.25rem 0.25rem'}
            wrap={'wrap'}
            border={'1px'}
            borderColor={'gray.300'}
            w={'100%'}
            _focusWithin={{ borderColor: '#3182ce', borderWidth: '2px' }}
          >
            {data['tags'].map((tag, index) => {
              return (
                <Tag key={index} mr={'0.5rem'} mt={'0.25rem'}>
                  <TagLabel w={'fit-content'} pt={0}>
                    {tag}
                  </TagLabel>
                  <TagCloseButton onClick={() => handleDeleteTag(index)} />
                </Tag>
              );
            })}
            <Input
              id="create-tags"
              type="text"
              _focus={{ boxShadow: 'none' }}
              w={'max-content'}
              border={'none'}
              placeholder="e.g., technology"
              onKeyDown={e => handleTagKeyDown(e)}
            />
          </Flex>
          <FormHelperText
            mb={'1rem'}
          >{`${data['tags'].length}/10 tags`}</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="add-content-warnings">Content Warnings</FormLabel>
          <Flex
            borderRadius={'0.375rem'}
            p={'0 0.25rem 0.25rem 0.25rem'}
            wrap={'wrap'}
            border={'1px'}
            borderColor={'gray.300'}
            w={'100%'}
            _focusWithin={{ borderColor: '#3182ce', borderWidth: '2px' }}
          >
            {data['content_warnings'].map((content_warning, index) => {
              return (
                <Tag key={index} mr={'0.5rem'} mt={'0.25rem'}>
                  <TagLabel w={'fit-content'} pt={0}>
                    {content_warning}
                  </TagLabel>
                  <TagCloseButton onClick={() => handleDeleteWarning(index)} />
                </Tag>
              );
            })}
            <Input
              id="add-content-warnings"
              type="text"
              _focus={{ boxShadow: 'none' }}
              w={'max-content'}
              border={'none'}
              placeholder="e.g., violence"
              onKeyDown={e => handleWarningKeyDown(e)}
            />
          </Flex>
          <FormHelperText
            mb={'1rem'}
          >{`${data['content_warnings'].length}/10 warnings`}</FormHelperText>
        </FormControl>

        <Text mb="0.5rem"> Age Restrictions </Text>
        <Flex mb={'2rem'}>
          <FormControl mb={'0.5rem'} mr={2}>
            <FormLabel htmlFor="create-min-age">Min</FormLabel>
            <InputGroup>
              <Input
                id="create-min-age"
                type="number"
                min={0}
                max={100}
                placeholder="> 0"
                onChange={e =>
                  handleData(
                    'min_age',
                    e.target.value === '' ? 0 : parseInt(e.target.value),
                  )
                }
              />
            </InputGroup>
            <FormHelperText mb={'1rem'}>
              Leave blank if your event is open to all ages!
            </FormHelperText>
          </FormControl>
          <FormControl mb={'0.5rem'}>
            <FormLabel htmlFor="create-max-age">Max</FormLabel>
            <InputGroup>
              <Input
                id="create-max-age"
                type="number"
                min={0}
                max={100}
                placeholder="< 100"
                onChange={e =>
                  handleData(
                    'max_age',
                    e.target.value === '' ? 100 : parseInt(e.target.value),
                  )
                }
              />
            </InputGroup>
          </FormControl>
        </Flex>

        <Heading
          id="location"
          as={'h2'}
          size={'lg'}
          scrollMarginY={'4.25rem'}
          mb={'1rem'}
        >
          Location
        </Heading>
        <Text mb={'0.5rem'}>How will event-goers be attending this event?</Text>
        <CheckboxGroup mb="2rem" spacing={5}>
          <Stack direction="column" mb="2rem" spacing={5}>
            <Stack spacing={5} direction="row">
              <Checkbox
                colorScheme="blue"
                value="in-person"
                onChange={handleInPersonChange}
                isChecked={isInPersonSelected}
              >
                In-person
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                value="virtual"
                onChange={handleVirtualChange}
                isChecked={isVirtualSelected}
              >
                Virtual
              </Checkbox>
            </Stack>
            {isInPersonSelected && (
              <FormControl>
                <AddressField onAddressChange={handleAddressData} />
              </FormControl>
            )}
            {isVirtualSelected && (
              <FormControl isRequired>
                <FormLabel>Provide a link for attendees</FormLabel>
                <Input
                  isRequired
                  onChange={e => handleData('virtual_address', e.target.value)}
                  placeholder="Enter link"
                  defaultValue={
                    data.virtual_address ? data.virtual_address : ''
                  }
                />
              </FormControl>
            )}
          </Stack>
        </CheckboxGroup>

        <Heading
          id="date&time"
          as={'h2'}
          size={'lg'}
          scrollMarginY={'4.25rem'}
          mb={'1rem'}
        >
          Date & Time
        </Heading>
        <Text mb={'0.5rem'}>
          Will this event be occurring once or on multiple dates?
        </Text>
        <RadioGroup mb={'1rem'}>
          <Stack spacing={5} direction="row">
            <Radio
              colorScheme="blue"
              value="false"
              defaultValue={data.recurring ? !data.recurring : null}
              onChange={e => handleData('recurring', false)}
            >
              Single Event
            </Radio>
            <Radio
              colorScheme="blue"
              value="true"
              defaultValue={data.recurring ? data.recurring : null}
              onChange={e => handleData('recurring', true)}
            >
              Recurring
            </Radio>
          </Stack>
        </RadioGroup>

        <Flex>
          <FormControl isRequired mb={'1rem'}>
            <FormLabel htmlFor="create-start-date">Start Date</FormLabel>
            <DatePicker
              id="create-start-date"
              selected={data.start_date ? data.start_date : startDate}
              onChange={date => handleStartDateChange(date)}
              customInput={<ChakraDatePickerInput />}
            />
          </FormControl>

          <FormControl isRequired mb={'1rem'}>
            <FormLabel htmlFor="create-end-date">End Date</FormLabel>
            <DatePicker
              id="create-end-date"
              selected={data.end_date ? data.end_date : endDate}
              onChange={date => handleEndDateChange(date)}
              customInput={<ChakraDatePickerInput />}
            />
          </FormControl>
        </Flex>

        <FormControl isRequired mb={'1rem'}>
          <FormLabel htmlFor="create-time-zone">Select a Time Zone</FormLabel>
          <Select
            placeholder="Select a time zone"
            defaultValue={data.time_zone ? data.time_zone : ''}
            direction="rtl"
            onChange={e => handleData('time_zone', e.target.value)}
          >
            <option value="HST">Hawaii-Aleutian Time</option>
            <option value="AST">Alaska Time</option>
            <option value="PST">Pacific Time</option>
            <option value="MST">Mountain Time</option>
            <option value="CST">Central Time</option>
            <option value="EST">Eastern Time</option>
            <option value="AST">Atlantic Time</option>
          </Select>
        </FormControl>

        <Flex mb={'2rem'}>
          <FormControl isRequired mb={'0.5rem'}>
            <FormLabel htmlFor="create-start-time">Start Time</FormLabel>
            <InputGroup>
              <InputLeftElement children={<TimeIcon />} />
              <Input
                id="create-start-time"
                type="time"
                defaultValue={data.start_time ? data.start_time : ''}
                onChange={e => handleData('start_time', e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired mb={'0.5rem'}>
            <FormLabel htmlFor="create-end-time">End Time</FormLabel>
            <InputGroup>
              <InputLeftElement children={<TimeIcon />} />
              <Input
                id="create-end-time"
                type="time"
                defaultValue={data.end_time ? data.end_time : ''}
                onChange={e => handleData('end_time', e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </Flex>

        <Heading
          id="event-description"
          as={'h2'}
          size={'lg'}
          scrollMarginY={'4.25rem'}
          mb={'1rem'}
        >
          Event Description
        </Heading>
        <Text mb={'0.5rem'}>
          Tell us more about the event. What opportunities are there for
          experimental arts learning?
        </Text>
        <FormControl isRequired mb={'2rem'}>
          <FormLabel htmlFor="create-description">Description</FormLabel>
          <Textarea
            id="create-description"
            placeholder="Tell us more!"
            defaultValue={data.description ? data.description : ''}
            onChange={e => handleData('description', e.target.value)}
          />
        </FormControl>

        <Heading
          id="event-description"
          as={'h2'}
          size={'lg'}
          scrollMarginY={'4.25rem'}
          mb={'1rem'}
        >
          Event Image
        </Heading>
        <Text mb={'0.5rem'}>Upload an image to display on the event page.</Text>
        <FormControl isRequired mb={'0.5rem'}>
          <FormLabel htmlFor="upload-image">
            Drag a file here or browse to upload
          </FormLabel>
          <Flex flexDirection={'column'} justify={'center'} gap={'0.25rem'}>
            <Input
              type="file"
              onChange={e => handleData('imageURL', e.target.files[0])}
              display={'none'}
              ref={fileInput}
            />
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              height={'200px'}
              border={'1px dashed black'}
              borderRadius={'0.25rem'}
            >
              <VStack gap={'0.75rem'}>
                <Icon as={MdUploadFile} boxSize={10} color={'gray'} />
                <Text color={'gray'}>Drag a file here or browse to upload</Text>
                <Button
                  onClick={() => {
                    fileInput.current.click();
                  }}
                  fontWeight={'normal'}
                  borderRadius={'2rem'}
                  w={'fit-content'}
                  backgroundColor="#494847"
                  color={'white'}
                >
                  Browse
                </Button>
              </VStack>
            </Flex>
            <Text>{data.imageURL ? data.imageURL.name : ''}</Text>
          </Flex>
        </FormControl>
      </Flex>
    </Flex>
  );
}
