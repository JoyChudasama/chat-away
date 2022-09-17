import './style/global.scss';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import UserHome from './pages/UserHome/UserHome';
import Landing from './pages/Landing/Landing';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Account from './pages/UserAccount/UserAccount';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Landing />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user-home' element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        } />
        <Route path='/user-account' element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
