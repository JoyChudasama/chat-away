import React from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';

const Login = () => {

  return (
    <>
      <div className='logoContainerWrapper'>
        <div className='logoContainer'>
          <span className='logo'>Chat Away...</span>
        </div>
      </div>

      <div className='formContainerWrapper'>
        <div className='formContainer'>

          <span className='title'>Log In</span>

          <form>
            <div className='formInputContainer'>
              <TextField label='Username' className="userName-input" />
              <TextField type='password' label='Password' className="password-input" />
            </div>

            <div className='buttonContainer'>
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