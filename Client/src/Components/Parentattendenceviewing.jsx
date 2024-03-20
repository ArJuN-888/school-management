import React, { useContext, useEffect, useState } from 'react'
import GetParentID from "./Hooks/GetParentID"
import GetParentName from "./Hooks/GetParentName"
import axios from 'axios'
import mycontext from '../Context/Context'
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
            seAttendence(response.data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <div className='heading'>helo... {parentName} </div>

    </div>
  )
}

export default Parentattendenceviewing
