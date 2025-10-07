import React from 'react'
import "./RightSidebar.css"
import assets from '../../assets/assets'
import {signOut} from "../../config/supabase"
import { useNavigate } from 'react-router-dom'

const RightSidebar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const success = await signOut()
    if (success) {
      navigate("/")
    }
  }

  return (
    <div className='rs'>
      <div className="rs-profile">
          <img src={assets.profile_img} alt="Profile Image" />
          <h3>
            Altin Percuku
            <img src={assets.green_dot} className='dot' alt="Green Dot" />
          </h3>
          <p>
            Hey there I'm Altin Percuku and I'm using ChatApp
          </p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar