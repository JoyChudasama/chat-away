import React, { useState } from 'react';
import './SignUp.scss';
import MuiDatePicker from '../../components/MuiComponents/MuiDatePicker';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { fireabseDatabase, firebaseAuth, firebaseStorage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isPasswordMatched, setIsPasswordMatched] = useState(true);
    const navigate = useNavigate();

    const validatePassword = () => {
        password !== confirmPassword ? setIsPasswordMatched(false) : setIsPasswordMatched(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userName = e.target.userName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const dateOfBirth = document.getElementsByClassName('muiDatePicker')[0].querySelector('input').value;

        if (isPasswordMatched) {
            const user = await createUser(email, password);
            await updateCurrentUserAndAddToDatabase(user, email, userName, dateOfBirth);
        }
    }

    const createUser = async (email, password) => {
        try {
            const userCredentialImpl = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            return userCredentialImpl.user;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.dir(errorCode, errorMessage)
        }
    }

    const updateCurrentUserAndAddToDatabase = async (user, email, username, dateOfBirth) => {
        try {
            await updateProfile(user, { displayName: username });
            await addUserToCollection(user, email, username, dateOfBirth);
            await createUserChatCollection(user);

            navigate('/user-home');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.dir(errorCode, errorMessage)
        }
    }

    const addUserToCollection = async (user, email, username, dateOfBirth) => {
        await setDoc(doc(fireabseDatabase, 'users', user.uid), {
            uid: user.uid,
            userName: username,
            email: email,
            dateOfBirth: dateOfBirth
        });
    }

    const createUserChatCollection = async (user) => {
        await setDoc(doc(fireabseDatabase, 'userChats', user.uid), {});
    }

    return (
        <>
            <Logo />
            <div className='formContainerWrapper'>
                <div className='formContainer'>

                    <span className='title'>Sign Up</span>

                    <form className="signUpForm" onSubmit={handleSubmit}>
                        <div className='formInputContainer'>
                            <TextField type='text' label='Username' name='userName' required={true} />
                            <TextField type='email' label='Email' name='email' required={true} />
                            <TextField type='Password' label='Password' name='password' required={true} onChange={(e) => { setPassword(e.target.value) }}
                                onKeyUp={validatePassword}
                            />

                            <TextField type='Password' label='Confirm Password' name='confirmPassword' className="confirmPassword" required={true}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                onKeyUp={validatePassword}
                                error={isPasswordMatched ? false : true}
                                helperText={isPasswordMatched ? '' : "Password does not match"}
                            />

                            <MuiDatePicker label="Date of Birth" />
                        </div>

                        <div className='buttonContainer'>
                            <button className='signUp-button'>Sign Up</button>
                            <Link to='/login' className='logIn-button'>
                                Login
                            </Link>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Register;