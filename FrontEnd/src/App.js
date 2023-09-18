import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginNav} from './Components/LoginNavBar/loginnav';
import { Login } from './Components/Login/login';
import { Signup } from './Components/SignUp/signup';
import { Admin } from './Components/Admin/admin';
import { SignupNav } from './Components/SignUpNavBar/signupnav';
import { UserHome } from './Components/Home/home';
import { AdminLogin } from './Components/Admin/adminlogin';
import { Feedback } from './Components/Admin/adminfeedback';
import { Post } from './Components/Admin/adminpost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<LoginNav/>,<Login/>]}></Route>
          <Route path='/signup' element={[<SignupNav/>,<Signup/>]}></Route>
          <Route path='/admin/login' element={[<AdminLogin/>]}></Route>
          <Route path='/admin' element={[<Admin/>]}></Route>
          <Route path='/admin/post' element={[<Post/>]}></Route>
          <Route path='/admin/feedback' element={[<Feedback/>]}></Route>
          <Route path='/user/home' element={[<UserHome/>]}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
library.add(fab, fas, far)