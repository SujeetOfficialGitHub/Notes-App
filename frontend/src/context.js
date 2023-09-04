import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext({});

const NotesProvider = ({children}) => {
    const [token, setToken] = useState('');
    const isLoggedIn = !!token 

    useEffect(() => {
        const initialToken = localStorage.getItem('token')
        if (initialToken){
            setToken(initialToken)
        }
    }, [])

    const handleLogout = () => {
        setToken('')
        localStorage.getItem('token')
    }
    return (
    <NotesContext.Provider value={{
        token,
        setToken,
        handleLogout,
        isLoggedIn
    }}>
        {children}
    </NotesContext.Provider>
    )
};

export const NotesState = () => {
    return useContext(NotesContext)
};
export default NotesProvider;