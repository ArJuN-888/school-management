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
   studentclass:"",
   status:""

  })
  const handleChange = (key,value) =>{
  setparentRegister({...Parentregister,[key]:value})
  }
const handleSubmit = async() =>{
try{
const response = await axios.post(`${baseURL}/Parent/register`,Parentregister)
alert(response.data.message)
}
catch(error)
{
console.log(error.response.data.message)
}
}
  return (
    <div>
     <input
     value={Parentregister.username}
     placeholder='Username...'
     onChange={(e)=>handleChange("username",e.target.value)}
     />
     <input
      value={Parentregister.email}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
     />
     <input
        value={Parentregister.password}
        placeholder='Password...'
        onChange={(e)=>handleChange("password",e.target.value)}
     />
     <input
       value={Parentregister.roll}
       placeholder='Roll...'
       onChange={(e)=>handleChange("roll",e.target.value)}
     />
     <input
       value={Parentregister.studentname}
       placeholder='Studentname...'
       onChange={(e)=>handleChange("studentname",e.target.value)}
     />
     <input
       value={Parentregister.studentclass}
       placeholder='StudentClass'
       onChange={(e)=>handleChange("studentclass",e.target.value)}
     />
      <input
       value={Parentregister.status}
       placeholder='Status'
       onChange={(e)=>handleChange("status",e.target.value)}
     />
     <button onClick={handleSubmit}>Register</button>
    </div>
  )
}
