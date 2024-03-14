import React, { useContext } from 'react'
import axios from "axios";
import mycontext from '../Context/Context';
import { useNavigate,Link } from 'react-router-dom'
export default function Login() {
  const {teacherloginData,setteacherLogindata} = useContext(mycontext)
  const nav= useNavigate()
console.log("lgindt",teacherloginData)
    const handleLoginChange = (key, value) => {
        setteacherLogindata({ ...teacherloginData, [key]: value });
    };
    const login = async () => {
        try {
            const response = await axios.post("http://localhost:5000/Teacher/login",teacherloginData );
            alert(response.data.message);
            localStorage.setItem("teacherID",response.data.tID)
            localStorage.setItem("teacherName",response.data.tname)
            nav("/Teacherhome")
           
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div>

<label>Teacher Login</label>
<div>
            <input
                type='text'
                value={teacherloginData.email}
                placeholder='Email...'
                onChange={(e) => handleLoginChange("email", e.target.value)}
            />
            
            <input
                type='text'
                value={teacherloginData.batch}
                placeholder='batch...'
                onChange={(e) => handleLoginChange("batch", e.target.value)}
            />
            <input
                type='text'
                value={teacherloginData.password}
                placeholder='Password...'
                onChange={(e) => handleLoginChange("password", e.target.value)}
            />
            <button onClick={login}>Login</button>
<Link to="/Tregister">Register</Link>
            </div>
    </div>
  )
}
