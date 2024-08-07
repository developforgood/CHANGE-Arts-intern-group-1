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

const TicketPurchases = () => {
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
          Ticket Purchases
        </Heading>
        <Accordion allowToggle>
          {/* How can I purchase tickets for an art event? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How can I purchase tickets for an art event?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              To purchase tickets for an art event, follow these steps:
              <br />
              <br />
              <Text as="b" fontWeight={500}>
                Visit event details:
              </Text>{' '}
              Go to the event details page of the specific art event you wish to
              attend. <br />
              <Text as="b" fontWeight={500}>
                Request tickets:
              </Text>{' '}
              On the event details page, you will find a ticket request form.
              Fill out the form, indicating how many tickets you need for the
              event and if you require subsidization. <br />
              <Text as="b" fontWeight={500}>
                Ticket procurement:
              </Text>{' '}
              Once you've submitted your ticket request, our team at CHANGE Arts
              will handle the ticket procurement process on your behalf. <br />
              <Text as="b" fontWeight={500}>
                Ticket delivery:
              </Text>{' '}
              After securing the tickets, we will send them directly to the
              email address associated with your account. You'll receive the
              tickets electronically for your convenience. <br />
              <Text as="b" fontWeight={500}>
                Payment:
              </Text>{' '}
              Please note that, as part of the ticket procurement service, the
              ticket requestor will need to pay back CHANGE Arts for the ticket
              costs. Payment instructions and details will be provided along
              with the ticket delivery. <br />
            </AccordionPanel>
          </AccordionItem>

          {/* What payment methods are accepted? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  What payment methods are accepted?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              When paying back CHANGE Arts for the tickets, we accept the
              following payment methods:
              <br /> <br />
              <Text as="b" fontWeight={500}>
                Online payment platforms:
              </Text>{' '}
              We support secure online payment platforms such as PayPal. <br />
              <Text as="b" fontWeight={500}>
                Bank transfer:
              </Text>{' '}
              Direct bank transfers (e.g. ACH). <br />
              <Text as="b" fontWeight={500}>
                Cheque:
              </Text>{' '}
              Please ensure the cheque is made out to CHANGE arts. Our payment
              address will be provided for cheque payments. <br />
            </AccordionPanel>
          </AccordionItem>

          {/* Where can I view my purchased tickets?  */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  Where can I view my purchased tickets?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              The tickets purchased on your behalf by CHANGE Arts will be sent
              to the same email address that you provided in the ticket request
              form.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default TicketPurchases;
