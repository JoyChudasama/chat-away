import './style/global.scss';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import { UserHome } from './pages/UserHome/UserHome';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <UserHome />
    </div>
  );
}

export default App;
