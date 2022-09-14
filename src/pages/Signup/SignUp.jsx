import React, { useState } from 'react';
import './SignUp.scss';
import DatePickerWidget from '../../components/MuiComponents/DatePickerWidget';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { fireabaseDatabase, firebaseAuth, firebaseStorage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from '../../utils/SweetAlert';

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
            try {
                const user = await createUser(email, password);
                await updateCurrentUserAndAddToDatabase(user, email, userName, dateOfBirth);
            } catch (error) {
                console.log(error)
                showToast({
                    title: 'Oops..Something went wrong.',
                    position: 'top-end',
                    icon: 'error',
                    timer: 2000,
                    isShowTimeProgressBar: 'error',
                    isShowConfirmButton: false,
                    customClass: 'sweetalert sweetalertToast'
                });
            }
        }
    }

    const createUser = async (email, password) => {
        const userCredentialImpl = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        return userCredentialImpl.user;
    }

    const updateCurrentUserAndAddToDatabase = async (user, email, username, dateOfBirth) => {

        await updateProfile(user, { displayName: username });
        await addUserToCollection(user, email, dateOfBirth);
        await createUserChatCollection(user);

        navigate('/user-home');
    }

    const addUserToCollection = async (user, email, dateOfBirth) => {
        await setDoc(doc(fireabaseDatabase, 'users', user.uid), {
            uid: user.uid,
            userName: user.displayName,
            email: email,
            dateOfBirth: dateOfBirth
        });
    }

    const createUserChatCollection = async (user) => {
        await setDoc(doc(fireabaseDatabase, 'userChats', user.uid), {});
    }

    return (
        <>
            <Logo />
            <div className='formContainerWrapper'>
                <div className='formContainer'>

                    <span className='title'>Sign Up</span>

                    <form className="signUpForm" onSubmit={handleSubmit}>
                        <div className='formInputContainer'>
                            <TextField type='text' label='Username' name='userName' required />
                            <TextField type='email' label='Email' name='email' required />
                            <TextField type='Password' label='Password' name='password' required onChange={(e) => { setPassword(e.target.value) }}
                                onKeyUp={validatePassword}
                            />

                            <TextField type='Password' label='Confirm Password' name='confirmPassword' className="confirmPassword" required
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                onKeyUp={validatePassword}
                                error={isPasswordMatched ? false : true}
                                helperText={isPasswordMatched ? '' : "Password does not match"}
                            />

                            <DatePickerWidget label="Date of Birth" />
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