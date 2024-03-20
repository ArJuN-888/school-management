import React, { useContext, useEffect, useState } from 'react'
import GetPname from './Hooks/GetParentName'
import mycontext from '../Context/Context'
import axios from 'axios'

const ParentProfile = () => {
    const [student,setStudent]=useState([])
    console.log("student",student)
    const {baseURL}=useContext(mycontext)
    const parentName=GetPname()


    useEffect(()=>{
     AllStudents()
    },[])

    const AllStudents=async()=>{
        try {
            const response= await axios.get(`${baseURL}/Parent/getallparent`)
            console.log(response.data.parent)
            const logedinParentStudent= response.data.parent.filter((u)=> u.parentname===parentName )
            setStudent(logedinParentStudent)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div><h1> Hai {parentName} This is Your Children Profile</h1>

<div className="teacher-data">
        {student.map((data, index) => (
          <div className="teacher-info" key={index}>
            <h3>{data.studentname}</h3>
            <p>ID: {data._id}</p>
            <p>Email: {data.email}</p>
            <p>Classteacher-Name: {data.classteacher}</p>
            <p>Status: {data.status}</p>
            <p>Batch: {data.batch}</p>
            <p>Health:{data.health}</p>
            <p>ParentName:{data.parentname}</p>
            <p>Parentphone:{data.parentphone}</p>
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default ParentProfile