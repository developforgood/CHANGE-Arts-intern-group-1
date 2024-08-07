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

const General = () => {
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
          General
        </Heading>
        <Accordion allowToggle>
          {/* What is Find Your Art?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  What is Find Your Art?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Find Your Art is a search engine and marketplace for teachers,
              educators, and facilitators to identify thematically relevant arts
              content that matches their classrooms, curricula, and curiosities.
              Arts events (performances and exhibits) and workshops are intended
              to complement teaching and learning and hosted by partner Arts
              Organizations and Teaching Artists. <br />
              <br />
              Our goal is to connect educators with valuable artistic
              experiences for their students and provide access to the arts for
              all. We seek to promote inclusivity and diversity within the
              educational community and empower educators to offer enriched
              artistic experiences to their students.
            </AccordionPanel>
          </AccordionItem>

          {/* Is Find Your Art free to use?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  Is Find Your Art free to use?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Yes, Find Your Art is completely free to use. Educators and
              organizations can access the platform's features without any
              charges pending approval of your qualification as a teacher,
              educator, or facilitator.
            </AccordionPanel>
          </AccordionItem>

          {/* Do I qualify for Find Your Art?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  Do I qualify for Find Your Art?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Any teacher, educator, or group facilitator that oversees a
              regularly meeting group of people can participate.
            </AccordionPanel>
          </AccordionItem>

          {/* How is CHANGE Arts different from Find Your Art?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How is CHANGE Arts different from Find Your Art?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              CHANGE Arts is a nonprofit organization with a mission to unlock
              the limitless potential of arts, providing enriching and lifelong
              experiences in Visual, Performing, and Literary Arts for all. In
              pursuit of this goal, CHANGE Arts created Find Your Art which is
              an innovative search engine and marketplace that enables teachers
              to explore a myriad of arts events, opportunities, and resources
              offered by various Arts Organizations and Teaching Artists.
            </AccordionPanel>
          </AccordionItem>

          {/* How do I create an account?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How do I create an account?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Educators, Teaching Artists, and organizations can create an
              account by following these simple steps: <br /> <br />
              1.{' '}
              <Text as="b" fontWeight={500}>
                Sign up
              </Text>
              : Click on the "Sign Up" button located at the top right corner of
              the page. <br />
              2.{' '}
              <Text as="b" fontWeight={500}>
                Provide personal information
              </Text>
              : Enter your personal information, including your name, email
              address, password, etc. <br />
              3.{' '}
              <Text as="b" fontWeight={500}>
                Verify your account
              </Text>
              : After signing up, your account will need to be verified by the
              admin team before accessing certain features. <br />
              4.{' '}
              <Text as="b" fontWeight={500}>
                Access features
              </Text>
              : Once your account is verified, you can start bookmarking art
              events, and requesting tickets. <br />
            </AccordionPanel>
          </AccordionItem>

          {/* How can I contact customer support?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How can I contact customer support?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              You can reach out to us by sending an email to
              info@changearts.org. Our support team will respond to your
              inquiries as soon as possible.
              <br />
              <br />
              Alternatively, you can contact us on Instagram by sending a direct
              message to our account @findyourartusa.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default General;
