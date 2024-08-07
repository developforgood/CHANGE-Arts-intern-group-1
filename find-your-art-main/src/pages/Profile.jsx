import React, { useState, useEffect } from 'react';

import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 } from 'uuid';

const Profile = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Reference to the document in the 'members' collection using the user's UID
      const userDocRef = doc(db, 'members', user.uid);

      // Fetch the document data
      getDoc(userDocRef)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
            // Document exists, set the user data state
            setUserData(docSnapshot.data());
          } else {
            console.log('User document does not exist');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile">
          <h1>
            Welcome, {userData.firstName} {userData.lastName}
          </h1>
          {/* Display other user information here */}
        </div>
      ) : (
        <div className="profile">
          <p>No user data available</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
