import React from 'react';
import './SignUp.scss';
import MuiDatePicker from '../../components/MuiComponents/MuiDatePicker';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';

const Register = () => {

    return (
        <>
            <Logo />
            <div className='formContainerWrapper'>
                <div className='formContainer'>

                    <span className='title'>Sign Up</span>

                    <form>
                        <div className='formInputContainer'>
                            <TextField type='text' label='Username' />
                            <TextField type='email' label='Email' />
                            <TextField type='password' label='Password' />
                            <TextField type='password' label='Confirm Password' />
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