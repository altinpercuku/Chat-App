import React, { useState } from 'react'
import "./LeftSidebar.css"
import assets from '../../assets/assets'
import signOut from "../../config/supabase"
import { useNavigate } from 'react-router-dom'

const LeftSidebar = () => {
    const [subMenu, setSubMenu] = useState("closed");
    const navigate = useNavigate()

  const handleLogout = async () => {
    const success = await signOut()
    if (success) {
      navigate("/")
    }
  }
  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo' alt="Logo Icon" />
                <div className="menu">
                    <img src={assets.menu_icon} alt="Menu Icon" onClick={() => setSubMenu(subMenu === "closed" ? "open" : "closed" )} />
                    <div className={`submenu ${subMenu}`}>
                        <p>
                            Edit profile
                        </p>
                        <hr />
                        <p onClick={handleLogout}>
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="ls-search">
            <img src={assets.search_icon} alt="Search Icon" />
            <input type="text" placeholder='Search...' />
        </div>
        <div className="ls-list">
            {Array(20).fill("").map((item, index) => (
                <div className="friends" key={index}>
                    <img src={assets.profile_img} alt="Profile Image" />
                    <div>
                    <p>Altin Percuku</p>
                    <span>Hello, how are you?</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LeftSidebar