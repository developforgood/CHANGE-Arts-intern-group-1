import { Image } from '@chakra-ui/image';
import { Box, Flex } from '@chakra-ui/layout';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import vector from '../assets/vector.png';
import logo from '../assets/fya-logo.svg';

export default function SignUp() {
  return (
    <Flex>
      <Image src={vector} w={'40%'} objectFit="cover" />
      <Flex w={'50%'} justifyContent={'center'}>
        <Flex w={{ base: '80%', lg: '475px' }} flexDirection={'column'}>
          <Image src={logo} w={'10rem'} mt={'1.5rem'} mb={'4.5rem'} />
          <SignUpForm />
        </Flex>
      </Flex>
    </Flex>
  );
}
