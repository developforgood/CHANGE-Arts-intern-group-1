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
    Text
  } from '@chakra-ui/react'
import {useRef, useState} from 'react';
import { addLessonPlanToFirebase} from '../utils/lessonPlanUtils';

export default function LearningPlanDrawer(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const[lpName, setLPName] = useState("") //name of lesson plan
    const[lpDescrip, setLPDescrip] = useState("") // description of lesson plan
    const[lpLink, setLPLink] = useState("") //link to lesson plan document
    const[lpEventID, setLPEventID] = useState()

    const handleLPSubmit = async () => {
      // set event id from props
      // call addLessonPlanToFirebase, pass in eventID and an array of the LP data
      setLPEventID(props.eventID)
      const uId = props.userId
      const lp = {description: lpDescrip, link: lpLink, teacherId: "TODO", eventId:[lpEventID], teacherId:uId}
      addLessonPlanToFirebase(lpEventID, lp);
    }

    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen} size='sm' width='150px'>
          Add Lesson Plan
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent maxWidth="500px">
            <DrawerCloseButton />
            <DrawerHeader>Add Lesson Plan</DrawerHeader>

            <DrawerBody>
              <InputField title="Name" setter={setLPName}/>
              <InputField title="Description" setter={setLPDescrip}/>
              <InputField title="Link" setter={setLPLink}/>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={handleLPSubmit}>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

function InputField({title, setter}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        setter(inputValue)
    }

    return (
        <div>
            <Text fontSize='sm'>{title}</Text>
            <Input placeholder='Type here...' value={inputValue} onChange={handleChange}/>
        </div>
    );
}
