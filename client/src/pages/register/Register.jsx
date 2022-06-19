import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context';
import './register.css'
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    setError(false)
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register",{
        username,
        email,
        password
      }); 
      //----------------------------------------------------------------
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axiosInstance.post("/auth/login", {
          username: username,
          password: password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        window.location.replace("/home")
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        // setLoginError(true)
      }
      //----------------------------------------------------------------
      // res.data && window.location.replace('/home');
    } catch (err) {
      setError(true)
    }
    // console.log(res)
    // console.log(e)

  }

  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form onSubmit={handleSubmit} className="registerForm">
            <label>Username</label>
            <input onChange={(e)=> setUsername(e.target.value)} type="text" className='registerInput' placeholder="Enter Username"/>
            <label>Email</label>
            <input onChange={(e)=> setEmail(e.target.value)} type="Email" className='registerInput' placeholder="Enter Email"/>
            <label>Password</label>
            <input onChange={(e)=> setPassword(e.target.value)} type="Password" className='registerInput' placeholder="Enter password" />
            <button type='submit' className="registerButton">Register</button>

        </form>
        <button className="registerLoginButton">
          <Link to="/login"className='link' >Login</Link>
        </button>
        {error && <span style={{color: "red"}} >Something went wrong</span>}
    </div>
  )
}
