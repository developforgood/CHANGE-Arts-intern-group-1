import { Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/react';

export default function LinksField({
  title,
  placeholder,
  field,
  data,
  handleData,
}) {
  function handleClick(e) {
    handleData(field, [...data[field], '']);
    e.preventDefault();
  }

  function updateLink(e, pIndex) {
    handleData(
      field,
      data[field].map((link, index) =>
        index === pIndex ? e.target.value : link,
      ),
    );
  }

  function deleteLink(e, pIndex) {
    handleData(
      field,
      data[field].filter((link, index) => pIndex !== index),
    );
    e.preventDefault();
  }

  return (
    <Flex flexDirection={'column'}>
      <label>{title}</label>
      <Flex flexDirection={'column'} mt={'0.5rem'}>
        {data[field].map((link, index) => (
          <>
            <Input
              type="text"
              placeholder={placeholder}
              onChange={e => updateLink(e, index)}
              value={data[field][index]}
              borderRadius={'0.75rem'}
              pt={'1.25rem'}
              pb={'1.25rem'}
            />
            <Button
              fontWeight={'normal'}
              color={'#E02D3C'}
              background={'none'}
              alignSelf={'end'}
              w={'fit-content'}
              onClick={e => deleteLink(e, index)}
              _hover={{
                background: 'none',
                color: '#FF0015',
              }}
            >
              Remove
            </Button>
          </>
        ))}
      </Flex>
      <Button
        fontWeight={'normal'}
        color={'#2F6FED'}
        onClick={e => handleClick(e)}
        background={'none'}
        alignSelf={'start'}
        padding={'0'}
        _hover={{
          background: 'none',
          color: '#0056FF',
        }}
      >
        Add link
      </Button>
    </Flex>
  );
}
