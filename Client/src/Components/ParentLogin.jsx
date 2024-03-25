import React, { useContext, useState } from 'react'
import axios from 'axios'
import parent from "../Components/Pictures/parent.jpg"
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
import { Button } from 'react-bootstrap'
import {Flip, toast} from 'react-toastify'
export default function ParentLogin() {
    const {baseURL}= useContext(mycontext)
    const nav = useNavigate()
    const [tog,setTog] = useState(false)
    const [plogindata,setpLogindata] = useState({email:"",password:""})
    const handleChange = (key,value) =>{
    setpLogindata({...plogindata,[key]:value})
    }
    const Login = async()=>{
        try{
            const response = await axios.post(`${baseURL}/Parent/login`,plogindata)
            toast.success(response.data.message,{transition:Flip})
            localStorage.setItem("parentID",response.data.parentID)
            localStorage.setItem("parentName",response.data.parentName)
            localStorage.setItem("parentClass",response.data.parentClass)
            localStorage.setItem("parentProfile",response.data.parentprofile)
            nav("/Home")
        }
   catch(error)
   {
 toast.error(error.response.data.message,{transition:Flip})
   }
    }
  return (
    <div className='parent-ad d-flex   m-5 '>
    <div className='img-container-admin ' >
<img src={parent} width="100%"/>
    </div>

   
        <div className='admin-form' style={{position:"relative"}} >
        <div className='icon-ad-hold d-flex justify-content-center '><FaUser className='ad-ico ' /></div>
            {/* <h1 style={{letterSpacing:"2px"}} className='admin-title'>Admin Login</h1> */}
            <input
             style={{letterSpacing:"2px"}}
             className='admin-input'
             type='text'
             value={plogindata.email}
             placeholder='Email...'
             onChange={(e)=>handleChange("email",e.target.value)}
            />
            <input
             style={{letterSpacing:"2px"}}
             className='admin-input'
             type={tog ? "text" : "password"}
             value={plogindata.password}
             placeholder='Password...'
             onChange={(e)=>handleChange("password",e.target.value)}
            />
            <div className=''>
               
                <input type='checkbox' style={{width:"2rem"}} onChange={(e)=>setTog(!tog)}/> <label>Show Password</label>
                <Button style={{borderRadius:"0.2rem",width:"100%",boxShadow:"0px 0px 8px 0px grey",
            
               letterSpacing:"2px" }}  className='mt-5' onClick={()=>{Login()}}>Login</Button>
            </div>
        </div>
    </div>
  )
}
