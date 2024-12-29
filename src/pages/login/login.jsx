import React, { useState } from 'react'
import './login.css'
import assets from '../../assets/assets'
const Login = () => {

  const [currentState, setCurrentState] = useState("Sign up");

  return (
    <div className='login'>
     <img src={assets.loqui_big} alt="" className="logo" />
     <form className="login-form">
      <h2>{currentState}</h2>
      {currentState === "Sign up"?<input type="email" placeholder = 'Email Address' className="form-input" required/>: null}
      <input type="text" placeholder ='Username' className="form-input" required/>
      <input type="password" placeholder = 'Password' className="form-input" required/>
      <button type='submit'>{currentState === "Sign up"?"Create Account":"Login"}</button>
      <div className="login-term">
        <input type='checkbox' />
        <p>Agree to the terms of use & privacy policy.</p>
      </div>
      <div className="login-omit">
        {
          currentState === "Sign up"
          ? <p className="login-toggle">Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here!</span></p>
          : <p className="login-toggle">Don't have an account? <span onClick={()=>setCurrentState("Sign up")}>Sign up here!</span></p>
        }
      </div>
     </form>
    </div>
  )
}

export default Login