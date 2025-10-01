import React, { useState } from 'react'
import "./Login.css"
import assets from "../../../src/assets/assets.js"


const Login = () => {
    const [currState, setCurrState] = useState("Sign Up")
  return (
    <div className='login'>
        <img src={assets.logo_big} className='logo' alt="" />
        <form className='login-form'>
            <h2>{currState}</h2>
            {currState === "Sign Up" ? <input type="text" placeholder='Username' className='form-input' required /> : null}
            <input type="email" placeholder='Email Address'  className='form-input' required />
            <input type="text" placeholder='Password' className='form-input' required />
            <button type='submit' >{currState}</button>
            <div className="login-term">
                <input type='checkbox'/>
                <p>Agree to the terms of use and privacy policy</p>
            </div>
            <div className="login-forgot">
                { currState === "Sign Up" ? <p className="login-toggle">
                    Already have and account? <span onClick={() => setCurrState("Log In")}>Click here</span>
                </p> :
                    <p className="login-toggle">
                        Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                    </p>
                }
            </div>
        </form>
    </div>
  )
}

export default Login