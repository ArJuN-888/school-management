import axios from 'axios'
import React, { useState } from 'react'
import './Styles/AdminLogin.css'
import { useNavigate } from 'react-router-dom'
export const AdminLogin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
 const nav = useNavigate()
//Admin login function
    const AdLogin = async() =>{
        try
        {
            const response=await axios.post("http://localhost:5000/Admin/login",{email,password})
            alert(response.data.message)
           localStorage.setItem("adminID",response.data.adminID)
           localStorage.setItem("adminName",response.data.admin.username)
           nav("/AdminHome")
            setEmail("")
            setPassword("")
        }
        catch(error)
        {
            alert(error);
        }
    }

  return (
    <div className='admin-container'>
        <div className='admin-section'>
            <div className='admin-form'>
                <h1 className='admin-title'>Admin Login</h1>
                <input
                 className='admin-input'
                 type='text'
                 value={email}
                 placeholder='Email'
                 onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                 className='admin-input'
                 type='text'
                 value={password}
                 placeholder='Password'
                 onChange={(e)=>setPassword(e.target.value)}
                />
                <div className='but-section'>
                    <button className='adm-button' onClick={()=>{AdLogin()}}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
