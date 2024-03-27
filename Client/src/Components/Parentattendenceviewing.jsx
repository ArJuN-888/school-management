import React, { useContext, useEffect, useState } from 'react'
import GetParentID from "./Hooks/GetParentID"
import GetParentName from "./Hooks/GetParentName"
import axios from 'axios'
import mycontext from '../Context/Context'
import { Table } from 'react-bootstrap'
const Parentattendenceviewing = () => {

    const {baseURL}=useContext(mycontext)

    const [attendence,seAttendence]=useState([])
    console.log("attendence",attendence)

    const parentName=GetParentName()
    const parentid=GetParentID()

    useEffect(()=>{
        AttendenceView()
    },[parentid])


    const AttendenceView=async()=>{
        try {
            const response= await axios.get(`${baseURL}/attendence/record/${parentid}`)
            console.log(response.data.message)
            seAttendence(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='m-2 fs-5' style={{letterSpacing:'3px'}}>
      <div className='heading'><h1 className='text-center' style={{color:'brown', fontFamily:'monospace', textDecoration:'underline'}}>STUDENT ATTENDENCE</h1></div>
      <div className='attendence'>
        {attendence.length===0 ?(
            <div><h5 className='text-center'>no record found</h5 ></div>
        ):(
            <Table bordered hover striped>
            <thead>
                <th className='text-center fs-5 bg-primary text-white' >student-id</th>
                <th className='text-center fs-5 bg-primary text-white'>Date</th>
                <th className='text-center fs-5 bg-primary text-white'>Status</th>
            </thead>
            <tbody>
               {attendence.map((data,index)=>(
                <tr key={index}>
                    <td className='text-center'>{index+1}</td>
                    <td className='text-center'>{new Date(data.date).toLocaleDateString('en-GB')}</td>
                    <td style={{color:data.status === "PRESENT" ? "green" : "red"}} className='text-center'>{data.status}</td>
                </tr>
               ))}
            </tbody>
         </Table>
        )}
      </div>
    </div>
  )
}

export default Parentattendenceviewing
