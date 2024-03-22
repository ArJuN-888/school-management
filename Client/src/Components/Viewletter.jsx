import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GetTID from './Hooks/Getteacherid'
import moment from 'moment'

export default function Viewletter() {

  const[letters,setLetters]=useState([])
  const[cls,setCls]=useState("")
  const TID = GetTID()
  console.log("claa teacher",TID); 
  useEffect(()=>{
    getTeacher()
  
  },[])


 const getTeacher = async() => {
  try
  {
    const res= await axios.get(`http://localhost:5000/Teacher/find/${TID}`)
    setCls(res.data.user.batch)
    const resp= await axios.get('http://localhost:5000/Leave/getletters',{
      params:{
        clue:res.data.user.batch
      }
     })
     setLetters(resp.data)
     const dateObject = new Date(resp.data.startdate)
     console.log("date",dateObject);
  }
  catch(err)
  {
   alert(err)
  }
}

const grantSubmit = async (id,grant) => {
  try
  {
    if(grant===true)
            {
                const response =  await axios.put(`http://localhost:5000/Leave/grant/${id}`,{grant:false})
                alert(response.data.message)
            }
            else
            {
                const response =  await axios.put(`http://localhost:5000/Leave/grant/${id}`,{grant:true})
                alert(response.data.message)
            
            }
            getTeacher()
  }
  catch(err)
  {
    alert(err)
  }
}

console.log("letters",letters);
 console.log("cls",cls);


  return (
    <div className='l-container'>
      {letters ?(    
        <div className='l-section'>
            <h2 className='l-head'>Submitted LeaveLetters</h2>
            <table className='l-table'>
                <tr>
                    <th>Sl.no</th>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Start Date</th>
                    <th>No. of Days</th>
                    <th>Reason</th>
                    <th>Action</th>
                </tr>
                <tr>
                  {letters.map((a,index)=>(
                    <>
                    <td>{index+1}</td>
                    <td>{a.rollno}</td>
                    <td>{a.studentname}</td>
                    <td>{a.startdate}</td>
                    <td>{a.days}</td>
                    <td>{a.reason}</td>
                    <td><button className='l-button' onClick={()=>{grantSubmit(a._id,a.grant)}}>{a.grant? "Refuse":"Grant"}</button></td>
                    </>
                  ))}
                    
                </tr>
            </table>
        </div>
      ):( 
        <>
        <h1>No Leave Letters has been Submitted</h1>
        </>

      )}
    </div>
  )
}
