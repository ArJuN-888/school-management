import React, { useContext, useState } from 'react'
import GetParentID from './Hooks/GetParentID';
import './Styles/Leaveletter.css'
import axios from 'axios';
import mycontext from '../Context/Context';


export default function() {
    const[sname,setSname]=useState("")
    const[rollno,setRollno]=useState("")
    const[days,setDays]=useState("")
    const[sdate,setSdate]=useState("")
    const[reason,SetReason]=useState("")
    const[sclass,setSclass]=useState("")
    const parentID = GetParentID()
    const{baseURL}=useContext(mycontext)
console.log("bas",baseURL);
console.log("id",parentID);
const leaveSubmit = async()=>{
    try
    {
        const response = await axios.post(`${baseURL}/Leave/add`,{studenname:sname,rollno,days,startdate:sdate,reason,studentclass:sclass,parentID})
        console.log("res",response);
        alert(response.data.message);
        setSname("")
        setRollno("")
        setDays("")
        setSdate("")
        SetReason("")
        setSclass("")
    }
    catch(error)
    {
        console.log(error);
    }
}


  return (
    <div className='leave-container'>
        <div className='leave-section'>
            <h1 className='leave-head'>Leave Letter</h1>
            <div className='leave-input-section'>
                <input 
                 className='leave-input'
                 type='text'
                 placeholder='Student Name'
                 value={sname}
                 onChange={(e)=>setSname(e.target.value)}
                />
                <input 
                 className='leave-input'
                 type='number'
                 placeholder='Student Rollno.'
                 value={rollno}
                 onChange={(e)=>setRollno(e.target.value)}
                />
                <input 
                 className='leave-input'
                 type='number'
                 placeholder='Days'
                 value={days}
                 onChange={(e)=>setDays(e.target.value)}
                />
                <input 
                 className='leave-input'
                 type='date'
                 placeholder='Starting Date'
                 value={sdate}
                 onChange={(e)=>setSdate(e.target.value)}
                />
                <input 
                 className='leave-input'
                 type='text'
                 placeholder='Reason'
                 value={reason}
                 onChange={(e)=>SetReason(e.target.value)}
                />
                <input 
                 className='leave-input'
                 type='text'
                 placeholder='Batch'
                 value={sclass}
                 onChange={(e)=>setSclass(e.target.value)}
                />
                <div className='b-sec'>
                    <button className='leave-button' onClick={()=>leaveSubmit()}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
