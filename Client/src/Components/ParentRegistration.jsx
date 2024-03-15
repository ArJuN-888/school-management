import React, { useContext } from 'react'
import axios from 'axios'
import mycontext from '../Context/Context'
import GetTID from './Hooks/Getteacherid'
export default function ParentRegistration() {
  const {baseURL} = useContext(mycontext)
  const teacherID = GetTID()
  const{Parentregister,setparentRegister}=useContext(mycontext)
  const handleChange = (key,value) =>{
  setparentRegister({...Parentregister,[key]:value})
  }
const handleSubmit = async() =>{
try{
const response = await axios.post(`${baseURL}/Parent/register`,Parentregister,{
  params:{
    teacherid : teacherID
  }
})
alert(response.data.message)
}
catch(error)
{
alert(error.response.data.message)
}
}
  return (
    <div>
      <input
     value={Parentregister.studentname}
     placeholder='studentname...'
     onChange={(e)=>handleChange("studentname",e.target.value)}
     />
     <input
     value={Parentregister.parentname}
     placeholder='parentname...'
     onChange={(e)=>handleChange("parentname",e.target.value)}
     />

     <input
      value={Parentregister.email}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
     />
      <input
      value={Parentregister.batch}
      placeholder='Batch...'
      onChange={(e)=>handleChange("batch",e.target.value)}
     />
      <input
      value={Parentregister.health}
      placeholder='health...'
      onChange={(e)=>handleChange("health",e.target.value)}
     />
     <input
        value={Parentregister.password}
        placeholder='Password...'
        onChange={(e)=>handleChange("password",e.target.value)}
     />
      <input
      value={Parentregister.parentphone}
      placeholder='Parentphone...'
      onChange={(e)=>handleChange("parentphone",e.target.value)}
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
