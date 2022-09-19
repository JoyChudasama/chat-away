import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseDatabase } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {

        const firebaseAuthCurrentUser = onAuthStateChanged(firebaseAuth, (loggedInUser) => {
            setCurrentUser(loggedInUser);
        });


        // const liveUserUpdate = onSnapshot(doc(firebaseDatabase, 'users', currentUser.uid), (doc) => {
        //     if (doc.exists()) {
        //         setBlockedUsers(doc.data.hasBlockes)
        //     }
        // });

        return () => {
            firebaseAuthCurrentUser()
            // liveUserUpdate()
        };

    }, []);


    useEffect(() => {

        // const firebaseDatabaseCurrentUser = async () => {
        //     const userDoc = await getDoc(doc(firebaseDatabase, 'users', currentUser.uid));
        //     setUser(userDoc.data());
        // }

        // const firebaseDatabaseCurrentUser =  onSnapshot(doc(firebaseDatabase, 'users', currentUser.uid), (doc) => {
        //     if (doc.exists()) {
        //         setUser(doc.data());
        //     }
        // });

        currentUser && firebaseDatabaseCurrentUser();

        return () => firebaseDatabaseCurrentUser();
    }, []);




    return (
        <AuthContext.Provider value={{ currentUser, user }} >
            {children}
        </AuthContext.Provider>
    )
};