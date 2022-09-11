import React from 'react';
import './Login.scss';
import TextField from '@mui/material/TextField';
import Logo from '../../components/Logo/Logo';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { showToast } from '../../utils/SweetAlert';

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
      showToast({
        title: 'Incorrect email or password',
        position: 'top-end',
        icon: 'error',
        timer: 2000,
        isShowTimeProgressBar: 'error',
        isShowConfirmButton: false,
        customClass: 'sweetalert sweetalertToast'
      });
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
              <TextField label='Email' className="loginEmail-input" name='loginEmail' required />
              <TextField label='Password' type='password' className="loginPassword-input" name='loginPassword' required />
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