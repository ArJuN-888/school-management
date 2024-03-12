import React from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import {useContext } from 'react';
export default function Register() {
   const {teacherregisterdata,setteacherRegisterdata} = useContext(mycontext)
    const handleChange = (key, value) => {
        setteacherRegisterdata({ ...teacherregisterdata, [key]: value });
    };
    const register = async () => {
        try {
            const response = await axios.post("http://localhost:5000/Teacher/register",teacherregisterdata );
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div>  <label>register</label>
    <input
        type='text'
        value={teacherregisterdata.username}
        placeholder='username...'
        onChange={(e) => handleChange("username", e.target.value)}
    />
    <input
        type='text'
        value={teacherregisterdata.classname}
        placeholder='Classname...'
        onChange={(e) => handleChange("classname", e.target.value)}
    />
     <input
        type='text'
        value={teacherregisterdata.email}
        placeholder='Email...'
        onChange={(e) => handleChange("email", e.target.value)}
    />
     <input
        type='text'
        value={teacherregisterdata.password}
        placeholder='Password...'
        onChange={(e) => handleChange("password", e.target.value)}
    />
     <input
        type='text'
        value={teacherregisterdata.status}
        placeholder='Status...'
        onChange={(e) => handleChange("status", e.target.value)}
    />
    <button onClick={()=>{register()}}>Register</button>
    </div>
  )
}
