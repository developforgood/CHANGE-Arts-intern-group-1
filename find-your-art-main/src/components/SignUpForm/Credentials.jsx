import InputField from '../FormComponents/InputField';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

export default function Credentials({ data, handleData, nextStep }) {
  return (
    <Flex flexDirection={'column'} gap={'1.5rem'}>
      <Heading as="h1" fontSize={'1.5rem'}>
        Create your account.
      </Heading>
      <InputField
        title="Email"
        type="email"
        placeholder="hello@email.com"
        icon={AiOutlineMail}
        field="email"
        handleData={handleData}
      />
      <InputField
        title="Password"
        type="password"
        placeholder="•••••••"
        icon={AiOutlineLock}
        field="password"
        handleData={handleData}
      />
      <InputField
        title="Confirm Password"
        type="password"
        placeholder="•••••••"
        icon={AiOutlineLock}
        field="confirmPassword"
        handleData={handleData}
      />
      <Button
        fontWeight={'normal'}
        color={'white'}
        borderRadius={'2rem'}
        backgroundColor={'#494847'}
        p={'1.5rem 0'}
        onClick={() => nextStep(2)}
      >
        Sign up
      </Button>
      <Text textAlign={'center'}>OR</Text>
      <Stack gap={'1rem'}>
        <Button
          fontWeight={'normal'}
          color={'black'}
          borderRadius={'2rem'}
          backgroundColor={'whiteAlpha.100'}
          border={'1px solid gray'}
          leftIcon={<FcGoogle size={25} />}
          p={'1.5rem 0'}
        >
          Sign up with Google
        </Button>
        <Button
          fontWeight={'normal'}
          color={'white'}
          borderRadius={'2rem'}
          backgroundColor={'#1877F2'}
          leftIcon={<FaFacebook size={25} />}
          p={'1.5rem 0'}
        >
          Sign up with Facebook
        </Button>
        <Button
          fontWeight={'normal'}
          color={'white'}
          borderRadius={'2rem'}
          backgroundColor={'black'}
          leftIcon={<FaApple size={25} />}
          p={'1.5rem 0'}
        >
          Sign up with Apple
        </Button>
      </Stack>
    </Flex>
  );
}
