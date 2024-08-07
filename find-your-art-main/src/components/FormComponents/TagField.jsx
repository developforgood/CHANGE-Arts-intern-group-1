import { Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import {
  Tag,
  TagLabel,
  TagCloseButton,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

export default function TagField({
  title,
  placeholder,
  field,
  data,
  handleData,
  message,
  color,
}) {
  function handleKeyDown(e) {
    const value = e.target.value.trim();
    if (e.key === 'Enter' && value) {
      handleData(field, [...data[field], e.target.value]);
      e.target.value = '';
      e.preventDefault();
    } else return;
  }

  function handleDeleteTag(pIndex) {
    handleData(
      field,
      data[field].filter((tag, index) => pIndex !== index),
    );
  }

  return (
    <FormControl>
      <FormLabel color={color}>{title}</FormLabel>
      <Flex
        p={'0 0.25rem 0 0.25rem'}
        wrap={'wrap'}
        border={'1px'}
        borderColor={{ color }}
        w={'375px'}
        _focusWithin={{ borderColor: '#3182ce', borderWidth: '2px' }}
        borderRadius={'0.75rem'}
        color={color}
      >
        {data[field].map((tag, index) => {
          return (
            <Tag mr={'0.5rem'} mt={'0.25rem'} mb={'0.25rem'}>
              <TagLabel w={'fit-content'} pt={0}>
                {tag}
              </TagLabel>
              <TagCloseButton onClick={() => handleDeleteTag(index)} />
            </Tag>
          );
        })}
        <Input
          id="create-tags"
          type="text"
          _focus={{ boxShadow: 'none' }}
          w={'max-content'}
          border={'none'}
          placeholder={placeholder}
          _placeholder={{ color }}
          onKeyDown={e => handleKeyDown(e)}
        />
      </Flex>
      {/* <FormHelperText mb={'1rem'} color="white">{`${message}`}</FormHelperText> */}
    </FormControl>
  );
}
