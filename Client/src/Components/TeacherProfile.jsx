import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import mycontext from "../Context/Context";
import "./Styles/TP.css"
const TeacherProfile = () => {
  const { baseURL } = useContext(mycontext);
  const [teacher, setTeacher] = useState([]);
  console.log("teachers", teacher);

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
  return (
    <div className="teacher-profile-container">
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
