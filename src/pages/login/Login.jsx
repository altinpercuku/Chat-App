import React, { useState } from 'react'
import "./Login.css"
import assets from "../../../src/assets/assets.js"
import { signUp, signIn } from "../../config/supabase.js"

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    if (currState === "Sign Up") {
      await signUp(username, email, password)
    } else {
      await signIn(email, password)
    }
  }

  return (
    <div className='login'>
      <img src={assets.logo_big} className='logo' alt="" />

      <form className='login-form' onSubmit={handleOnSubmit}>
        <h2>{currState}</h2>

        {currState === "Sign Up" && (
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            className='form-input'
            required
          />
        )}

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Email Address'
          className='form-input'
          required
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='Password'
          className='form-input'
          required
        />

        <button type='submit'>{currState}</button>

        <div className="login-term">
          <input type='checkbox' />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Log In")}>Click here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login