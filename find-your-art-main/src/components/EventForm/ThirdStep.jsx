import { Flex, Box, Heading, Text } from '@chakra-ui/react';

import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ThirdStep() {
  const [user, loading, error] = useAuthState(auth);
  const userEmail = user ? user.email : '';

  return (
    <Flex justifyContent={'center'} pt={'6rem'}>
      <Box width={'50%'}>
        <Heading as={'h1'} mb={'1rem'}>
          Confirmation
        </Heading>
        <Text>
          Thank you for submitting your event! You will be notified at your
          email&nbsp;
          <strong>{userEmail}</strong> once your event has been approved by the
          CHANGE Arts Team.{' '}
        </Text>
        <Heading as={'h2'} mt={'2rem'} mb={'1rem'}>
          Any questions?
        </Heading>
        <Text>
          Feel free to check out the FAQs page or reach out to us at
          info@changearts.org
        </Text>
      </Box>
    </Flex>
  );
}
