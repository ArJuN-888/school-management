import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import mycontext from "../Context/Context";
import axios from "axios";
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
        date: date.toLocaleDateString(), // Adjust date format according to server requirements
        status,
      });
      console.log("Marked student id:", response.data.markedstudentid);
      alert("Attendance Marked Successfully");
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("An error occurred while marking attendance");
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Record Your Class Attendance Here</h1>
      </div>
      <div className="table fs-5">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Date</th>
              <th>Attendance</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {loggedteacherStudents.length > 0 ? (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} maxDate={new Date()} />
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
                    </select>
                  </td>
                  <td>
                    <Button style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}} onClick={() => markAttendance(student._id, student.status)}>Mark Attendance</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No student data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Studentattendence;
