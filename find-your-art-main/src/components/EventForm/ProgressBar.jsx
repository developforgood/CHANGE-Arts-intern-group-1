import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Progress,
  Text,
} from '@chakra-ui/react';

export default function ProgressBar({ progress, step, nextStep, backStep }) {
  const navigate = useNavigate();

  return (
    <Box
      top={0}
      position={'fixed'}
      zIndex={1}
      backgroundColor={'white'}
      w={'100%'}
    >
      <Flex justifyContent={'space-between'} pt={'0.5rem'} pb={'0.5rem'}>
        <Button bg={'transparent'}>
          <CloseIcon onClick={() => navigate('/')} />
        </Button>

        <HStack color={'#6A6A68'}>
          <Text color={step === 1 && 'black'}>1. Event Details</Text>
          <ChevronRightIcon borderRadius={'50%'} bg={'#E7E6E4'} />
          <Text color={step === 2 && 'black'}>2. Preview & Submit</Text>
          <ChevronRightIcon borderRadius={'50%'} bg={'#E7E6E4'} />
          <Text color={step === 3 && 'black'}>Confirmation</Text>
        </HStack>

        {step != 3 ? (
          <ButtonGroup>
            <Button
              borderRadius={'2rem'}
              isDisabled={step === 1}
              onClick={backStep}
            >
              Back
            </Button>
            <Button borderRadius={'2rem'} onClick={nextStep}>
              {step == 2 ? 'Submit' : 'Next'}
            </Button>
          </ButtonGroup>
        ) : (
          <Button borderRadius={'2rem'} as={RouterLink} to="/">
            Finish
          </Button>
        )}
      </Flex>
      <Progress value={progress} />
    </Box>
  );
}
