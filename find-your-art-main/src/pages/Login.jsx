import { useState } from 'react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

import { Flex, Box, Heading, Stack, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';
import { Link as ChakraLink } from '@chakra-ui/react';

import InputField from '../components/FormComponents/InputField';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import logo from '../assets/fya-logo.svg';
import vector from '../assets/vector.png';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  function handleData(field, value) {
    setLogin({ ...login, [field]: value });
  }

  return (
    <Flex>
      <Image src={vector} w={'40%'} objectFit={'cover'} />
      <Box w={'50%'}>
        <Flex justifyContent={'center'} h={'100%'} alignItems={'center'}>
          <Flex
            flexDirection={'column'}
            w={{ base: '80%', lg: '475px' }}
            gap={'1.5rem'}
            h={'100%'}
            justifyContent={'center'}
          >
            <Image src={logo} w={'10rem'} mb={'1.5rem'} />
            <Heading as="h1" fontSize={'1.5rem'}>
              Log into your Account
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
            <ChakraLink
              as={ReactRouterLink}
              to="/forgot-password"
              color={'black'}
              textDecoration={'underline'}
            >
              Forgot password?
            </ChakraLink>
            <Button
              fontWeight={'normal'}
              color={'white'}
              borderRadius={'2rem'}
              backgroundColor={'#494847'}
              p={'1.5rem 0'}
              onClick={handleLogin}
            >
              Log in
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
                Log in with Google
              </Button>
              <Button
                fontWeight={'normal'}
                color={'white'}
                borderRadius={'2rem'}
                backgroundColor={'#1877F2'}
                leftIcon={<FaFacebook size={25} />}
                p={'1.5rem 0'}
              >
                Log in with Facebook
              </Button>
              <Button
                fontWeight={'normal'}
                color={'white'}
                borderRadius={'2rem'}
                backgroundColor={'black'}
                leftIcon={<FaApple size={25} />}
                p={'1.5rem 0'}
              >
                Log in with Apple
              </Button>
            </Stack>
            <Text>
              Don't have an account?{' '}
              <ChakraLink as={ReactRouterLink} to="/signup" color={'#2F6FED'}>
                Sign up
              </ChakraLink>
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
