import React, { useContext, useState } from 'react'
import axios from 'axios'
import mycontext from '../Context/Context'
export default function ParentRegistration() {
  const {baseURL} = useContext(mycontext)
  const [Parentregister,setparentRegister] = useState({
   username:"",
   email:"",
   password:"",
   roll:"",
   studentname:"",
   studentclass:""

  })
  const handleChange = (key,value) =>{
  setparentRegister({...Parentregister,[key]:value})
  }
const handleSubmit = async(req,res) =>{
try{
const response = await axios.post(`${baseURL}/`)
}
catch(error)
{

}
}
  return (
    <div>
     <input
     value={Parentregister.username}
     onChange={(e)=>handleChange("username",e.target.value)}
     />
     <input
      value={Parentregister.email}
      onChange={(e)=>handleChange("email",e.target.value)}
     />
     <input
        value={Parentregister.password}
        onChange={(e)=>handleChange("password",e.target.value)}
     />
     <input
       value={Parentregister.roll}
       onChange={(e)=>handleChange("roll",e.target.value)}
     />
     <input
       value={Parentregister.studentname}
       onChange={(e)=>handleChange("studentname",e.target.value)}
     />
     <input
       value={Parentregister.studentclass}
       onChange={(e)=>handleChange("studentclass",e.target.value)}
     />
     <button onClick={handleSubmit}>Register</button>
    </div>
  )
}
