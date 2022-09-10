import React from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';

const Login = () => {

  return (
    <>
      <Logo />

      <div className='loginFormContainerWrapper'>
        <div className='loginFormContainer'>

          <span className='loginTitle'>Log In</span>

          <form>
            <div className='loginformInputContainer'>
              <TextField label='Username' className="loginUserName-input" />
              <TextField type='password' label='Password' className="loginPassword-input" />
            </div>

            <div className='loginButtonContainer'>
              <button className='logIn-button'>Login</button>
              <button className='signUp-button'>Sign Up</button>
            </div>

          </form>

        </div>
      </div>
    </>

  )
}

export default Login;