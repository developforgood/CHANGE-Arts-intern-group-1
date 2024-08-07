import { Image, Box, Text, Link, Button } from '@chakra-ui/react';
import maintenance from '../assets/maintenance-background.jpg';

export default function Maintenance() {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Image src={maintenance} w={'60%'} h={'100vh'} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box maxWidth="400px">
            <Text textAlign="center" fontWeight="bold" fontSize="20px">
              This page is currently under maintenance
              <br />
              <br />
            </Text>
          </Box>
          <Box maxWidth="400px">
            <Text marginLeft="20px" textAlign="center" fontSize="15px">
              We are renovating our website to make it shine brighter than ever
              and give you an even better experience. We apologize for any
              inconvenience this may cause. Please check back soon.
              <br />
              <br />
            </Text>
          </Box>
          <Link href="/">
            <Button size="sm">Home</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
