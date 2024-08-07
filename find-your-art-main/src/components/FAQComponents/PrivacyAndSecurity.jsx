import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';

const PrivacyAndSecurity = () => {
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
          Privacy and Security
        </Heading>
        <Accordion allowToggle>
          {/* How is my personal information protected on the platform? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  How is my personal information protected on the platform?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              We take your privacy seriously. Your personal information is
              stored securely using encryption and robust security measures. We
              adhere to industry best practices to safeguard your data from
              unauthorized access.
            </AccordionPanel>
          </AccordionItem>

          {/* Do you share my information with third parties? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  Do you share my information with third parties?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Your information is treated with utmost care. We do not share your
              personal data with third parties for marketing purposes. However,
              some data may be shared with event organizers and service
              providers solely to facilitate event participation and services
              you request.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default PrivacyAndSecurity;
