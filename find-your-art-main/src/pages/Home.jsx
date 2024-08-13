import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Text,
  Heading,
  IconButton,
  Box,
  Select,
  Badge,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import EventCard from "../components/EventCard";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import tinycolor from "tinycolor2";
import { AddIcon } from "@chakra-ui/icons";
import { MdBuild, MdCall } from "react-icons/md";
import vector from "../assets/vector-horiz.png";
import TypingText from "../components/TypingText";
import { addLessonPlanToFirebase } from "../utils/lessonPlanUtils";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import eventsJSON from "../../db/events.json";
import DistanceSlider from "../components/DistanceSlider";

const MODE = import.meta.env.VITE_MODE;

const originalGradientColors = [
  "#9285FF",
  "#C5BEFF",
  "#67D3EF",
  "#73E3B4",
  "#9EDE88",
  "#FFE976",
  "#FDC591",
  "#FD86AB",
  "#FF9EBC",
];

// const SAMPLE_EVENT_ID = "KgVNBKHewJgBHX7nSgqm";
// //const SAMPLE_EVENT_ID = "THIS_ID_SHOULD_NOT_EXIST";
// const SAMPLE_LESSON_PLAN_DATA = {
//   name: "test",
//   description: "testing description",
//   link: "https://example.com",
//   title: "CREATED AUTOMAGICALLY NOT MANUALLY",
// };

const lightenColors = (colors, amount) => {
  return colors.map((color) => tinycolor(color).lighten(amount).toHexString());
};

const lightenedGradientColors = lightenColors(originalGradientColors, 10);

const generateRandomEvents = (data, size) => {
  // const results = new Array();
  // while (results.length < size) {
  //   let randomIndex = Math.floor(Math.random() * data.length) + 1;
  //   if (results.indexOf(randomIndex) === -1) results.push(data[randomIndex]);
  // }
  return data.slice(0, size);
};

