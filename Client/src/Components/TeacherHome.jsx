import React, { useContext, useEffect } from "react";
import getteachername from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import mycontext from "../Context/Context";
import "./Styles/Home.css"
export default function TeacherHome() {
  const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents} = useContext(mycontext);
  console.log("logged in teacher students",loggedteacherStudents)
  const teachername = getteachername();
  const teacherID = GetTID();

  useEffect(() => {
    if (teacherID) {
      getStudents();
    }
  }, [teacherID]);

  const getStudents = async () => {
    const response = await axios.get(`${baseURL}/Parent/getallparent`,{
      params:{
        teacherid:teacherID
      }
    });
    console.log("all Students", response.data.parent);
    setLoggedinTeacherStudents(response.data.parent)
  };
  return (
    <div className="main">
      <div className="heading">
        <h3>Welcome {teachername} this is your class Room</h3>
      </div>
      <div className="table fs-5">
        <table>
          <thead>
            <tr>
              <th>Studentid</th>
              <th>StudentName</th>
              <th>parentName</th>
              <th>parentPhone</th>
            </tr>
          </thead>
          <tbody>
            {loggedteacherStudents.length!==0 ? (
               loggedteacherStudents.map((student,index)=>(
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td>{student.parentname}</td>
                  <td>{student.parentphone}</td>
                </tr>
              ))
            ):(
            <h1>No student available</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
