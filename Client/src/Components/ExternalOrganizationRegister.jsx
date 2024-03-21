import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import mycontext from '../Context/Context'
export default function ExternalOrganizationRegister() {
    const {baseURL} = useContext(mycontext)
    const [registerEo,setregisterEo] = useState({
        email:"",
        username:"",
        organization:"",
        password:"",
        status:""
    })
    const handleChange = (key,value) =>{
setregisterEo({...registerEo,[key]:value})
    }
    const handleSubmit = async() =>{
        try{
 const response = await axios.post(`${baseURL}/Organization/register`,registerEo)
 alert(response.data.message)
        }
        catch(error){
alert(error.response.data.message)
        }
    }
  return (
    <div>
        <label>External- Account -Creation </label>
        <input
        placeholder='email...'
        value={registerEo.email}
        onChange={(e)=> handleChange("email",e.target.value)}
        />
         <input
         placeholder='username...'
        value={registerEo.username}
        onChange={(e)=> handleChange("username",e.target.value)}
        />
         <input
         placeholder='password...'
        value={registerEo.password}
        onChange={(e)=> handleChange("password",e.target.value)}
        />
         <input
         placeholder='status...'
        value={registerEo.status}
        onChange={(e)=> handleChange("status",e.target.value)}
        />
      <input
         placeholder='organization...'
        value={registerEo.organization}
        onChange={(e)=> handleChange("organization",e.target.value)}
        />
        <Button className='bg-primary' onClick={handleSubmit}>Register</Button>
    </div>
  )
}
