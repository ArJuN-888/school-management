import React, { useContext, useEffect, useState } from 'react'
import GetPname from './Hooks/GetParentName'
import mycontext from '../Context/Context'
import axios from 'axios'
import GetPprofile from './Hooks/Getparentprof'
import GetParentID from './Hooks/GetParentID'
import { FaPlus,FaMinus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
const ParentProfile = () => {
    const [student,setStudent]=useState([])
    console.log("student",student)
    const {baseURL}=useContext(mycontext)
    const parentName=GetPname()
    const [tog,setTog] = useState(false)
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
    <div className="pdiv" >
          
    <div className="img-contain mb-2">
      <img className="image" src={`${reqURL}/${parentProfile}`} />
      <div className="file-parent">
        <label className="lb">
          <FaPlus className="pluss" />
          <input type="file" className="file" onChange={HandleFile} />
        </label>
      </div>
    </div>
    
        <div className="">
            {student.length === 0 ? (
                <div className="alert alert-info">No parent available</div>
            ) : (
              student.map((data, index) => (
                    <div className="card border-0 fs-5" style={{boxShadow:"0px 0px 1px 0px",borderRadius:"0.2rem"}} key={index}>
                        <div className="card-body">
                            <h3 className="card-title" style={{letterSpacing:"3px"}}>{data.parentname}</h3>
                            <p className="card-text">
                               <div style={{letterSpacing:"4px"}}>{data.email}</div> 
                               <div className='mt-2'  ><Button style={{boxShadow:"0px 0px 5px 0px grey"}} onClick={()=>setTog(!tog)}>{tog ? <FaMinus/> : <FaPlus/>}</Button></div>
                           {tog &&<>
                            <div style={{letterSpacing:"4px"}}>Student - <b style={{letterSpacing:"1px"}}>{data.studentname}</b></div> 
                           <div style={{letterSpacing:"4px"}}>Batch - <b style={{letterSpacing:"1px"}}>{data.batch}</b></div>   
                            <div style={{letterSpacing:"3px"}}>Phone no - {data.parentphone}</div>
                            <div style={{letterSpacing:"3px"}}>Stat - {data.status}</div>
                            </> }  
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
  )
}

export default ParentProfile