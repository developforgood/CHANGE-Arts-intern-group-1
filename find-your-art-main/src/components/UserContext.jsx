import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'members', user.uid);

      getDoc(userDocRef)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
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

  return (
    <UserContext.Provider value={{ user, userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