export const gradient = `linear-gradient(to right, ${lightenedGradientColors.join(
  ", "
)})`;

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [firstRender, setFirstRender] = useState(true);
  const [eventDB, setEventsDB] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [initialQuery, setInitialQuery] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  const [initialCategory, setInitialCategory] = useState("");
  const [initialAgeRange, setInitialAgeRange] = useState("");
  const [initialAgeMin, setInitialAgeMin] = useState(0);
  const [initialAgeMax, setInitialAgeMax] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [initialStartDate, setInitialStartDate] = useState(new Date());
  const [initialEndDate, setInitialEndDate] = useState(new Date());
  const [initialDistance, setInitialDistance] = useState(0);

  const navigate = useNavigate();

  // useEffect(()=>{
  //   console.log("TESTING123 HELLO TESTING");
  //   addLessonPlanToFirebase(SAMPLE_EVENT_ID, SAMPLE_LESSON_PLAN_DATA); // <-
  // },[]);
  const handleSearch = () => {
    if (
      initialQuery ||
      initialCategory ||
      initialAgeMax ||
      attendanceType ||
      initialDistance
    ) {
      if (initialQuery) {
        navigate(`/search?query=${encodeURIComponent(initialQuery)}`, {
          state: {
            initialQuery: initialQuery,
            attendanceType: attendanceType,
            initialCategory: initialCategory,
            initialAgeMin: initialAgeMin,
            initialAgeMax: initialAgeMax,
            initialStartDate: initialStartDate,
            initialEndDate: initialEndDate,
            latitude: latitude,
            longitude: longitude,
            initialDistance: initialDistance,
          },
        });
      } else {
        navigate(`/search`, {
          state: {
            initialQuery: initialQuery,
            attendanceType: attendanceType,
            initialCategory: initialCategory,
            initialAgeMin: initialAgeMin,
            initialAgeMax: initialAgeMax,
            initialStartDate: initialStartDate,
            initialEndDate: initialEndDate,
            latitude: latitude,
            longitude: longitude,
            initialDistance: initialDistance,
          },
        });
      }
    }
  };

  const handleAttendanceChange = (e) => {
    setAttendanceType(e.target.value);
  };

  const handleInitialCategoryChange = (e) => {
    setInitialCategory(e.target.value);
  };

  const handleInitialAgeRange = (e) => {
    if (e.target.value === "infant") {
      setInitialAgeRange("infant");
      setInitialAgeMin(0);
      setInitialAgeMax(2);
    } else if (e.target.value === "prek") {
      setInitialAgeRange("prek");
      setInitialAgeMin(3);
      setInitialAgeMax(5);
    } else if (e.target.value === "early-elem") {
      setInitialAgeRange("early-elem");
      setInitialAgeMin(5);
      setInitialAgeMax(7);
    } else if (e.target.value === "upper-elem") {
      setInitialAgeRange("upper-elem");
      setInitialAgeMin(8);
      setInitialAgeMax(10);
    } else if (e.target.value === "middle") {
      setInitialAgeRange("middle");
      setInitialAgeMin(11);
      setInitialAgeMax(13);
    } else if (e.target.value === "early-high") {
      setInitialAgeRange("early-high");
      setInitialAgeMin(14);
      setInitialAgeMax(16);
    } else if (e.target.value === "upper-high") {
      setInitialAgeRange("upper-high");
      setInitialAgeMin(16);
      setInitialAgeMax(18);
    } else if (e.target.value === "college") {
      setInitialAgeRange("college");
      setInitialAgeMin(18);
      setInitialAgeMax(21);
    } else if (e.target.value === "family") {
      setInitialAgeRange("family");
      setInitialAgeMin(0);
      setInitialAgeMax(21);
    } else if (e.target.value === "adult") {
      setInitialAgeRange("adult");
      setInitialAgeMin(21);
      setInitialAgeMax(21);
    } else {
      setInitialAgeMin(0);
      setInitialAgeMax(0);
    }
  };

  const handleStartChange = (e) => {
    setInitialStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setInitialEndDate(e.target.value);
  };

  const fetchData = async () => {
    let data = new Array();
    if (MODE == "prod") {
      await getDocs(collection(db, "events")).then((querySnapshot) => {
        data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      });
    } else {
      for (let i = 0; i < eventsJSON.length; i++) {
        let event = eventsJSON[i];
        data.push(JSON.parse(event));
      }
    }
    setEventsDB(data);
  };

  useEffect(() => {
    const loadFirstRender = async () => {
      if (firstRender) {
        if (eventDB.length !== 0) {
          setEvents(generateRandomEvents(eventDB, 10));
          setFirstRender(false);
        } else {
          await fetchData();
        }
      }
    };

    loadFirstRender();
  }, [eventDB, user, loading]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        // Success callback
        function (position) {
          const { latitude, longitude } = position.coords; // Corrected property names
          console.log("User's location:", latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
        },
        // Error callback
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <>
        <NavigationBar />

        <Flex
          direction={"row"}
          height={"580px"}
          width={"auto"}
          // background={"#7c70e1"}
          justify={"center"}
          align={"center"}
          backgroundImage={vector}
          backgroundSize="cover"
          backgroundColor={"rgba(0,0,0,0.3)"}
          backgroundBlendMode={"overlay"}
        >
          <Flex direction={"column"} ml="16">
            {/* Find Your Art */}
            <TypingText text="Find Your Art." delayBetweenChars={300} />

            {/* Introduction */}
            <Text
              fontSize="2xl"
              color="white"
              whiteSpace="pre-line"
              font={"DM Sans"}
              maxW={"70%"}
              // textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
            >
              Search for the arts events that best complement your classroom or
              community, your curriculum or curiosities.
            </Text>
          </Flex>

          {/* Search Functionality */}
          <Flex
            direction={"column"}
            maxW="47%"
            mr="16"
            justify={"center"}
            align={"center"}
            borderRadius="md"
            p="2rem"
            boxShadow={"lg"}
            bg="gray.700"
          >
            {/* Keyword */}
            {/* <Heading
              textAlign={'center'}
              color="white"
              //textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              mb="4"
              width="100%"
              size="md">
              Begin your search
            </Heading> */}

            {/* Search Bar */}
            <Box mb="4" width="100%">
              <Flex direction="column" p=".5rem 0">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CiSearch color="white" />
                  </InputLeftElement>
                  <Input
                    color="white"
                    placeholder="What are you looking for today?"
                    _placeholder={{ opacity: 1, color: "white" }}
                    value={initialQuery}
                    onChange={(e) => setInitialQuery(e.target.value)}
                    width="600px"
                    variant="flushed"
                  />
                </InputGroup>
              </Flex>
            </Box>

            {/* or */}
            {/* <Text
              textAlign={'center'}
              color="white"
              //textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              mt="4"
              mb="2"
              width="100%">
              or filter by category
            </Text> */}

            {/* Dropdown menus*/}
            <Box mb="8" width="100%">
              <Flex>
                <Select
                  color="white"
                  variant="flushed"
                  placeholder="Attendance Type"
                  mr="2"
                  width="200px"
                  value={attendanceType}
                  onChange={handleAttendanceChange}
                >
                  <option value="virtual">Virtual</option>
                  <option value="inPerson">In-person</option>
                </Select>
                <Select
                  color="white"
                  variant="flushed"
                  placeholder="Category"
                  mr="2"
                  width="200px"
                  value={initialCategory}
                  onChange={handleInitialCategoryChange}
                >
                  <option value="Visual Arts">Visual Arts</option>
                  <option value="Media Arts">Media Arts</option>
                  <option value="Music">Music</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Dance">Dance</option>
                  <option value="Opera">Opera</option>
                </Select>
                <Select
                  color="white"
                  variant="flushed"
                  placeholder="Age Range"
                  mr="2"
                  width="200px"
                  value={initialAgeRange}
                  onChange={handleInitialAgeRange}
                >
                  <option value="infant">Infant and Toddler</option>
                  <option value="prek">Pre-K</option>
                  <option value="early-elem">Early Elementary (K-2)</option>
                  <option value="upper-elem">Upper Elementary (3-5)</option>
                  <option value="middle">Middle School (6-8)</option>
                  <option value="early-high">High School (9-10)</option>
                  <option value="upper-high">High School (11-12)</option>
                  <option value="college">College</option>
                  <option value="family">Family</option>
                  <option value="adult">Adult</option>
                </Select>
              </Flex>
            </Box>

            {/* or */}
            {/* <Text
              textAlign={'center'}
              color="white"
              //textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              mt="4"
              mb="2"
              width="100%">
              or set a date range
            </Text> */}

            <Flex width="100%">
              {/* Start Date Field */}
              <FormControl isDisabled>
                <FormLabel color="white">
                  Start Date <Badge>Coming Soon!</Badge>{" "}
                </FormLabel>
                <Input
                  type="date"
                  placeholder="Select start date"
                  color="white"
                  value={initialStartDate}
                  onChange={handleStartChange}
                />
              </FormControl>

              {/* End Date Field */}
              <FormControl ml={4} isDisabled>
                <FormLabel color="white">
                  End Date <Badge>Coming Soon!</Badge>{" "}
                </FormLabel>
                <Input
                  type="date"
                  placeholder="Select end date"
                  color="white"
                  value={initialEndDate}
                  onChange={handleEndChange}
                />
              </FormControl>
            </Flex>

            {/* Distance */}
            <Flex width={"100%"} gap={"4rem"} alignItems={"center"} mt="2rem">
              <Text color="white">Distance</Text>
              <Box flexGrow={1}>
                <DistanceSlider
                  color="white"
                  onValueChange={(distance) => {
                    setInitialDistance(distance);
                  }}
                  initialValue={initialDistance}
                />
              </Box>
            </Flex>
            {/* Search */}
            <Button
              mt="3rem"
              variant="outline"
              color="white"
              size="md"
              fontWeight={"bold"}
              width="100%"
              onClick={handleSearch}
              _hover={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
            >
              Enter
            </Button>
          </Flex>
        </Flex>
        <Box m="4rem">
          <Heading fontSize="25px" fontWeight={500}>
            Popular services
          </Heading>

          {/* Card Section */}
          <Flex wrap="wrap" justify="left" mt="1rem" gap="1rem">
            {events.length > 0 &&
              events.map((event, id) => <EventCard key={id} {...event} />)}
          </Flex>
        </Box>

        {user && (
          <IconButton
            colorScheme="teal"
            isRound={true}
            height={"5rem"}
            width={"5rem"}
            position={"fixed"}
            bottom={"10%"}
            right={"5%"}
            icon={<AddIcon boxSize={7} />}
            as={RouterLink}
            to="/create-event"
          />
        )}

        {/* Footer */}
        <Footer />
      </>
    </div>
  );
};

export default Home;
