import React from 'react';
import './SignUp.scss';
// import BasicDatePicker from '../components/DatePicker';

const Register = () => {


    return (
        <div className='formContainerWrapper'>
            <div className='formContainer'>

                <span className='logo'>Chat Away</span>
                <span className='title'>Sign Up</span>

                <form>
                    <div className='formInputContainer'>
                        <input type="text" className="userName-input" placeholder='Username' />
                        <input type="email" className="email-input" placeholder='Email' />
                        <input type="password" className="password-input" placeholder='Password' />
                        <input type="password" className="confirmPassword-input" placeholder='Confirm Password' />
                        {/* <BasicDatePicker /> */}
                    </div>

                    <div className='buttonContainer'>
                        <button className='signUp-button'>Sign Up</button>
                        <button className='logIn-button'>Login</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Register