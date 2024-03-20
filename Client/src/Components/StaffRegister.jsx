import React, { useState } from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import {useContext } from 'react';
export default function StaffRegister() {
   const {baseURL} = useContext(mycontext)
   const [staffObj,setstaffObj] = useState({
    username:"",
    email:"",
    status:"",
    password:"",
    batch:"",
    specialization:"",

  })
  
    const handleChange = (key, value) => {
        setstaffObj({ ...staffObj, [key]: value });
    };
    const register = async () => {
        try {
            const response = await axios.post(`${baseURL}/Staff/register`,staffObj );
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
 
  return (
    <div>  <label>Staff- Account -Creation </label>
    <input
        type='text'
        value={staffObj.username}
        placeholder='username...'
        onChange={(e) => handleChange("username", e.target.value)}
    />
   
     <input
        type='text'
        value={staffObj.email}
        placeholder='Email...'
        onChange={(e) => handleChange("email", e.target.value)}
    />
     <input
        type='text'
        value={staffObj.password}
        placeholder='Password...'
        onChange={(e) => handleChange("password", e.target.value)}
    />
     <input
        type='text'
        value={staffObj.specialization}
        placeholder='Specialized in...'
        onChange={(e) => handleChange("specialization", e.target.value)}
    />
       <select className='me-2' onChange={(e)=>handleChange("batch",e.target.value)}>
    <option value="select" >Select your Batch</option>
    <option value="10A">10A</option>
    <option value="10B">10B</option>
    <option value="10C">10C</option>
    <option value="10D">10D</option>
  </select>
     <select className='me-2' onChange={(e)=>handleChange("status",e.target.value)}>
    <option value="Status" >Status</option>
    <option value="Subject teacher">Subject teacher</option>
   
  </select>
    <button onClick={()=>{register()}}>Register</button>
   
    </div>
  )
}

