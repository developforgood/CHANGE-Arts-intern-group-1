import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';

const RefundsAndCancellations = () => {
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
          Refunds and Cancellations
        </Heading>
        <Accordion allowToggle>
          {/* How can I request a refund or exchange? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How can I request a refund or exchange?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Find Your Art events are curated and handled by external event
              organizers. Each organizer has their own refund and exchange
              policy. Should you require a refund or exchange for your purchased
              event, please contact info@changearts.org so we can attempt to
              facilitate the refund process with you.
            </AccordionPanel>
          </AccordionItem>

          {/* What happens if an event is canceled or rescheduled? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  What happens if an event is canceled or rescheduled?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              If an event is canceled or rescheduled, the event organizer will
              communicate directly with registered attendees through the contact
              information provided during the ticket request.
              <br />
              They will inform you about the cancellation or new event date, and
              any available options for refunds or ticket transfer.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default RefundsAndCancellations;
