import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heading,
  Flex,
  Card,
  CardBody,
  Text,
  Image,
  Icon,
  Box,
  Spacer,
  Button,
  Link,
  Stack,
  Tag,
  TagLabel,
  Grid,
} from "@chakra-ui/react";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
import vectorhoriz from "../assets/vector-horiz.png";
import NavBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useUser } from "../components/UserContext";
import LearningPlanDrawer from "../components/LearningPlanDrawer";
import { LinkIcon } from "@chakra-ui/icons";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import userIcon from "../assets/user.png";

const MODE = import.meta.env.VITE_MODE;

const fetchLessonPlanInfo = async (lessonPlanId) => {
  const lessonPlanSnapshot = await getDoc(doc(db, "lessonPlans", lessonPlanId));
  if (!lessonPlanSnapshot.exists()) return;
  const lessonPlanData = lessonPlanSnapshot.data();
  const teacherId = lessonPlanData.teacherId;
  const teacherSnapshot = await getDoc(doc(db, "members", teacherId));
  if (!teacherSnapshot.exists()) return;
  return { ...lessonPlanData, creator: { ...teacherSnapshot.data() } };
};
export default function EventDetails() {
  const { id: eventId } = useParams();
  const { user } = useUser();
  const userId = user?.uid;

  const [data, setData] = useState();
  const [lessonPlans, setLessonPlans] = useState([]);
  const formattedDescription =
    data && data.description.replaceAll("\\n\\n", "\n\n");

  const fetchEventData = async () => {
    let event = new Object();
    if (MODE == "prod") {
      const docRef = doc(db, "events", eventId);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        console.error("Failed to fetch event");
      }
      event = docSnapshot.data();
      return event;
    } else {
      console.log("in progress");
    }
  };

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const loadData = async () => {
      const event = await fetchEventData();
      console.log(event);
      setData(event);
      const lessonPlanRequestPromises = [];
      for (const lessonPlanId of event.lesson_plan_ids) {
        lessonPlanRequestPromises.push(fetchLessonPlanInfo(lessonPlanId));
      }
      const lessonPlans = [];
      (await Promise.all(lessonPlanRequestPromises)).forEach(
        (lessonPlanInfo) => {
          console.log(lessonPlanInfo);
          if (lessonPlanInfo !== undefined) {
            lessonPlans.push(lessonPlanInfo);
          }
        }
      );
      setLessonPlans(lessonPlans);
    };
    loadData();
  }, []);
  console.log(lessonPlans);

  return (
    data && (
      <>
        <NavBar />
        <Flex direction={"column"} m={"3rem 6rem"}>
          <>
            <>
              <Box position="relative">
                <Image
                  w="100%"
                  h="300px"
                  objectFit="cover"
                  src={data.imageURL}
                  fallbackSrc={vectorhoriz}
                  alt="event preview image"
                />
                <Button
                  position="absolute"
                  top="10px"
                  left="10px"
                  bg="white"
                  onClick={handleBackButtonClick}
                >
                  <Icon as={ArrowBackIcon} boxSize={6} />
                </Button>
              </Box>
              <Flex direction={"row"} w={"100%"} mt={"1rem"}>
                <Box width={"45%"}>
                  <Heading as={"h1"} mb={"1rem"} mt={"1rem"}>
                    {data.title}
                  </Heading>
                  <Flex direction={"column"}>
                    <Flex direction={"column"}>
                      <Box mb="1rem">
                        {data.start_date ? <CalendarIcon mr={"0.5rem"} /> : ""}
                        {data.start_date ? `${data.start_date}` : ""}
                        {data.end_date ? ` - ${data.end_date}` : ""}
                      </Box>
                      <Box>
                        {data.start_time
                          ? `${data.start_time} - ${data.end_time} ${data.time_zone}`
                          : ""}
                      </Box>
                    </Flex>
                    <Spacer />
                    <Box>
                      {data.location_types.map((type, index) => (
                        <Stack key={index} mb="1rem" direction="column">
                          {type === "inPerson" && data.address && (
                            <>
                              <Text fontWeight="bold">Location:</Text>
                              <Text>{data.address}</Text>
                            </>
                          )}
                          {type === "virtual" && data.virtual_address && (
                            <>
                              <Text fontWeight="bold">Link:</Text>
                              <Link
                                href={data.virtual_address}
                                isExternal
                                color="blue.500"
                              >
                                Virtual Link Here
                              </Link>
                            </>
                          )}
                        </Stack>
                      ))}
                    </Box>

                    {/* Category, Discipline, Style, and Age */}
                    <Stack direction="row" mt={"0.75rem"}>
                      <Tag size="lg" colorScheme="green" borderRadius="full">
                        <TagLabel>{data.category}</TagLabel>
                      </Tag>
                      {data.discipline && (
                        <Tag size="lg" colorScheme="green" borderRadius="full">
                          <TagLabel>{data.discipline}</TagLabel>
                        </Tag>
                      )}
                      {data.style && (
                        <Tag size="lg" colorScheme="green" borderRadius="full">
                          <TagLabel>{data.style}</TagLabel>
                        </Tag>
                      )}
                      {data.min_age !== undefined &&
                        data.max_age !== undefined &&
                        (data.min_age === 0 && data.max_age === 100 ? (
                          <Tag
                            size="lg"
                            colorScheme="orange"
                            borderRadius="full"
                          >
                            <TagLabel>All Ages</TagLabel>
                          </Tag>
                        ) : (
                          <Tag
                            size="lg"
                            colorScheme="orange"
                            borderRadius="full"
                          >
                            <TagLabel>
                              Ages {data.min_age === "" ? "0" : data.min_age}
                              {data.max_age === 100
                                ? "+"
                                : ` - ${data.max_age}`}
                            </TagLabel>
                          </Tag>
                        ))}
                      {data.location_types.includes("virtual") && (
                        <Tag size="lg" colorScheme="purple" borderRadius="full">
                          <TagLabel>Virtual</TagLabel>
                        </Tag>
                      )}
                      {data.location_types.includes("inPerson") && (
                        <Tag size="lg" colorScheme="purple" borderRadius="full">
                          <TagLabel>In-person</TagLabel>
                        </Tag>
                      )}
                    </Stack>
                  </Flex>
                </Box>
                <Spacer width={"15%"} />
                <Card width={"40%"}>
                  <CardBody>
                    <Flex
                      direction={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Text fontSize={"xl"} as={"b"} mb={"0.25rem"}>
                        {" "}
                        Ticketing Information{" "}
                      </Text>
                      <Stack
                        direction="column"
                        mb="4"
                        mt="4"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {!data.student_price ? (
                          <Flex align="center">
                            <Text mr="2">Students:</Text>
                            <Tag
                              size="lg"
                              colorScheme="green"
                              borderRadius="full"
                            >
                              <TagLabel>Free</TagLabel>
                            </Tag>
                          </Flex>
                        ) : (
                          <Text fontSize={"xl"} as={"b"} mb={"0.25rem"}>
                            Students: ${data.student_price}
                          </Text>
                        )}
                        {!data.adult_price ? (
                          <Flex align="center">
                            <Text mr="2">Adults:</Text>
                            <Tag
                              size="lg"
                              colorScheme="green"
                              borderRadius="full"
                            >
                              <TagLabel>Free</TagLabel>
                            </Tag>
                          </Flex>
                        ) : (
                          <Text fontSize={"xl"} as={"b"} mb={"0.25rem"}>
                            Adults: ${data.adult_price}
                          </Text>
                        )}
                      </Stack>
                      <Button
                        backgroundColor={"#494847"}
                        _hover={{ bg: "#818080" }}
                        color={"white"}
                        variant={"solid"}
                        borderRadius={"50px"}
                        mb={"1rem"}
                        size="md"
                      >
                        <Link href={data.ticketURL} isExternal>
                          Purchase Tickets
                        </Link>
                      </Button>
                      <Stack direction="row">
                        <Button
                          backgroundColor={"#494847"}
                          _hover={{ bg: "#818080" }}
                          color={"white"}
                          variant={"solid"}
                          borderRadius={"50px"}
                          mb={"1rem"}
                          size="sm"
                        >
                          <Link href="https://google.com" isExternal>
                            Request Ticket Subsidy
                          </Link>
                        </Button>
                        <Button
                          backgroundColor={"#494847"}
                          _hover={{ bg: "#818080" }}
                          color={"white"}
                          variant={"solid"}
                          borderRadius={"50px"}
                          mb={"1rem"}
                          size="sm"
                        >
                          <Link href="https://google.com" isExternal>
                            Request Education Services
                          </Link>
                        </Button>
                      </Stack>
                    </Flex>
                  </CardBody>
                </Card>
              </Flex>

              <Heading as={"h1"} size="lg" mb={"1rem"} mt={"1rem"}>
                Description
              </Heading>

              <Text whiteSpace="pre-line">{formattedDescription}</Text>
              <Heading as={"h1"} size="lg" mb={"1rem"} mt={"1.5rem"}>
                Lesson Plans
              </Heading>
              <Box mb="1rem">
                <Grid
                  flexDir="row"
                  gap="1rem"
                  wrap={"wrap"}
                  gridTemplateColumns={"1fr 1fr"}
                >
                  {lessonPlans.length ? (
                    lessonPlans.map((lessonPlan, i) => {
                      return (
                        <Card
                          key={i}
                          borderWidth="1px"
                          borderRadius="lg"
                          borderColor="gray.300"
                        >
                          <CardBody>
                            <a href={lessonPlan.link}>
                              <Heading
                                fontSize="xl"
                                mb={".4rem"}
                                color={"blue.400"}
                                display={"inline"}
                              >
                                {lessonPlan.title || "Untitled Lesson Plan"}
                              </Heading>
                              <LinkIcon
                                display={"inline"}
                                verticalAlign={"baseline"}
                                marginLeft={"10px"}
                              />
                            </a>
                            <Flex
                              height={"1rem"}
                              gap={".3rem"}
                              alignItems={"center"}
                              mb={"1rem"}
                              mt=".5rem"
                            >
                              <Image src={userIcon} height={"100%"} />
                              <Text>
                                {lessonPlan.creator.firstName}{" "}
                                {lessonPlan.creator.lastName}
                              </Text>
                            </Flex>
                            {lessonPlan.description ||
                              "No description provided"}
                          </CardBody>
                        </Card>
                      );
                    })
                  ) : (
                    <Text fontSize="xl">
                      No lesson plans found. Want to add one?
                    </Text>
                  )}
                </Grid>
              </Box>
              <LearningPlanDrawer eventId={eventId} userId={userId} />
              {/* Tags */}
              <Stack direction="row">
                <Box>
                  <Heading as={"h4"} size={"lg"} mb={"1rem"} mt={"2rem"}>
                    Tags
                  </Heading>
                  <Stack direction={"row"}>
                    {data.tags.length
                      ? data.tags
                          .filter((tag) => tag.trim() !== "")
                          .map((tag, index) => (
                            <Tag
                              size="lg"
                              colorScheme="blue"
                              borderRadius="full"
                              key={index}
                            >
                              {tag}
                            </Tag>
                          ))
                      : "No Tags"}
                  </Stack>
                </Box>
              </Stack>

              {/* Content Warnings */}
              <Stack direction="row">
                <Box>
                  <Heading as={"h1"} size={"lg"} mb={"1rem"} mt={"2rem"}>
                    Content Warnings
                  </Heading>
                  <Stack direction={"row"}>
                    {data.content_warnings && (
                      <Stack direction={"row"}>
                        {data.content_warnings
                          .filter((warning) => warning.trim() !== "")
                          .map((warning, index) => (
                            <Tag
                              size="lg"
                              colorScheme="red"
                              borderRadius="full"
                              key={index}
                            >
                              {warning}
                            </Tag>
                          ))}
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </Stack>
              {/* <Heading as={'h1'} mb={'1rem'} mt={'1rem'}>
                Organizer
              </Heading> */}
            </>
          </>
        </Flex>
        <Footer />
      </>
    )
  );
}
