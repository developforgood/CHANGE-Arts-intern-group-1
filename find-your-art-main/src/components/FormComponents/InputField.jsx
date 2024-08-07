import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Icon } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';

export default function InputField({
  title,
  type,
  placeholder,
  icon,
  field,
  handleData,
}) {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement>
            <Icon as={icon} boxSize={5} color={'gray.500'} />
          </InputLeftElement>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          onChange={e => handleData(field, e.target.value)}
          borderRadius={'0.75rem'}
          pt={'1.25rem'}
          pb={'1.25rem'}
        />
      </InputGroup>
    </FormControl>
  );
}
