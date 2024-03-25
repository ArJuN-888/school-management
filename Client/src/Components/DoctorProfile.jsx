import React, { useContext, useEffect, useState } from "react";
import Getdoctorname from "./Hooks/Getdoctorname";
import axios from "axios";
import mycontext from "../Context/Context";
import { FaPlus,FaMinus } from "react-icons/fa";
import GetdoctorID from "./Hooks/GetdoctorID";
import GetDprofile from "./Hooks/GetdocName";
<<<<<<< HEAD
import { Button } from "react-bootstrap";
=======
import {Flip, toast} from "react-toastify"
>>>>>>> d0b41b77a7eff6489772504fe0e27d41c3761898
const DoctorProfile = () => {
    const Doctorname=Getdoctorname()
    const {baseURL}=useContext(mycontext)
    const [doctor,setDoctor]=useState([])
    const [tog,setTog] = useState(false)
    const [reqURL,] = useState('http://localhost:5000/uploads');
    useEffect(()=>{
     getAllDoctors()
    },[])
const doctorID = GetdoctorID()
const doctorprofile = GetDprofile()
    const getAllDoctors=async()=>{
        try {
            const response = await axios.get(`${baseURL}/Doctor/getalldoctor`)
            console.log(response.data)
             const loggedinDoctor= response.data.doctor.filter((u)=> Doctorname===u.username)
            setDoctor(loggedinDoctor)
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
        const response = await axios.put(`${baseURL}/Doctor/editpic/${doctorID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Add this header
            },
          }
        );
  
        localStorage.setItem("doctorProfile", response.data.doctorprofile);
        getAllDoctors();
        toast.success(response.data.message,{transition:Flip});
      } catch (error) {
        
        alert( error.response.data.message,{transition:Flip});
      }
    };
  
  return (
    <div className="pdiv" >
          
    <div className="img-contain mb-2">
      <img className="image" src={`${reqURL}/${doctorprofile}`} />
      <div className="file-parent">
        <label className="lb">
          <FaPlus className="pluss" />
          <input type="file" className="file" onChange={HandleFile} />
        </label>
      </div>
    </div>
    
        <div className="">
            {doctor.length === 0 ? (
                <div className="alert alert-info">No doctor available</div>
            ) : (
                doctor.map((data, index) => (
                    <div className="card border-0 fs-5" style={{boxShadow:"0px 0px 1px 0px",borderRadius:"0.2rem"}} key={index}>
                        <div className="card-body">
                            <h3 className="card-title" style={{letterSpacing:"3px"}}>{data.username}</h3>
                            <p className="card-text">
                               <div style={{letterSpacing:"4px"}}>{data.email}</div> 
                               <div className='mt-2'  ><Button style={{boxShadow:"0px 0px 5px 0px grey"}} onClick={()=>setTog(!tog)}>{tog ? <FaMinus/> : <FaPlus/>}</Button></div>
                           {tog &&<> 
                            <div style={{letterSpacing:"3px"}}>Qualification - {data.qualification}</div>
                            <div style={{letterSpacing:"3px"}}>Phone no - {data.phone}</div>
                            <div style={{letterSpacing:"3px"}}>Stat - {data.status}</div>
                            </> }  
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
  );
};

export default DoctorProfile;
