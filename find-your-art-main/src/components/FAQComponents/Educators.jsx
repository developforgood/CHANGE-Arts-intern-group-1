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

const Educators = () => {
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
          Educators
        </Heading>
        <Accordion allowToggle>
          {/* How can I search for art events or services offered by Teaching Artists/Organizations? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How can I search for art events or services offered by
                  Teaching Artists/Organizations?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Educators can search for art events or services offered by
              Teaching Artists in a straightforward manner. Here's how they can
              do it on the homepage:
              <br />
              <br />
              <Text as="b" fontWeight={500}>
                Search bar:
              </Text>{' '}
              On the homepage, educators will find a search bar where they can
              enter keywords related to the type of art event or service they
              are looking for.
              <br />
              <Text as="b" fontWeight={500}>
                Apply filters:
              </Text>{' '}
              To further refine their search, educators can use filters such as
              location, art discipline, and more. This allows them to find
              events or services that best match their preferences and
              requirements.
              <br />
              <Text as="b" fontWeight={500}>
                Browse results:
              </Text>{' '}
              After entering their search criteria and applying filters, the
              platform will display a list of relevant art events and services
              that match their search parameters.
              <br />
              <Text as="b" fontWeight={500}>
                Bookmark or request tickets:
              </Text>{' '}
              Once educators find an event or service they are interested in,
              they have the option to bookmark it or request to purchase tickets
              for the event.
            </AccordionPanel>
          </AccordionItem>

          {/* How can I request for ticket subsidization? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How can I request for ticket subsidization?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Our subsidization process supports educators who may face
              financial constraints, ensuring they have equal access to events
              and opportunities. All members can apply for financial assistance
              that covers part of the costs associated with attending arts
              events or taking advantage of various opportunities available.
              CHANGE Arts wants to meet your budget with its available
              subsidies. Together we can change the economy for the arts.
            </AccordionPanel>
          </AccordionItem>

          {/* Where do I find my bookmarked events? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  Where do I find my bookmarked events?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Bookmarking events provides educators with a convenient way to
              save and access their favourite art events for future reference.
              <br />
              <br />
              Bookmarked events are saved to the educator's profile. To access
              their bookmarked events, educators can log in to their account and
              navigate to their profile page.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default Educators;
