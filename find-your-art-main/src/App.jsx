import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Partners from './pages/Partners';
import CreateEvent from './pages/CreateEvent';
import Maintenance from './pages/Maintenance';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import { UserProvider } from './components/UserContext';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import './App.css';

function App() {
  return (
    <APIProvider apiKey={'AIzaSyAU4Rd2-QC-mxDH7RDZN_acpbLLEkdz0og'}>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/faqs" element={<FAQ />} />
          <Route exact path="/partners" element={<Maintenance />} />
          <Route exact path="/create-event" element={<CreateEvent />} />
          <Route exact path="/events/:id" element={<EventDetails />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </APIProvider>
  );
}

export default App;
