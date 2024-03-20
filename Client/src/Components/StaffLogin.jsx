import axios from 'axios'
import React, { useContext, useState } from 'react'
import './Styles/AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
export const StaffLogin = () => {
    const {baseURL} =useContext(mycontext)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
 const nav = useNavigate()
//Admin login function
    const StaffLogin = async() =>{
        try
        {
            const response=await axios.post(`${baseURL}/Staff/login`,{email,password})
            alert(response.data.message)
           localStorage.setItem("staffID",response.data.staffID)
           localStorage.setItem("staffName",response.data.staff.username)
           nav("/Home")
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
                <h1 className='admin-title'>Staff Login</h1>
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
                    <button className='adm-button' onClick={()=>{StaffLogin()}}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
