import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

export default function ChooseRole({ data, handleData, nextStep }) {
  return (
    <Flex flexDirection={'column'} gap={'1.5rem'}>
      <Heading as="h1" fontSize={'1.5rem'}>
        Welcome! What is your role?
      </Heading>
      <Button
        fontWeight={'normal'}
        color={'white'}
        borderRadius={'2rem'}
        backgroundColor={'#494847'}
        p={'1.5rem 0'}
        onClick={() => {
          handleData('role', 'educator');
          nextStep(3);
        }}
      >
        Teacher/Educator
      </Button>
      <Button
        fontWeight={'normal'}
        color={'white'}
        borderRadius={'2rem'}
        backgroundColor={'#494847'}
        p={'1.5rem 0'}
        onClick={() => {
          handleData('role', 'organization');
          nextStep(3);
        }}
      >
        Art organization
      </Button>
      <Button
        fontWeight={'normal'}
        color={'white'}
        borderRadius={'2rem'}
        backgroundColor={'#494847'}
        p={'1.5rem 0'}
        onClick={() => {
          handleData('role', 'teachingArtist');
          nextStep(3);
        }}
      >
        Teaching Artist
      </Button>
    </Flex>
  );
}
