import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(firebaseAuth, (user) => {
            setCurrentUser(user);
            console.log(user)
        });

        return () => { unsub() };

    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }} >
            {children}
        </AuthContext.Provider>
    )
};