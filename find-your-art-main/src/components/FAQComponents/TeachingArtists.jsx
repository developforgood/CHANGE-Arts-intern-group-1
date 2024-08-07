import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

const TeachingArtists = () => {
  return (
    <>
      <Box
        p={8}
        width="100%"
        borderWidth="1px"
        borderRadius="md"
        mb={8}
        bg="#ededed"
      >
        <Heading flex="1" textAlign="center" mb={8} size="md">
          Teaching Artists
        </Heading>
        <Accordion allowToggle>
          {/* What is a Teaching Artist? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  What is a Teaching Artist?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Teaching Artists, also known as artist educators or community
              artists, are professional artists who also teach and integrate
              their art form(s), perspectives, and skills into a wide range of
              educational and community settings.
            </AccordionPanel>
          </AccordionItem>

          {/* What types of educational services can Teaching Artists provide? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  What types of educational services can Teaching Artists
                  provide?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Teaching Artists have experience in a wide-range of artistic
              disciplines and various community and curriculum integrations.
              Check out individual profiles for more information!
            </AccordionPanel>
          </AccordionItem>

          {/* How do I request educational services for my students?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How do I request educational services for my students?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              To request educational services for your students, follow these
              simple steps:
              <br />
              <br />
              <Text as="b" fontWeight={500}>
                Explore Teaching Artists:
              </Text>{' '}
              Browse through the profiles of Teaching Artists available to find
              the ones that match your educational needs and interests.
              <br />
              <Text as="b" fontWeight={500}>
                Select a Teaching Artist:
              </Text>{' '}
              Choose a Teaching Artist whose expertise aligns with the type of
              educational service you would like to request for your students.
              <br />
              <Text as="b" fontWeight={500}>
                Fill out request form:
              </Text>{' '}
              On the Teaching Artist's profile page, you'll find a request form.
              Complete the form by providing essential details such as your
              school/group name, the specific type of service you're interested
              in (e.g., workshops, classes), and the preferred educational
              schedule (e.g., dates, times).
              <br />
              <Text as="b" fontWeight={500}>
                Submit your request:
              </Text>{' '}
              Once you have filled out the request form with all the necessary
              information, submit it to the Teaching Artist.
              <br />
              <Text as="b" fontWeight={500}>
                Confirmation and communication:
              </Text>{' '}
              The Teaching Artist will review your request and get in touch with
              you to confirm the availability and discuss further details. They
              will collaborate with you to tailor the educational service to
              meet your students' needs and preferences.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default TeachingArtists;
