import {
  Heading,
  Flex,
  Card,
  CardBody,
  Text,
  Image,
  Box,
  Spacer,
  Button,
  Link,
  Stack,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import sample_image from '../../assets/sample_event_page.png';

export default function SecondStep({ data }) {
  return (
    <>
      <Flex direction={'column'} w={'50%'} ml={'25%'} mt={'6rem'}>
        <Heading as={'h1'} mb={'1rem'}>
          Preview & Submit
        </Heading>
        <Text mb={'2rem'}>
          Here is what your event will look like on Find Your Art once it has
          been published. Please make sure to carefully review the preview to
          ensure that the information provided is correct!
        </Text>
        <Card>
          <CardBody>
            <Image
              w="100%"
              h="200px"
              objectFit="cover"
              src={data.imageURL ? URL.createObjectURL(data.imageURL) : null}
              fallbackSrc={sample_image}
              alt="event preview image"
            />
            <Flex direction={'row'} w={'100%'} mt={'1rem'}>
              <Box width={'45%'}>
                <Heading as={'h1'} mb={'1rem'} mt={'1rem'}>
                  {data.title}
                </Heading>
                <Flex direction={'column'}>
                  <Flex direction={'column'}>
                    <Box>
                      <CalendarIcon mr={'0.5rem'} />
                      {data.start_date}
                    </Box>
                    <Box>
                      {data.start_time} - {data.end_time} {data.time_zone}
                    </Box>
                  </Flex>
                  <Spacer />
                  <Box>
                    {data.location_types.map((type, index) => (
                      <Stack key={index} mb="1rem" direction="column">
                        {type === 'inPerson' && data.address && (
                          <>
                            <Text fontWeight="bold">Location:</Text>
                            <Text>{data.address}</Text>
                          </>
                        )}
                        {type === 'virtual' && data.virtual_address && (
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
                  <Stack direction="row" flexWrap="wrap" mt={'0.75rem'}>
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
                    {data.min_age === 0 && data.max_age === 100 ? (
                      <Tag size="lg" colorScheme="green" borderRadius="full">
                        <TagLabel>All Ages</TagLabel>
                      </Tag>
                    ) : (
                      <Tag size="lg" colorScheme="orange" borderRadius="full">
                        <TagLabel>
                          Ages {data.min_age === '' ? '0' : data.min_age}
                          {data.max_age === 100 ? '+' : ` - ${data.max_age}`}
                        </TagLabel>
                      </Tag>
                    )}
                  </Stack>
                </Flex>
              </Box>
              <Spacer width={'15%'} />
              <Card width={'40%'}>
                <CardBody>
                  <Flex
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text fontSize={'xl'} as={'b'} mb={'0.25rem'}>
                      ${data.student_price} / student
                    </Text>
                    <Text fontSize={'xl'} as={'b'} mb={'0.5rem'}>
                      ${data.adult_price} / adult
                    </Text>
                    <Button
                      backgroundColor={'#494847'}
                      _hover={{ bg: '#818080' }}
                      color={'white'}
                      variant={'solid'}
                      borderRadius={'50px'}
                      mb={'1rem'}
                    >
                      <Link href={data.ticketURL} isExternal>
                        Purchase Ticket(s)
                      </Link>
                    </Button>
                    <Button
                      backgroundColor={'#494847'}
                      _hover={{ bg: '#818080' }}
                      color={'white'}
                      variant={'solid'}
                      borderRadius={'50px'}
                      mb={'1rem'}
                    >
                      <Link href="https://google.com" isExternal>
                        Request Ticket Subsidy
                      </Link>
                    </Button>
                    <Button
                      backgroundColor={'#494847'}
                      _hover={{ bg: '#818080' }}
                      color={'white'}
                      variant={'solid'}
                      borderRadius={'50px'}
                      mb={'1rem'}
                    >
                      <Link href="https://google.com" isExternal>
                        Request Education Services
                      </Link>
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>

            <Heading as={'h1'} size="lg" mb={'1rem'} mt={'1rem'}>
              Description
            </Heading>

            <Text>{data.description}</Text>

            {/* Tags */}
            <Stack direction="row">
              <Box>
                <Heading as={'h4'} size={'sm'} mb={'1rem'} mt={'2rem'}>
                  Tags
                </Heading>
                <Stack direction={'row'}>
                  {data.tags
                    .filter(tag => tag.trim() !== '')
                    .map((tag, index) => (
                      <Tag
                        size="lg"
                        colorScheme="blue"
                        borderRadius="full"
                        key={index}
                      >
                        {tag}
                      </Tag>
                    ))}
                </Stack>
              </Box>
            </Stack>

            {/* Content Warnings */}
            <Stack direction="row">
              <Box>
                <Heading as={'h4'} size={'sm'} mb={'1rem'} mt={'2rem'}>
                  Content Warnings
                </Heading>
                <Stack direction={'row'}>
                  {data.content_warnings
                    .filter(warning => warning.trim() !== '')
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
              </Box>
            </Stack>
            {/* <Heading as={'h1'} mb={'1rem'} mt={'1rem'}>
              Organizer
            </Heading> */}
          </CardBody>
        </Card>
        <Heading as={'h1'} mb={'1rem'} mt={'1rem'}>
          Any questions?
        </Heading>
        <Text>
          Feel free to check out our FAQs page or reach out to us at
          info@changearts.org.
        </Text>
      </Flex>
    </>
  );
}
