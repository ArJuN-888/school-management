import React, { useContext, useEffect, useState } from "react";
import Getdoctorname from "./Hooks/Getdoctorname";
import axios from "axios";
import mycontext from "../Context/Context";
const DoctorProfile = () => {
    const Doctorname=Getdoctorname()
    const {baseURL}=useContext(mycontext)
    const [doctor,setDoctor]=useState([])

    useEffect(()=>{
     getAllDoctors()
    },[])

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
  return (
    <div>
      <h1>Doctor Profile</h1>
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
