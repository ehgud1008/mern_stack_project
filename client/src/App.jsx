import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import Private from './components/Private';
import CreateListing from './pages/CreateListing';
import MyListing from './pages/MyListing';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<Private />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/createListing' element={<CreateListing />} />
          <Route path='/myListing' elemen={ <MyListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
