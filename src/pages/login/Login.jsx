import React from 'react'
import "./Login.css"
import assets from "../../../src/assets/assets.js"


const Login = () => {
  return (
    <div className='login'>
        <img src={assets.logo_big} className='logo' alt="" />
        <form className='login-form'>
            <h2>Sign Up</h2>
            <input type="text" placeholder='Username' className='form-input' required />
            <input type="email" placeholder='Email Address'  className='form-input' required />
            <input type="text" placeholder='Password' className='form-input' required />
            <button type='submit' >Sign up</button>
            <div className="login-term">
                <input type='checkbox'/>
                <p>Agree to the terms of use and privacy policy</p>
            </div>
            <div className="login-forgot">
                <p className="login-toggle">
                    Already have an account? <span>Click here</span> 
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login