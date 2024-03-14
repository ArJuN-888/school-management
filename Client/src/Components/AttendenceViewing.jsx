import React, { useContext, useEffect, useState } from 'react'
import GetTID from './Hooks/Getteacherid'
import GetTname from './Hooks/Getteachername'
import mycontext from '../Context/Context'
import axios from 'axios'

const AttendenceViewing = () => {
    const teacherID=GetTID()
    const teacherName= GetTname()
    const {baseURL,loggedteacherStudents ,setLoggedinTeacherStudents}=useContext(mycontext)
    const [attendence,setAttendence]=useState([])
    console.log("attendence",attendence)

    useEffect(()=>{
        getStudents()
    },[teacherID])

   // Getting all Students Data
    const getStudents = async () => {
        const response = await axios.get(`${baseURL}/Parent/getallparent`,{
          params:{
            teacherid:teacherID
          }
        });
        console.log("all Students", response.data.parent);
        setLoggedinTeacherStudents(response.data.parent)
      };

      //to access Student attendence 
      const viewAttendence = async (studentid) => {
        try {
          const response = await axios.get(`${baseURL}/attendence/record/${studentid}`);
          console.log(response.data.message);
          console.log("id of student", studentid);
    
          if (response.data.message === null) {
            setAttendence([{ status: "tap view button  to see records" }]);
          } else {
            setAttendence(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
        <div className='heading'>
           <h2> {teacherName} You Can view Studence Attendence Here</h2>
        </div>
        <div className='table'>
        <table>
          <thead>
            <tr>
              <th>StudentId</th>
              <th>StudentName</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {loggedteacherStudents.length > 0 ? (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td onClick={() => viewAttendence(student._id)}>view</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No student data available</td>
              </tr>
            )}
          </tbody>
          </table>
          <div className=''>
          {attendence.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Studentid</th>
                  <th>Date</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {attendence.map((record, index) => (
                  <tr key={index}>
                    <td>{record.studentid}</td>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>No record found!</h1>
          )}
          </div>
            
        </div>

    </div>
  )
}

export default AttendenceViewing