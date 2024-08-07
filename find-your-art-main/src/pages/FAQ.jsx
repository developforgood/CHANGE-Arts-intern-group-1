import { useRef } from 'react';
import { Box, VStack, Link, Heading } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import General from '../components/FAQComponents/General';
import Educators from '../components/FAQComponents/Educators';
import TeachingArtists from '../components/FAQComponents/TeachingArtists';
import Organizations from '../components/FAQComponents/Organizations';
import TicketPurchases from '../components/FAQComponents/TicketPurchases';
import RefundsAndCancellations from '../components/FAQComponents/RefundsAndCancellations';
import PrivacyAndSecurity from '../components/FAQComponents/PrivacyAndSecurity';
import TechnicalIssues from '../components/FAQComponents/TechnicalIssues';
import Footer from '../components/Footer';

const FAQ = () => {
  const generalRef = useRef(null);
  const educatorsRef = useRef(null);
  const teachingArtistsRef = useRef(null);
  const organizationsRef = useRef(null);
  const ticketPurchasesRef = useRef(null);
  const refundsAndCancellationsRef = useRef(null);
  const privacyAndSecurityRef = useRef(null);
  const technicalIssuesRef = useRef(null);

  const scrollToSection = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <NavigationBar />

      {/* Header */}
      <Heading size="xl" noOfLines={1} align="center" mt={8}>
        Frequently Asked Questions (FAQ)
      </Heading>

      {/* Left Navigation Bar */}
      <Box mt={16}>
        <VStack
          align="start"
          spacing={4}
          ml={4}
          position="fixed"
          fontWeight={200}
        >
          <Link onClick={() => scrollToSection(generalRef)}>General</Link>
          <Link onClick={() => scrollToSection(educatorsRef)}>Educators</Link>
          <Link onClick={() => scrollToSection(teachingArtistsRef)}>
            Teaching Artists
          </Link>
          <Link onClick={() => scrollToSection(organizationsRef)}>
            Organizations
          </Link>
          <Link onClick={() => scrollToSection(ticketPurchasesRef)}>
            Ticket Purchases
          </Link>
          <Link onClick={() => scrollToSection(refundsAndCancellationsRef)}>
            Refunds and Cancellations
          </Link>
          <Link onClick={() => scrollToSection(privacyAndSecurityRef)}>
            Privacy and Security
          </Link>
          <Link onClick={() => scrollToSection(technicalIssuesRef)}>
            Technical Issues
          </Link>
        </VStack>
      </Box>

      {/* FAQs */}
      <Box ml={64} width="65%">
        <div ref={generalRef}>
          <General />
        </div>
        <div ref={educatorsRef}>
          <Educators />
        </div>
        <div ref={teachingArtistsRef}>
          <TeachingArtists />
        </div>
        <div ref={organizationsRef}>
          <Organizations />
        </div>
        <div ref={ticketPurchasesRef}>
          <TicketPurchases />
        </div>
        <div ref={refundsAndCancellationsRef}>
          <RefundsAndCancellations />
        </div>
        <div ref={privacyAndSecurityRef}>
          <PrivacyAndSecurity />
        </div>
        <div ref={technicalIssuesRef}>
          <TechnicalIssues />
        </div>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default FAQ;
