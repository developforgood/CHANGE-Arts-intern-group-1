import { Box, Flex, Image, Link, Icon } from '@chakra-ui/react';
import { BiDonateHeart } from 'react-icons/bi';
import { MdAlternateEmail } from 'react-icons/md';
import { CiGlobe } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import footerlogo from '../assets/footer-logo.png';

const Footer = () => {
  return (
    <Box as="footer" bg="#fdfdfd" color="black" bottom="0" width="100%">
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Box margin="0" padding="0">
          <Link href="/">
            <Image
              src={footerlogo}
              alt="Footer Logo"
              boxSize="auto"
              maxH="150px"
              align="flex-start"
            />
          </Link>
        </Box>

        <Flex direction="column" mr="32">
          {/* Pages */}
          <Flex>
            <Link mr="7" href="/" fontWeight="500" fontSize="16px">
              Explore
            </Link>
            <Link mr="7" href="/partners" fontWeight="500" fontSize="16px">
              Partners
            </Link>
            <Link mr="7" href="/faqs" fontWeight="500" fontSize="16px">
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
          </Flex>

          {/* Contact */}
          <Flex mt="8" justify="space-between">
            <Link
              href="https://www.changearts.org/"
              fontWeight="500"
              fontSize="16px"
              mr="7"
            >
              <Icon as={MdAlternateEmail} ml="1" color="gray" />{' '}
              info@changearts.org
            </Link>
            <Link
              href="https://www.changearts.org/"
              fontWeight="500"
              fontSize="16px"
              mr="7"
            >
              <Icon as={CiGlobe} ml="1" color="gray" /> changearts.org
            </Link>
            <Link
              href="https://www.instagram.com/changeartsusa/"
              fontWeight="500"
              fontSize="16px"
              mr="7"
            >
              <Icon as={FaInstagram} ml="1" color="gray" /> changeartsusa
            </Link>
          </Flex>

          {/* Disclaimer */}
          <Flex fontSize="10" color="gray" mt="2">
            CHANGE Arts is a 501(c)(3) nonprofit, tax-exempt charitable
            organization.
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
