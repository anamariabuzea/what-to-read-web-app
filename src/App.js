import React from 'react';
import Navbar from './Navbar';
import Login from './containers/login/Login';
import Books from './containers/books/Books';
import Home from './containers/home/Home';
import Users from './containers/users/Users';
import Register from './containers/register/Register';
import Logout from './containers/logout/Logout';
import { Route,  BrowserRouter, Routes } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route path="/browse" element={<ProtectedRoute />}>
            <Route path="/browse" element={<Books />}></Route>
          </Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
