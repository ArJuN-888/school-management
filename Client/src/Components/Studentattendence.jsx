import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import mycontext from "../Context/Context";
import axios from "axios";
import { Table} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
const Studentattendence = () => {
  const Tname = GetTname();
  const teacherID = GetTID();
  const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents } = useContext(mycontext);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getStudents();
  }, [teacherID]);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${baseURL}/Parent/getallparent`, {
        params: {
          teacherid: teacherID,
        },
      });
      const studentwithStatus = response.data.parent.map((student) => ({
        ...student,
        status: "",
      }));
      setLoggedinTeacherStudents(studentwithStatus);
    } catch (error) {
      console.error("Error fetching students:", error);
      // Handle error gracefully, display an error message to the user, or retry fetching.
    }
  };

  const markAttendance = async (studentId, status) => {
    try {
      const response = await axios.post(`${baseURL}/attendence/attendencemark`, {
        studentid: studentId,
        date: date.toLocaleDateString(), 
        status,
      });
      console.log("Marked student id:", response.data.markedstudentid);
      alert("Attendance Marked Successfully");
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("An error occurred while marking attendance");
    }
  };

  const checkattendence= async()=>{
    
  }

  return (
    <div className="m-2" style={{letterSpacing:"2px"}}>
      <div className="heading">
        <h1 className="fs-3">Record Your Class Attendance Here</h1>
      </div>
      <div className="table fs-5">
        <Table responsive bordered hover variant="white">
          <thead style={{letterSpacing:"4px"}} >
            <tr >
              <th className='bg-primary text-white '>Student ID</th>
              <th className='bg-primary text-white '>Student Name</th>
              <th className='bg-primary text-white '>Date</th>
              <th className='bg-primary text-white '>Attendance</th>
              <th className='bg-primary text-white '>Action</th>
            </tr>
          </thead>
          <tbody>
            {loggedteacherStudents.length > 0 ? (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td>
                    <DatePicker placeholderText="Select the date..." selected={date} onChange={(date) => setDate(date)} maxDate={new Date()} />
                  </td>
                  <td>
                    <select
                      value={student.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        const updatedStudents = [...loggedteacherStudents];
                        updatedStudents[index].status = newStatus;
                        setLoggedinTeacherStudents(updatedStudents);
                      }}
                    >
                      <option value="" disabled>CHOOSE</option>
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="ABSENT">HALFDAY</option>
                    </select>
                  </td>
                  <td>
                    <Button style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}} onClick={() => markAttendance(student._id, student.status)}>Mark Attendance</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No student data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Studentattendence;
