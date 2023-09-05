import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const NotesContext = createContext({});

const NotesProvider = ({children}) => {
    const [token, setToken] = useState('');
    const [myNotes, setMyNotes] = useState([]);
    const isLoggedIn = !!token;
    const navigate = useNavigate()

    useEffect(() => {
        const initialToken = localStorage.getItem('token')
        if (initialToken){
            setToken(initialToken)
        }
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        // console.log('logout')
        navigate('/')
    }
    return (
    <NotesContext.Provider value={{
        token,
        setToken,
        handleLogout,
        isLoggedIn,
        myNotes,
        setMyNotes
    }}>
        {children}
    </NotesContext.Provider>
    )
};

export const NotesState = () => {
    return useContext(NotesContext)
};
export default NotesProvider;