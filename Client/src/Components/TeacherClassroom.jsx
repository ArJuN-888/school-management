import React, { useContext, useEffect } from "react";
import getteachername from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import { Table } from "react-bootstrap";
import mycontext from "../Context/Context";
import "./Styles/Home.css"
export default function TeacherClassroom() {
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
    <div className="main d-block m-2">
      <div className="heading">
        <h3 style={{letterSpacing:"2px"}} >Welcome {teachername}, to your classRoom</h3>
      </div>
      <div className="table fs-5" style={{letterSpacing:"2px"}}>
        <Table responsive cstriped bordered hover variant="white">
          <thead style={{letterSpacing:"4px"}}>
            <tr>
              <th className='bg-primary text-white '>Student_id</th>
              <th className='bg-primary text-white '>Student_Name</th>
              <th className='bg-primary text-white '>parent_Name</th>
              <th className='bg-primary text-white '>Contact_No</th>
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
        </Table>
      </div>
    </div>
  );
}
