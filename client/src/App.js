import logo from './logo.svg';
import React, { useState } from 'react'
import Header from './components/partials/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
  
  return (
    <>
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
