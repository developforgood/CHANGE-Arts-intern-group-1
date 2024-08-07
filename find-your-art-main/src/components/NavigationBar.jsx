import {
  Box,
  Flex,
  Link,
  Button,
  Image,
  Icon,
  Avatar,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiChevronDown, BiDonateHeart } from 'react-icons/bi';
import logo from '../assets/fya-logo.svg';

import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useUser } from './UserContext';

export default function NavigationBar() {
  const { user, userData, loading } = useUser();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut(auth);
  }

  return (
    <Flex align="center" justifyContent="space-between" p="2">
      {/* Logo */}
      <Box ml="4" onClick={() => navigate('/')}>
        <Image src={logo} alt="Find Your Art" />
      </Box>

      {/* Navigation Links */}
      <Box>
        <Link
          mr="7"
          onClick={() => navigate('/search')}
          fontWeight="500"
          fontSize="16px"
        >
          Explore
        </Link>
        <Link
          mr="7"
          onClick={() => navigate('/partners')}
          fontWeight="500"
          fontSize="16px"
        >
          Partners
        </Link>
        <Link
          mr="7"
          onClick={() => navigate('/faqs')}
          fontWeight="500"
          fontSize="16px"
        >
          FAQs
        </Link>
        <Link
          href="https://donorbox.org/change-arts-donation"
          color="red.500"
          fontWeight="500"
          fontSize="16px"
        >
          <Icon as={BiDonateHeart} ml="1" /> Donate
        </Link>
      </Box>

      {/* User Info/Login & Signup */}
      {user ? (
        !loading ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BiChevronDown size={25} />}
              bg={'none'}
            >
              <HStack>
                <Avatar
                  size="sm"
                  src={userData?.picture}
                  name={`${userData?.firstName} ${userData?.lastName}`}
                />
                <VStack gap={'none'}>
                  <Text fontSize="0.75rem">
                    {userData
                      ? `${userData.firstName} ${userData.lastName}`
                      : 'Loading...'}
                  </Text>
                  <Text fontWeight="500" fontSize="0.75rem">
                    {user.email}
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Spinner mr="32" />
        )
      ) : (
        <Box>
          <Button
            as={RouterLink}
            to="/login"
            fontWeight="normal"
            color="black"
            borderRadius="2rem"
            variant="outline"
            borderColor="black"
            ml="4"
            fontSize="16px"
          >
            Log in
          </Button>
          <Button
            as={RouterLink}
            to="/sign-up"
            fontWeight="normal"
            color="white"
            borderRadius="2rem"
            backgroundColor="#494847"
            ml="4"
            fontSize="16px"
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Flex>
  );
}
