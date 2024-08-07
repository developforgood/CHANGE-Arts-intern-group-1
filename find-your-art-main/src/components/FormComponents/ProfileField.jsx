import { useRef } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup } from '@chakra-ui/input';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

export default function ProfileField({
  title,
  type,
  field,
  value,
  handleData,
}) {
  const fileInput = useRef(null);
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Flex align={'center'} gap={'0.5rem'}>
        <Avatar
          border={'1px solid gray'}
          src={value && URL.createObjectURL(value)}
        ></Avatar>
        <Flex flexDirection={'column'} justify={'center'} gap={'0.25rem'}>
          <Text>Drag a file here or browse to upload</Text>
          <Input
            type={type}
            onChange={e => handleData(field, e.target.files[0])}
            display={'none'}
            ref={fileInput}
          />
          <Button
            onClick={() => {
              fileInput.current.click();
            }}
            fontWeight={'normal'}
            borderRadius={'2rem'}
            border={'1px solid black'}
            w={'fit-content'}
            backgroundColor={'white'}
          >
            Browse
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
