import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import mycontext from "../Context/Context";
import axios from "axios";
import { Table } from "react-bootstrap";
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
      if (!date) {
        alert("Please select a date.");
        return;
      }
      
      const selectedDate = date.toLocaleDateString(); // Convert selected date to string
      const isAttendanceMarked = await checkAttendance(studentId, selectedDate);
  
      if (isAttendanceMarked) {
        console.log("Attendance already marked for the selected date.");
        alert("Attendance has already been marked for the selected date");
      } else {
        const response = await axios.post(`${baseURL}/attendence/attendencemark`, {
          studentid: studentId,
          date: selectedDate,
          status,
        });
        console.log("Marked student id:", response.data.markedstudentid);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert(error.response.data.message);
    }
  };
  
  
  // Custom function to check if attendance is already marked
  const checkAttendance = async (studentId, date) => {
    try {
      const response = await axios.get(`${baseURL}/attendence/attendance/check`, {
        params: {
          studentid: studentId,
          date,
        },
      });
      return response.data.attendanceExists; // Assuming the API returns a boolean indicating whether attendance exists
    } catch (error) {
      console.error("Error checking attendance:", error);
      return false; // Assume attendance check failed
    }
  };
  


  return (
    <div className="m-2" style={{ letterSpacing: "2px" }}>
      <div className="heading">
        <h1 className="fs-3">Record Your Class Attendance Here</h1>
      </div>
      <div className="table fs-5">
        <Table responsive striped hover variant="white">
         {loggedteacherStudents.length !==0 && <thead style={{ letterSpacing: "4px" }}>
            <tr>
              <th className="bg-primary text-white ">ADM no</th>
              <th className="bg-primary text-white ">Student Name</th>
              <th className="bg-primary text-white ">Date</th>
              <th className="bg-primary text-white ">Attendance</th>
              <th className="bg-primary text-white ">Action</th>
            </tr>
          </thead>}
          <tbody>
            {loggedteacherStudents.length > 0 && (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollno}</td>
                  <td>{student.studentname}</td>
                  <td>
                    <DatePicker
                      placeholderText="Select the date..."
                      selected={date}
                      onChange={(date) => setDate(date)}
                      maxDate={new Date()}
                    />
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
                      <option value="" disabled>
                        CHOOSE
                      </option>
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="HALFDAY">HALFDAY</option>
                    </select>
                  </td>
                  <td>
                    <Button
                      style={{
                        borderRadius: "0.2rem",
                        boxShadow: "0px 0px 5px 0px grey",
                        letterSpacing: "2px",
                      }}
                      onClick={() =>
                        markAttendance(student._id, student.status)
                      }
                    >
                      Mark Attendance
                    </Button>
                  </td>
                </tr>
              ))
            )} 
           
            
          </tbody>
        </Table>
        {loggedteacherStudents.length === 0 && <label>No student data available</label>} 
      </div>
    </div>
  );
};

export default Studentattendence;