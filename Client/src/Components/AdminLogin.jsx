import axios from 'axios'
import React, { useState } from 'react'
import './Styles/AdminLogin.css'
import admin from "../Components/Pictures/admin.jpg"
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FaUserShield } from "react-icons/fa";
export const AdminLogin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [tog,setTog] = useState(false)
 const nav = useNavigate()
//Admin login function
    const AdLogin = async() =>{
        try
        {
            const response=await axios.post("http://localhost:5000/Admin/login",{email,password})
            alert(response.data.message)
            setEmail(" ")
            setPassword(" ")
           localStorage.setItem("adminID",response.data.adminID)
           localStorage.setItem("adminName",response.data.admin.username)
           nav("/Home")
            
        }
        catch(error)
        {
            console.log(error)
            alert(error.response.data.message)
        }
    }

  return (
<div className='parent-ad d-flex   m-5 '>
        <div className='img-container-admin ' >
 <img src={admin} width="100%"/>
        </div>

       
            <div className='admin-form' style={{position:"relative"}} >
            <div className='icon-ad-hold d-flex justify-content-center '><FaUserShield className='ad-ico ' /></div>
                {/* <h1 style={{letterSpacing:"2px"}} className='admin-title'>Admin Login</h1> */}
                <input
                 style={{letterSpacing:"2px"}}
                 className='admin-input'
                 type='text'
                 value={email}
                 placeholder='Email...'
                 onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                 style={{letterSpacing:"2px"}}
                 className='admin-input'
                 type={tog ? "text" : "password"}
                 value={password}
                 placeholder='Password...'
                 onChange={(e)=>setPassword(e.target.value)}
                />
                <div className=''>
                   
                    <input type='checkbox' style={{width:"2rem"}} onChange={(e)=>setTog(!tog)}/> <label>Show Password</label>
                    <Button style={{borderRadius:"0.2rem",width:"100%",boxShadow:"0px 0px 8px 0px grey",
                
                   letterSpacing:"2px" }}  className='mt-5' onClick={()=>{AdLogin()}}>Login</Button>
                </div>
            </div>
        </div>
  
 
  )
}
