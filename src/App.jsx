import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Login from './pages/login/Login'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import Chat from './pages/Chat/Chat'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>} ></Route>
        <Route path='/chat' element={<Chat/>} ></Route>
        <Route path='/profile' element={<ProfileUpdate/>} ></Route>
      </Routes>
    </>
  )
}

export default App
