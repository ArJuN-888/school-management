import axios from 'axios'
import React, { useContext, useState } from 'react'
import mycontext from '../Context/Context'

export default function DoctorRegister() {

  const {baseURL}=useContext(mycontext)

  const [doctor,setDoctor]=useState([])
  console.log("doctors",doctor)

  const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
    status:"",
    qualification:""
  })
console.log("input values",data)
  const handleChange=(e)=>{
      const {name,value}=e.target
      setData({...data,[name]:value})
  }

  const handleSubmit= async()=>{
    try {
      const response= await axios.post(`${baseURL}/Doctor/register`,data)
      if(response){
        console.log(response.data)
        setDoctor(response.data)
        alert("doctor Registered Sucessfully")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='heading'><h3>Doctor Registration</h3></div>

      <div className='form'>
        <label>Username:</label>
        <input type='text' placeholder='username....' name='username' onChange={handleChange}></input>
        <label>email</label>
        <input type='email' placeholder='email.....' name='email' onChange={handleChange}></input>
        <label>password</label>
        <input type='password' placeholder='password' name='password' onChange={handleChange}></input>
        <label>Status</label>
        <select name='status' onChange={handleChange}><option></option><option value="doctor">Doctor</option></select>
        <label>qualification</label>
        <input type='text' placeholder='qualification....' name='qualification' onChange={handleChange}></input>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div>
  )
}
