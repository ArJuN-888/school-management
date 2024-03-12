import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
export default function ParentLogin() {
    const {baseURL}= useContext(mycontext)
    const nav = useNavigate()
    const [plogindata,setpLogindata] = useState({email:"",password:""})
    const handleChange = (key,value) =>{
    setpLogindata({...plogindata,[key]:value})
    }
    const Login = async()=>{
        try{
            const response = await axios.post(`${baseURL}/Parent/login`,plogindata)
            alert(response.data.message)
            localStorage.setItem("parentID",response.data.parentID)
            localStorage.setItem("parentName",response.data.parentName)
            nav("/Home")
        }
   catch(error)
   {
    console.log(error.response.data.message)
   }
    }
  return (
    <div>
        <label>Parent login</label>
        <input
        value={plogindata.email}
        onChange={(e)=>handleChange("email",e.target.value)}
        />
        <input
         value={plogindata.password}
         onChange={(e)=>handleChange("password",e.target.value)}
        />
        <button onClick={Login}>Login</button>
    </div>
  )
}
