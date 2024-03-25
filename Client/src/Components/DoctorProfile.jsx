import React, { useContext, useEffect, useState } from "react";
import Getdoctorname from "./Hooks/Getdoctorname";
import axios from "axios";
import mycontext from "../Context/Context";
import { FaPlus } from "react-icons/fa";
import GetdoctorID from "./Hooks/GetdoctorID";
import GetDprofile from "./Hooks/GetdocName";
const DoctorProfile = () => {
    const Doctorname=Getdoctorname()
    const {baseURL}=useContext(mycontext)
    const [doctor,setDoctor]=useState([])
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
        alert(response.data.message);
      } catch (error) {
        
        alert( error.response.data.message);
      }
    };
  
  return (
    <div>
      <h1>Doctor Profile</h1>
      <div className="img-contain">
              <img className="image" src={`${reqURL}/${doctorprofile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
      <div className="teacher-data">
        {doctor.map((data, index) => (
          <div className="teacher-info" key={index}>
            <h3>{data.username}</h3>
            <p>ID: {data._id}</p>
            <p>Email: {data.email}</p>
            <p>Specialized in: {data.qualification}</p>
            <p>Status: {data.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfile;
