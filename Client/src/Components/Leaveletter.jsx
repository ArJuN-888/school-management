import React, { useContext, useEffect, useState } from 'react'
import GetParentID from './Hooks/GetParentID';
import './Styles/Leaveletter.css'
import axios from 'axios';
import mycontext from '../Context/Context';


export default function() {
    const[letters,setLetters]=useState([])
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

useEffect(()=>{
    getMyletter()
})

const leaveSubmit = async()=>{
    try
    {
        const response = await axios.post(`${baseURL}/Leave/add`,{studentname:sname,rollno,days,startdate:sdate,reason,studentclass:sclass,parentid:parentID,grant:false})
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

const getMyletter = async() =>{
    try
    {
        const response=await axios.get(`${baseURL}/Leave/getletter/${parentID}`)
        setLetters(response.data)
    }
    catch(err)
    {
        alert(err)
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
        <div className='map-container'>
            <div className='map-section'>
                <table>
                    <tr>
                        <th>Sl. No</th>
                        <th>Date</th>
                        <th>Days Applied</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                    {letters.map((a,index)=>(
                        <>
                        <td>{index+1}</td>
                        <td>{a.startdate}</td>
                        <td>{a.days}</td>
                        <td>{a.grant ? "Approved" : "Pending" }</td>
                        </>
                    ))}
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}
