import React from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';


const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    await handleSignIn(email, password);
  }

  const handleSignIn = async (email, password) => {
    try {
      const userCredentialImpl = await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate('/user-home');

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.dir(errorCode, errorMessage)
    }
  }

  return (
    <>
      <Logo />

      <div className='loginFormContainerWrapper'>
        <div className='loginFormContainer'>

          <span className='loginTitle'>Login</span>

          <form className='loginForm' onSubmit={handleSubmit}>
            <div className='loginformInputContainer'>
              <TextField label='email' className="loginEmail-input" name='loginEmail' />
              <TextField type='password' label='Password' className="loginPassword-input" name='loginPassword' />
            </div>

            <div className='loginButtonContainer'>
              <button className='logIn-button'>Login</button>
              <Link to='/sign-up' className='signUp-button'>
                Sign Up
              </Link>
            </div>

          </form>

        </div>
      </div>
    </>

  )
}

export default Login;