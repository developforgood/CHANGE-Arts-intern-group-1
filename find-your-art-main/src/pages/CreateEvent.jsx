import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Image } from '@chakra-ui/react';

import FirstStep from '../components/EventForm/FirstStep';
import SecondStep from '../components/EventForm/SecondStep';
import ThirdStep from '../components/EventForm/ThirdStep';
import ProgressBar from '../components/EventForm/ProgressBar';
import logo from '../assets/fya-logo.svg';
import { useUser } from '../components/UserContext';

import { collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 } from 'uuid';

export default function CreateEvent() {
  const { user, userData, loading } = useUser();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const [data, setData] = useState({
    title: '',
    discipline: '',
    ticketURL: '',
    student_price: 0,
    adult_price: 0,
    tags: [],
    content_warnings: [],
    max_age: 100,
    min_age: 0,
    location_types: [],
    address: '',
    virtual_address: '',
    start_time: '',
    end_time: '',
    time_zone: '',
    recurring: null,
    description: '',
    organizer: userData.organization,
    start_date: formattedToday,
    end_date: formattedToday,
    category: '',
    style: '',
  });

  const navigate = useNavigate();

  function handleData(field, value) {
    setData({ ...data, [field]: value });
  }

  function nextStep() {
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
      if (step === 2) {
        handleSubmit(data);
      }
    }
  }

  function backStep() {
    setStep(step - 1);
    setProgress(progress - 33.33);
  }

  async function handleSubmit(eventData) {
    try {
      let url = '';
      if (eventData.imageURL) {
        const eventImageRef = ref(
          storage,
          `eventImages/${eventData.imageURL.name + v4()}`,
        );
        const uploadImage = await uploadBytes(
          eventImageRef,
          eventData.imageURL,
        );
        url = await getDownloadURL(uploadImage.ref);
      }
      await addDoc(collection(db, 'events'), {
        ...eventData,
        imageURL: url,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]);

  return (
    <Flex
      direction={'column'}
      shadow={'none'}
      border={'none'}
      minHeight={'100vh'}
    >
      <ProgressBar
        progress={progress}
        step={step}
        nextStep={nextStep}
        backStep={backStep}
      />
      {step === 1 ? (
        <FirstStep data={data} handleData={handleData} />
      ) : step === 2 ? (
        <SecondStep data={data} />
      ) : (
        <ThirdStep />
      )}
      <Flex justifyContent={'center'} mt={'auto'}>
        <Image
          src={logo}
          alt="Find-Your-Art wide logo"
          w={'25%'}
          mt={'4rem'}
          mb={'2rem'}
        />
      </Flex>
    </Flex>
  );
}
