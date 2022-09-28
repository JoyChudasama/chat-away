import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {

        const firebaseAuthCurrentUser = onAuthStateChanged(firebaseAuth, (loggedInUser) => {
            setCurrentUser(loggedInUser);
        });

        return () => firebaseAuthCurrentUser();
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser }} >
            {children}
        </AuthContext.Provider>
    )
};