import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Image,
  Heading,
  Text,
  Tag,
  TagLabel,
  CardFooter,
  Link,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import noimage from '../assets/no-image.png';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const MAX_TITLE_LENGTH = 50;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EventCard(props) {
  const [user, loading] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  let title = props.title;
  let truncatedTitle =
    title && title.length > MAX_TITLE_LENGTH
      ? `${title.slice(0, MAX_TITLE_LENGTH)} ...`
      : title;
  let organizer = props.organizer;
  let startDate = props.start_date;
  let endDate = props.end_date;
  let category = props.category;
  let imageURL = props.imageURL;
  let address = props.address;
  let city = address
    ?.split(',')
    .slice(-2)
    .join(',')
    .split(' ')
    .slice(0, -1)
    .join(' ')
    .trim();
  let attendance_types = props.location_types;
  let minAge = props.min_age;
  let maxAge = props.max_age;

  const formatDateToMMDDYY = date => {
    if (!date) {
      return 'N/A';
    }
    const dateObj = Date.parse(date);
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(dateObj);

    return formattedDate;
  };

  const formatDateToEnglish = date => {
    if (!date) {
      return 'N/A';
    }

    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      dateObj,
    );
    const year = dateObj.getFullYear();

    const ordinalSuffix = day => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
  };

  function isWithinXDays(endDate, x) {
    const xDaysFromNow = new Date();
    xDaysFromNow.setDate(xDaysFromNow.getDate() + x);
    const today = new Date();
    return today <= new Date(endDate) && new Date(endDate) <= xDaysFromNow;
  }

  function hasPassed(endDate) {
    const today = new Date();
    return new Date(endDate) < today;
  }

  return (
    <Card maxW="16rem" maxH="30rem" m="2">
      <CardBody>
        <div
          style={{
            width: '100%',
            height: '8rem',
            overflow: 'hidden',
            borderRadius: '0.5rem',
          }}
        >
          <Image
            src={imageURL ? imageURL : noimage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <Stack mt="6" spacing="1">
          <Heading size="md">
            {title ? truncatedTitle : 'Name of Event'}
          </Heading>
          <Text color={'#7B61FF'} fontSize={'12'}>
            {startDate ? `${formatDateToMMDDYY(startDate)}` : ''}
            {endDate && endDate != startDate
              ? ` - ${formatDateToMMDDYY(endDate)} `
              : ''}
            {endDate && isWithinXDays(endDate, 3) && (
              <Badge colorScheme="orange" ml="1">
                Ending Soon!
              </Badge>
            )}
            {((endDate && hasPassed(endDate)) ||
              (!endDate && hasPassed(startDate))) && (
              <Badge colorScheme="red" ml="1">
                Closed
              </Badge>
            )}
          </Text>
          <Text>{organizer ? organizer : 'Teaching Artist Name'}</Text>
          {address && <Text fontSize={'12'}>{city}</Text>}
          <Stack direction="row" wrap="wrap">
            {/* {address && address.length > 0 && <Tag size='sm' colorScheme='pink' borderRadius='full'>{city}</Tag>} */}
            {attendance_types &&
              attendance_types.map((type, index) => (
                <Tag
                  key={index}
                  size="sm"
                  colorScheme="purple"
                  borderRadius="full"
                >
                  {type === 'virtual' ? 'Virtual' : 'In-person'}
                </Tag>
              ))}
            {category && (
              <Tag size="sm" colorScheme="green" borderRadius="full">
                {category}
              </Tag>
            )}
            {minAge === 0 && maxAge >= 21 ? (
              <Tag size="sm" colorScheme="orange" borderRadius="full" mr={2}>
                <TagLabel>All Ages</TagLabel>
              </Tag>
            ) : (
              <Tag size="sm" colorScheme="orange" borderRadius="full" mr={2}>
                <TagLabel>
                  Ages {minAge === '' ? '0' : minAge}
                  {maxAge >= 21 ? '+' : ` - ${maxAge}`}
                </TagLabel>
              </Tag>
            )}
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={'center'}>
        {user ? (
          <Link onClick={() => navigate(`/events/${props.id}`)}>
            <Button colorScheme="blue" variant="ghost">
              More Details
            </Button>
          </Link>
        ) : (
          <>
            <Button colorScheme="blue" variant="ghost" onClick={onOpen}>
              More Details
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg">
                    More Details
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody>You must log in to proceed</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      colorScheme="blue"
                      onClick={() => navigate('/login')}
                      ml={3}
                    >
                      Take me to log in
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
