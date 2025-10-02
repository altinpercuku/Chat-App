import React from 'react'
import "./LeftSidebar.css"
import assets from '../../assets/assets'


const LeftSidebar = () => {
  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo' alt="Logo Icon" />
                <div className="menu">
                    <img src={assets.menu_icon} alt="Menu Icon" />
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