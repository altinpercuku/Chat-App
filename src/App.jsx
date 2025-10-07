import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Login from './pages/login/Login'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import Chat from './pages/Chat/Chat'
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from './config/supabase'
import { supabase } from "./config/supabase"
import PrivateRoute from './components/PrivateRoute/PrivateRoute'


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await getCurrentUser()
        if (user) {
          console.log(user.email)
        }
        else{
          console.log("User not logged in yet.")
        }
      }
      catch (err){
        console.error(err)
      }
    }
    fetchUser()
  },[])
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/chat'
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <ProfileUpdate />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
