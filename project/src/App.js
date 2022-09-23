
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/LoginForm';
import Home from './pages/Home';
import Error_role from './pages/Error_role';
import User from './pages/User';
import Admin from './pages/Admin';
import PrivateRouteUser from './pages/PrivateRouteUser';



function App() {
  return (

    <div className="App">

      <BrowserRouter>
        <Routes>


          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Error_role />} />

          <Route element = {<PrivateRouteUser/>}>
            <Route element = {<User/>} path = '/user' />
          </Route>

          {/* {role === 'Admin' ?
          <Route path="/home" element={<Admin/>}
           />
          :
          <Route path="/home" element={<User/>} />
          } */}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
