import React from 'react';
import './Login.scss';

const Login = () => {

  return (
    <div className='formContainerWrapper'>
      <div className='formContainer'>

        <span className='logo'>Chat Away</span>
        <span className='title'>Log In</span>

        <form>
          <div className='formInputContainer'>
            <input type="text" className="userName-input" placeholder='Username' />
            <input type="password" className="password-input" placeholder='Password' />
          </div>

          <div className='buttonContainer'>
            <button className='logIn-button'>Login</button>
            <button className='signUp-button'>Sign Up</button>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login;