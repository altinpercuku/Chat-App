import React, { useState } from 'react'
import "./ProfileUpdate.css"
import assets from '../../assets/assets'


const ProfileUpdate = () => {
  const [profileImg, setProfileImg] = useState(false)

  return (
    <div className='profile'>
      <div className="profile-container">
        <form>
            <h3>Profile Details</h3>
            <label htmlFor="avatar">
              <input onChange={(e) => setProfileImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
              <img src={profileImg ? URL.createObjectURL(profileImg) : assets.avatar_icon} alt="Avatar Icon" />
              Upload Profile Image
            </label>
            <input type="text" placeholder='Your name'  required  />
            <textarea placeholder='Write Profile Bio' required></textarea>
            <button>Apply Changes</button>
        </form>
        <img src={profileImg ? URL.createObjectURL(profileImg) : assets.avatar_icon} alt="Logo" className="profile-pic" />
      </div>
    </div>
  )
}

export default ProfileUpdate