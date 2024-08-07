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

const Organizations = () => {
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
          Organizations
        </Heading>
        <Accordion allowToggle>
          {/* How do I create an event? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How do I create an event?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Art organizations can easily post their events by following these
              steps:
              <br />
              <br />
              <Text as="b" fontWeight={500}>
                Access your profile:
              </Text>{' '}
              Log in to your account as an art organization. If you don't have
              an account yet, you can sign up and create a profile for your
              organization.
              <Text as="b" fontWeight={500}>
                Click on "Post event":
              </Text>{' '}
              Once you're on your organization's profile page, click on the
              “Post event” button. <br />
              <Text as="b" fontWeight={500}>
                Enter event details:
              </Text>{' '}
              Fill in the event details in the provided form. Include essential
              information such as the event title, arts discipline (e.g., visual
              arts, performing arts), date, time, location, ticket price, and
              any other relevant details that will help attendees understand and
              engage with your event.
              <br />
              <Text as="b" fontWeight={500}>
                Event description and media:
              </Text>{' '}
              Add a descriptive event summary to provide more context. You can
              also upload images, videos, or promotional media related to the
              event to enhance its visibility.
              <br />
              <Text as="b" fontWeight={500}>
                Submit event listing:
              </Text>{' '}
              Review the event details to ensure accuracy and completeness. Once
              you're satisfied, click on the "Done” button to publish the event.
              <br />
            </AccordionPanel>
          </AccordionItem>

          {/* How do I manage my posted events? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How do I manage my posted events?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Organizations can efficiently manage their posted events by
              accessing their profile and using the "Edit" feature. Here's how
              they can do it:
              <br /> <br />
              <Text as="b" fontWeight={500}>
                View posted events:
              </Text>{' '}
              On their profile, they will find a list of events they have
              previously posted. <br />
              <Text as="b" fontWeight={500}>
                Select an event to manage:
              </Text>{' '}
              Choose the event they want to manage from the list. <br />
              <Text as="b" fontWeight={500}>
                Click on "Edit":
              </Text>{' '}
              Click on the "Edit" button associated with the selected event.{' '}
              <br />
              <Text as="b" fontWeight={500}>
                Update event information:
              </Text>{' '}
              The organization can now edit and update the event information as
              needed. They can modify event details, such as the event title,
              arts discipline, date, time, location, ticket price, and any other
              relevant information. <br />
              <Text as="b" fontWeight={500}>
                Save changes:
              </Text>{' '}
              After making the necessary changes, the organization should save
              the updated event information. <br />
              <Text as="b" fontWeight={500}>
                Review and confirm:
              </Text>{' '}
              Before finalizing the changes, they should review the event
              details to ensure accuracy. <br />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default Organizations;
