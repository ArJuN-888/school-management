import React, { useContext, useEffect, useState } from 'react'
import GetPname from './Hooks/GetParentName'
import mycontext from '../Context/Context'
import axios from 'axios'
import GetPprofile from './Hooks/Getparentprof'
import GetParentID from './Hooks/GetParentID'
import { FaPlus } from "react-icons/fa";
const ParentProfile = () => {
    const [student,setStudent]=useState([])
    console.log("student",student)
    const {baseURL}=useContext(mycontext)
    const parentName=GetPname()
const parentProfile = GetPprofile()
const parentID = GetParentID()
const [reqURL,] = useState('http://localhost:5000/uploads');
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
    const HandleFile = async (e) => {
      const file = e.target.files[0];
  
      if (!file) {
        return;
      }
  
  
      try {
        const formData = new FormData();
        formData.append("file", file); // Use the correct field name
        console.log("formdata",formData)
        const response = await axios.put(`${baseURL}/Parent/editpic/${parentID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Add this header
            },
          }
        );
  
        localStorage.setItem("teacherProfile", response.data.parent.filename);
        AllStudents()
        alert(response.data.message);
      } catch (error) {
        
        alert( error.response.data.message);
      }
    };
  return (
    <div><h1> Hai {parentName} This is Your Children Profile</h1>

<div className="teacher-data">
<div className="img-contain">
              <img className="image" src={`${reqURL}/${parentProfile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
        {student.map((data, index) => (
          <div className="teacher-info" key={index}>
            <h3>{data.studentname}</h3>
            <p>ID: {data._id}</p>
            <p>Email: {data.email}</p>
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