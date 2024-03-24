import React, { useContext, useState } from 'react'
import doctor from "../Components/Pictures/doctor.jpg"
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUserMd } from "react-icons/fa";
import mycontext from '../Context/Context'
export default function DoctorLogin() {
  const {baseURL} = useContext(mycontext)
  const [dlogin,setDlogin] = useState({email:"",password:""})
  const [tog,setTog] = useState(false)
  const nav = useNavigate()
  const handleChange = (key,value) =>{
    setDlogin({...dlogin,[key]:value})
  }
 const loginpass = async() =>{
  try{
    const response = await axios.post(`${baseURL}/Doctor/login`,dlogin)
    localStorage.setItem("doctorID",response.data.doctorID)
    localStorage.setItem("doctorName",response.data.username)
    nav("/Home")
    alert(response.data.message)
  }
 catch(error){
console.log("Error faced",error)
alert(error.response.data.message)
 }
 }
  return (
    <div className='parent-ad d-flex   m-5 '>
    <div className='img-container-admin ' >
<img src={doctor} width="100%"/>
    </div>

   
        <div className='admin-form' style={{position:"relative"}} >
        <div className='icon-ad-hold d-flex justify-content-center '><FaUserMd className='ad-ico ' /></div>
            {/* <h1 style={{letterSpacing:"2px"}} className='admin-title'>Admin Login</h1> */}
            <input
             style={{letterSpacing:"2px"}}
             className='admin-input'
             type='text'
             value={dlogin.email}
             placeholder='Email...'
             onChange={(e)=>handleChange("email",e.target.value)}
            />
            <input
             style={{letterSpacing:"2px"}}
             className='admin-input'
             type={tog ? "text" : "password"}
             value={dlogin.password}
             placeholder='Password...'
             onChange={(e)=>handleChange("password",e.target.value)}
            />
            <div className=''>
               
                <input type='checkbox' style={{width:"2rem"}} onChange={(e)=>setTog(!tog)}/> <label>Show Password</label>
                <Button style={{borderRadius:"0.2rem",width:"100%",boxShadow:"0px 0px 8px 0px grey",
            
               letterSpacing:"2px" }}  className='mt-5' onClick={()=>{loginpass()}}>Login</Button>
            </div>
        </div>
    </div>
  )
}
