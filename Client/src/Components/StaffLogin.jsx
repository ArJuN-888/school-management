import axios from 'axios'
import React, { useContext, useState } from 'react'
import staff from "../Components/Pictures/staff.jpg"
import { FaChalkboardTeacher } from "react-icons/fa";
import './Styles/AdminLogin.css'
import { useNavigate,Link } from 'react-router-dom'
import mycontext from '../Context/Context'
import { Button } from 'react-bootstrap'
import {Flip, toast} from "react-toastify"
export const StaffLogin = () => {
    const {baseURL} =useContext(mycontext)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [tog,setTog] = useState(false)
 const nav = useNavigate()
//Admin login function
    const StaffLogin = async() =>{
        try
        {
            const response=await axios.post(`${baseURL}/Staff/login`,{email,password})
            toast.success(response.data.message,{transition:Flip})
           localStorage.setItem("staffID",response.data.staffID)
           localStorage.setItem("staffName",response.data.staff.username)
           localStorage.setItem("staffProfile",response.data.staff.filename)
           localStorage.setItem("staffbatch",response.data.staff.batch)
           nav("/Home")
            setEmail("")
            setPassword("")
        }
        catch(error)
        {
            toast.error(error,{transition:Flip});
        }
    }

  return (
    <div className='parent-ad d-flex   m-5 '>
    <div className='img-container-admin ' >
<img src={staff} width="100%"/>
    </div>

   
        <div className='admin-form' style={{position:"relative"}} >
        <div className='icon-ad-hold d-flex justify-content-center '><FaChalkboardTeacher className='ad-ico ' /></div>
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
            
               letterSpacing:"2px" }}  className='mt-5' onClick={()=>{StaffLogin()}}>Login</Button>
            </div>
            <Link to="/Tlogin">Teacher Login</Link>
        </div>
    </div>
  )
}
