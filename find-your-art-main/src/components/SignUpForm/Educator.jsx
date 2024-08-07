import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import InputField from '../FormComponents/InputField';
import TagField from '../FormComponents/TagField';
import DualInputField from '../FormComponents/DualInputField';
import ProfileField from '../FormComponents/ProfileField';
import { Button } from '@chakra-ui/react';

export default function Educator({ handleSubmit }) {
  const [educatorData, setEducatorData] = useState({
    role: 'educator',
    picture: null,
    firstName: '',
    lastName: '',
    pronouns: '',
    organization: '',
    subjects: [],
    associations: [],
    city: '',
    zip: '',
  });

  function handleEducatorData(field, value) {
    setEducatorData({ ...educatorData, [field]: value });
  }

  return (
    <Flex flexDirection={'column'} gap={'1.5rem'}>
      <Heading as="h1" fontSize={'1.5rem'}>
        Let's set up your Teacher/Educator profile!
      </Heading>

      <ProfileField
        title="Profile Picture"
        type="file"
        field="picture"
        value={educatorData['picture']}
        handleData={handleEducatorData}
      />

      <DualInputField
        leftTitle="First name"
        leftType="text"
        leftPlaceholder="Jane"
        leftField="firstName"
        rightTitle="Last name"
        rightType="text"
        rightPlaceholder="Doe"
        rightField="lastName"
        handleData={handleEducatorData}
      />

      <InputField
        title="Pronouns"
        type="text"
        placeholder="he/she/they"
        field="pronouns"
        handleData={handleEducatorData}
      />

      <InputField
        title="School Name or Organization Name"
        type="text"
        placeholder="Educator Company, etc."
        field="organization"
        handleData={handleEducatorData}
      />

      <TagField
        title="Subject(s)"
        placeholder="History, math, etc."
        field="subjects"
        data={educatorData}
        handleData={handleEducatorData}
        color={undefined}
      />

      <TagField
        title="Grade Level(s) or Group Association"
        placeholder="Kindergarten, family, etc."
        field="associations"
        data={educatorData}
        handleData={handleEducatorData}
        color={undefined}
      />

      <DualInputField
        leftTitle="City"
        leftType="text"
        leftPlaceholder="Seattle, Atlanta, etc."
        leftField="city"
        rightTitle="Zip Code"
        rightType="number"
        rightPlaceholder="000000"
        rightField="zip"
        handleData={handleEducatorData}
      />

      <Button onClick={() => handleSubmit({ ...educatorData })}>
        Create User
      </Button>
    </Flex>
  );
}
