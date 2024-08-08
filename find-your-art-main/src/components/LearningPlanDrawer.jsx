import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { addLessonPlanToFirebase } from "../utils/lessonPlanUtils";
import { useNavigate } from "react-router-dom";

export default function LearningPlanDrawer({ eventId, userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const [lpName, setLPName] = useState(""); // name of lesson plan
  const [lpDescrip, setLPDescrip] = useState(""); // description of lesson plan
  const [lpLink, setLPLink] = useState(""); // link to lesson plan document

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const handleLPSubmit = async () => {
    // set event id from props
    // call addLessonPlanToFirebase, pass in eventID and an array of the LP data
    await addLessonPlanToFirebase(eventId, {
      description: lpDescrip,
      title: lpName,
      link: lpLink,
      eventId: [eventId],
      teacherId: userId,
    }).then(() => refreshPage());
  };

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="green"
        onClick={onOpen}
        size="sm"
        width="150px"
        rightIcon={<ArrowForwardIcon />}
        variant="outline"
      >
        Add Lesson Plan
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxWidth="500px">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Flex flexDir="column" gap="1rem">
              <InputField title="Name" setter={setLPName} />
              <InputField title="Description" setter={setLPDescrip} />
              <InputField title="Link" setter={setLPLink} />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleLPSubmit}>
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function InputField({ title, setter }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setter(inputValue);
  };

  return (
    <div>
      <Text fontSize="sm" fontWeight="bold">
        {title}
      </Text>
      <Input
        placeholder="Type here..."
        value={inputValue}
        onChange={handleChange}
        mt=".2rem"
      />
    </div>
  );
}
