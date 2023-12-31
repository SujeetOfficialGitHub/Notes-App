import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import MyNotes from './pages/mynotes/MyNotes';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import { NotesState } from './context';
import Header from './components/layout/Header';
import { Heading } from '@chakra-ui/react';

function App() {
  const { isLoggedIn } = NotesState();
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      {isLoggedIn && <Route path='/profile' element={<Profile />} />}
      {isLoggedIn && <Route path='/my-notes' element={<MyNotes />} />}
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={!isLoggedIn ? <Auth/> : <Navigate to="/" />} />
      <Route path='*' element={<Heading display="flex" justifyContent="center" mt={5}>Page Not Found</Heading>} />
    </Routes>
    </>
  );
}

export default App;
