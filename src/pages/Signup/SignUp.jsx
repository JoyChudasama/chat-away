import React, { useState } from 'react';
import './SignUp.scss';
import MuiDatePicker from '../../components/MuiComponents/MuiDatePicker';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';

const Register = () => {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isPasswordMatched, setIsPasswordMatched] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userName = e.target.userName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const dateOfBirth = document.getElementsByClassName('muiDatePicker')[0].querySelector('input').value;
    }

    const validatePassword = () => {
        password !== confirmPassword ? setIsPasswordMatched(false) : setIsPasswordMatched(true);
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
                            <button className='logIn-button'>Login</button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Register