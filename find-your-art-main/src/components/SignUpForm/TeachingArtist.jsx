import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import InputField from '../FormComponents/InputField';
import TagField from '../FormComponents/TagField';
import DualInputField from '../FormComponents/DualInputField';
import LinksField from '../FormComponents/LinksField';
import ProfileField from '../FormComponents/ProfileField';
import { Button } from '@chakra-ui/react';

export default function TeachingArtist({ handleSubmit }) {
  const [artistData, setArtistData] = useState({
    role: 'teachingArtst',
    picture: null,
    firstName: '',
    lastName: '',
    pronouns: '',
    website: '',
    socialMedia: [],
    artDisciplines: [],
    city: '',
    zip: '',
  });

  function handleArtistData(field, value) {
    setArtistData({ ...artistData, [field]: value });
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
        value={artistData.picture}
        handleData={handleArtistData}
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
        handleData={handleArtistData}
      />
      <InputField
        title="Pronouns"
        type="text"
        placeholder="he/she/they"
        field="pronouns"
        handleData={handleArtistData}
      />
      <InputField
        title="Website"
        type="text"
        placeholder="www.organization.com"
        field="website"
        handleData={handleArtistData}
      />
      <LinksField
        title="Social Media Link(s)"
        placeholder="www.yoursocialmedia.com"
        field="socialMedia"
        data={artistData}
        handleData={handleArtistData}
      />
      <TagField
        title="Art Disciplines(s)"
        placeholder="Cinema, painting, etc."
        field="artDisciplines"
        data={artistData}
        handleData={handleArtistData}
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
        handleData={handleArtistData}
      />

      <Button isDisabled onClick={() => handleSubmit({ ...artistData })}>
        Create User
      </Button>
    </Flex>
  );
}
