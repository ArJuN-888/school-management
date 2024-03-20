import React, { useContext,useState } from 'react'
import axios from 'axios'
import mycontext from '../Context/Context'
import GetTID from './Hooks/Getteacherid'
import GetTname from './Hooks/Getteachername'
export default function ParentRegistration() {
  const {baseURL} = useContext(mycontext)
  const teacherID = GetTID()
  const teacherName = GetTname()
  const [Parentregister, setparentRegister] = useState({
    studentname: "",
    parentname: "",
    classteacher: teacherName,
    email: "",
    batch: "",
    health: "",
    password: "",
    parentphone: "",
    status: "",
  });
  console.log("parent",Parentregister)
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
    
     <select   onChange={(e)=> handleChange("batch",e.target.value)} >
    <option value="Select a Batch">Select a Batch</option>
      <option value="10A">10A</option>
      <option value="10B">10B</option>
      <option value="10C">10C</option>
     </select>
     
     <select   onChange={(e)=> handleChange("health",e.target.value)} >
    <option value="health status">Current health status</option>
      <option value="GOOD">GOOD</option>
      <option value="BAD">BAD</option>
     </select>
     <input
        value={Parentregister.password}
        placeholder='Password...'
        onChange={(e)=>handleChange("password",e.target.value)}
     />
      <input
      value={Parentregister.parentphone}
      placeholder='Parentphone...'
      type='number'
      onChange={(e)=>handleChange("parentphone",e.target.value)}
     />
    
       <select   onChange={(e)=> handleChange("status",e.target.value)} >
    <option value="status">Status</option>
      <option value="MOTHER">MOTHER</option>
      <option value="FATHER">FATHER</option>
      <option value="BROTHER">BROTHER</option>
      <option value="SISTER">SISTER</option>
      <option value="GRANDFATHER">GRANDFATHER</option>
      <option value="GRANDMOTHER">GRANDMOTHER</option>
     </select>
     <button onClick={handleSubmit}>Register</button>
    </div>
  )
}
