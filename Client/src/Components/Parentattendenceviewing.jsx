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
    <div>
      <div className='heading'>helo... {parentName} </div>
      <div className='attendence'>
        {attendence.length===0 ?(
            <div><h3>no record found</h3></div>
        ):(
            <Table>
            <thead>
                <th>student-id</th>
                <th>Date</th>
                <th>Status</th>
            </thead>
            <tbody>
               {attendence.map((data,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.date}</td>
                    <td>{data.status}</td>
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
