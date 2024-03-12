import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
export default function DoctorLogin() {
  const {baseURL} = useContext(mycontext)
  const [dlogin,setDlogin] = useState({email:"",password:""})
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
 }
 }
  return (
    <div>
      <input
      value={dlogin.email}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
      />
      <input
         value={dlogin.password}
         placeholder='password...'
         onChange={(e)=>handleChange("password",e.target.value)}
      />
      <Button variant='success' onClick={loginpass}>Login</Button>
      <Link to="/Dregister">Register</Link>
    </div>
  )
}
