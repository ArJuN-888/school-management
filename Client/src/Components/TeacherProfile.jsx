import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import mycontext from "../Context/Context";
import "./Styles/TP.css"
import { FaPlus } from "react-icons/fa";
import GetTprofile from "./Hooks/GetteacherProfile";
const TeacherProfile = () => {
  const { baseURL } = useContext(mycontext);
  const [teacher, setTeacher] = useState([]);
  const [reqURL,] = useState('http://localhost:5000/uploads');
  console.log("teachers", teacher);
 const teacherProfile = GetTprofile()
  const teacherName = GetTname();
  const teacherID = GetTID();
  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    try {
      const response = await axios.get(`${baseURL}/Teacher/getallteachers`);
      console.log(response.data);

      const currentTeacher = response.data.teacher.filter(
        (u) => teacherID === u._id
      );

      setTeacher(currentTeacher);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }


    try {
      const formData = new FormData();
      formData.append("file", file); // Use the correct field name
      console.log("formdata",formData)
      const response = await axios.put(`${baseURL}/Teacher/editpic/${teacherID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Add this header
          },
        }
      );

      localStorage.setItem("teacherProfile", response.data.teacher.filename);
      getTeacher();
      alert(response.data.message);
    } catch (error) {
      
      alert( error.response.data.message);
    }
  };
  return (
    <div className="teacher-profile-container">
       <div className="img-contain">
              <img className="image" src={`${reqURL}/${teacherProfile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
      <div className="teacher-profile-heading">
        <h2> Welcome {teacherName} </h2>
      </div>
      <div className="teacher-data">
        {teacher.map((data, index) => (
          <div className="teacher-info" key={index}>
            <h3>{data.username}</h3>
            <p>ID: {data._id}</p>
            <p>Email: {data.email}</p>
            <p>Specialization: {data.specialization}</p>
            <p>Status: {data.status}</p>
            <p>Batch: {data.batch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherProfile;
