import React, { useState } from 'react'
import './login.css'
import assets from '../../assets/assets'
import { signup, login } from '../../config/firebase'
const Login = () => {

  const [currentState, setCurrentState] = useState("Sign up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSubmit = (event) => {
      event.preventDefault();
      if (currentState === "Sign up"){
        signup(username,email,password);
      }
      else{
        login(email,password);
      }
  }

  return (
    <div className='login'>
     <img src={assets.loqui_big} alt="" className="logo" />
     <form onSubmit={onHandleSubmit} className="login-form">
      <h2>{currentState}</h2>
      {currentState === "Sign up"?<input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder = 'Username' className="form-input" required/>: null}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder ='Email Address' className="form-input" required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder = 'Password' className="form-input" required/>
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