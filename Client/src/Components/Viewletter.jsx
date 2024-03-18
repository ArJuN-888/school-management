import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GetTID from './Hooks/Getteacherid'


export default function Viewletter() {

  const[letters,setLetters]=useState([])
  const[cls,setCls]=useState("")
  const TID = GetTID()
  console.log("claa teacher",TID); 
  useEffect(()=>{
    getTeacher()
    // getAllLetters()
    
  
  },[])

//  const getAllLetters = async() => {
//    try
//    {
//      const res= await axios.get('http://localhost:5000/Leave/getletters',{
//       params:{
//         clue:cls
//       }
//      })
//      setLetters(res.data)
//    }
//    catch(err)
//    {
//     alert(err)
//    }
//  }

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
        <div className='l-section'>
            <h2 className='l-head'>Submitted LeaveLetters</h2>
            <table className='l-table'>
                <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Start Date</th>
                    <th>No. of Days</th>
                    <th>Reason</th>
                    <th>Action</th>
                </tr>
                <tr>
                    
                </tr>
            </table>
        </div>
    </div>
  )
}
