import React, { useContext, useEffect, useState } from 'react'
import GetTname from './Hooks/Getteachername'
import GetParentID from './Hooks/GetParentID'
import mycontext from '../Context/Context'
import axios from 'axios'
const ViewMarklist = () => {
    const teacherName=GetTname()
    const teacherID=GetParentID()
    const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents} = useContext(mycontext)
    const [mark,setMark]=useState([])

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

      const handleview = async (studentid) => {
        try {
          const response = await axios.get(
            `${baseURL}/marksheetadd/list/${studentid}`
          );
          console.log(response.data.message);
          console.log("id of student", studentid);
          if (response.data.message === null) {
            setMark([{ status: "tap view button to see records" }]);
          } else {
            setMark(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div>
      <div className="heading">
        <h3> hello {teacherName}... This your Students Marklist </h3>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Student-id</th>
              <th>StudentName</th>
              <th>View marksheet</th>
            </tr>
          </thead>
          <tbody>
            {loggedteacherStudents.length > 0 ? (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td onClick={() => handleview(student._id)}>view</td>
                </tr>
              ))
            ) : (
              <div>
                <h4>nothing to show</h4>
              </div>
            )}
          </tbody>
        </table>
        <div className="">
          <table>
            <thead>
              <tr>
                <th>studentid</th>
                <th>student name</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {mark.length > 0 ? (
                mark.map((data, index) => (
                  <tr key={index}>
                    <td>{data.studentid}</td>
                    <td>{data.name}</td>
                    <td>
                      <table>
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Scored Mark</th>
                            <th>Total Mark</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.marks.map((mark, i) => (
                            <tr key={i}>
                              <td>{mark.subject}</td>
                              <td>{mark.scoredMark}</td>
                              <td>{mark.totalMark}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <h3>No data available</h3>
                </div>
              )}
            </tbody>
          </table>
          </div>
          </div>
          </div>
  )
}

export default ViewMarklist
