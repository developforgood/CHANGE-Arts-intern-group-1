import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/layout';
import LinksField from '../FormComponents/LinksField';
import InputField from '../FormComponents/InputField';
import TagField from '../FormComponents/TagField';
import DualInputField from '../FormComponents/DualInputField';
import ProfileField from '../FormComponents/ProfileField';
import { Button } from '@chakra-ui/react';

export default function Organization({ handleSubmit }) {
  const [organizationData, setOrganizationData] = useState({
    role: 'organization',
    picture: null,
    name: '',
    website: '',
    socialMedia: [],
    artDisciplines: [],
    city: '',
    zip: '',
  });

  function handleOrganizationData(field, value) {
    setOrganizationData({ ...organizationData, [field]: value });
  }

  return (
    <Flex flexDirection={'column'} gap={'1.5rem'}>
      <Heading as="h1" fontSize={'1.5rem'}>
        Let's set up your Arts Organization profile!
      </Heading>
      <ProfileField
        title="Profile Picture"
        type="file"
        field="picture"
        value={organizationData['picture']}
        handleData={handleOrganizationData}
      />
      <InputField
        title="Organization"
        type="text"
        placeholder="Organization name"
        field="name"
        handleData={handleOrganizationData}
      />
      <InputField
        title="Website"
        type="text"
        placeholder="www.organization.com"
        field="website"
        handleData={handleOrganizationData}
      />
      <LinksField
        title="Social Media Link(s)"
        placeholder="www.yoursocialmedia.com"
        field="socialMedia"
        data={organizationData}
        handleData={handleOrganizationData}
      />
      <TagField
        title="Art Disciplines(s)"
        placeholder="Cinema, painting, etc."
        field="artDisciplines"
        data={organizationData}
        handleData={handleOrganizationData}
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
        handleData={handleOrganizationData}
      />

      <Button isDisabled onClick={() => handleSubmit({ ...organizationData })}>
        Create User
      </Button>
    </Flex>
  );
}
