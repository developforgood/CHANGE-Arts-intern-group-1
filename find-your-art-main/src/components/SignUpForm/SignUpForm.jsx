import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/layout';
import Credentials from './Credentials';
import ChooseRole from './ChooseRole';
import Educator from './Educator';
import Organization from './Organization';
import TeachingArtist from './TeachingArtist';
import { doc, setDoc } from 'firebase/firestore';
import { storage, auth, db } from '../../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (done) {
      navigate('/');
    }
  }, [done]);

  function handleData(field, value) {
    setData({ ...data, [field]: value });
  }

  async function handleSubmit(roleData) {
    try {
      // Create user account with email and password
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log('Created user!');

      // Sign out the newly created user
      await signOut(auth);
      console.log('Signed out user!');

      // Sign in as the admin
      const adminEmail = 'info@changearts.org';
      const adminPassword = 'CHANGEArts2023!';
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log('Signed in as admin!');

      // Add the new user to the 'members' collection
      const profileImageRef = ref(
        storage,
        `profileImages/${roleData.picture.name + v4()}`,
      );
      const uploadPhoto = await uploadBytes(profileImageRef, roleData.picture);
      const url = await getDownloadURL(uploadPhoto.ref);
      await setDoc(doc(db, 'members', createUser.user.uid), {
        ...roleData,
        picture: url,
        email: data.email,
      });
      console.log('Added member to Firestore!');

      // Sign out admin
      await signOut(auth);
      console.log('Signed out admin!');

      // Sign in new user
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('Signed in new user!');

      // Go home
      setDone(true);
    } catch (error) {
      console.log(error);
    }
  }

  function nextStep(newStep) {
    setStep(newStep);
  }

  function displayStep() {
    switch (step) {
      case 1:
        return <Credentials handleData={handleData} nextStep={nextStep} />;
      case 2:
        return (
          <ChooseRole data={data} handleData={handleData} nextStep={nextStep} />
        );
      case 3:
        return displayRoleForm();
    }
  }

  function displayRoleForm() {
    switch (data.role) {
      case 'educator':
        return (
          <Educator
            data={data}
            nextStep={nextStep}
            handleSubmit={handleSubmit}
          />
        );
      case 'organization':
        return (
          <Organization
            data={data}
            nextStep={nextStep}
            handleSubmit={handleSubmit}
          />
        );
      case 'teachingArtist':
        return (
          <TeachingArtist
            data={data}
            nextStep={nextStep}
            handleSubmit={handleSubmit}
          />
        );
    }
  }

  return (
    <Flex flexDirection={'column'} justifyContent={'center'}>
      {displayStep()}
    </Flex>
  );
}
