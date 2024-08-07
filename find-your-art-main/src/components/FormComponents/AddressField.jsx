import React, { useEffect, useState } from 'react';
import stateAbbreviations from '../../lib/types';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Box,
} from '@chakra-ui/react';

const AddressField = ({ onAddressChange }) => {
  const [addressData, setAddressData] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleStateChange = e => {
    setAddressData({ ...addressData, state: e.target.value });
  };

  const combineAddress = () => {
    const { line1, line2, city, state, zip } = addressData;
    if (line1 && city && state && zip) {
      return `${`${line1},`}${
        line2 ? `, ${line2}` : ''
      } ${`${city},`} ${state} ${zip}`;
    } else {
      return '';
    }
  };

  useEffect(() => {
    onAddressChange('address', combineAddress());
  }, [addressData]);

  return (
    <Box>
      <FormControl id="line1" isRequired>
        <FormLabel>Address Line 1</FormLabel>
        <Input
          type="text"
          name="line1"
          mb="1rem"
          value={addressData.line1}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="line2">
        <FormLabel>Address Line 2</FormLabel>
        <Input
          type="text"
          name="line2"
          mb="1rem"
          value={addressData.line2}
          onChange={handleInputChange}
        />
      </FormControl>
      <Flex>
        <FormControl id="city" flex="3" mr={2} isRequired>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="state" flex="1" mr={2} isRequired>
          <FormLabel>State</FormLabel>
          <Select
            name="state"
            value={addressData.state}
            onChange={handleStateChange}
          >
            {stateAbbreviations.map((state, index) => (
              <option key={index} value={state.abbreviation}>
                {state.abbreviation}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="zip" flex="1" isRequired>
          <FormLabel>ZIP Code</FormLabel>
          <Input
            type="number"
            name="zip"
            value={addressData.zip}
            onChange={handleInputChange}
          />
        </FormControl>
      </Flex>
    </Box>
  );
};

export default AddressField;
