import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import { NotesState } from './context';

function App() {
  const { isLoggedIn } = NotesState();
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={!isLoggedIn ? <Auth/> : <Navigate to="/" />} />
    </Routes>
    </>
  );
}

export default App;
