import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';

const TechnicalIssues = () => {
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
          Technical Issues
        </Heading>
        <Accordion allowToggle>
          {/* I'm experiencing issues with the website. What should I do? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  I'm experiencing issues with the website. What should I do?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              We apologize for any inconvenience. First, try refreshing the
              page. If the issue persists, clear your browser cache and cookies,
              or try accessing the platform from a different browser. If the
              problem continues, please contact info@changearts.org for
              assistance.
            </AccordionPanel>
          </AccordionItem>

          {/* I can't log in to my account. What should I do? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  I can't log in to my account. What should I do?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              Double-check that you're entering the correct email and password.
              If you've forgotten your password, use the “Forgot Password” link
              to reset it. If you're still unable to log in, contact
              info@changearts.org for assistance.
            </AccordionPanel>
          </AccordionItem>

          {/* I'm not receiving email notifications from the platform. What should I check? */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight={500}>
                  I'm not receiving email notifications from the platform. What
                  should I check?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontWeight={200}>
              First, check your email's spam or junk folder. Ensure that the
              email address associated with your account is correct. Add our
              email address to your contacts to prevent notifications from being
              marked as spam. If you're still not receiving emails, please
              contact us.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default TechnicalIssues;
