import React, { useContext, useEffect, useState } from "react";
import getteachername from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import { Table } from "react-bootstrap";
import mycontext from "../Context/Context";
import "./Styles/Home.css";
export default function TeacherClassroom() {
  const teachername = getteachername();
  const teacherID = GetTID();
  const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents } =
    useContext(mycontext);
  console.log("logged in teacher students", loggedteacherStudents);
  const [edit, setEdit] = useState({
    studentname: "",
    parentname: "",
    classteacher: teachername,
    email: "",
    batch: "",
    health: "",
    password: "",
    parentphone: "",
    status: "",
  });

  console.log("edit",edit)

  const [toggle, setToggle] = useState(0);
  const [studentid,setStudentid]=useState([])
  console.log("studentid",studentid)

  useEffect(() => {
    if (teacherID) {
      getStudents();
    }
  }, [teacherID]);


  const handleChange=(e)=>{
    const {name,value}= e.target
    setEdit({...edit,[name]:value})
  }

  const getStudents = async () => {
    const response = await axios.get(`${baseURL}/Parent/getallparent`, {
      params: {
        teacherid: teacherID,
      },
    });
    console.log("all Students", response.data.parent);
    setLoggedinTeacherStudents(response.data.parent);
  };


  const handleDelete=async(id)=>{
    try {
      const response= await axios.delete(`${baseURL}/Parent/delete/${id}`)
      console.log(response.data.message)
      alert("Student Deleted Sucessfully")
      getStudents()
    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmit = async (id) => {
    try {
      if (!edit.studentname || !edit.parentname || !edit.email || !edit.batch || !edit.health || !edit.parentphone || !edit.status) {
        alert("All fields are required");
        return;
      }
  
      const response = await axios.put(`${baseURL}/Parent/edit/${id}`, edit);
      console.log(response.data.message);
  
      alert("Parent Account Edited Successfully");
      setEdit({
        studentname: "",
        parentname: "",
        classteacher: teachername,
        email: "",
        batch: "",
        health: "",
        parentphone: "",
        status: "",
      });
      getStudents();
      setToggle(0);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEditbtn=(id,data)=>{
    setToggle(1)
    setStudentid(id)
    setEdit({
      studentname: data.studentname,
      parentname: data.parentname,
      classteacher: data.classteacher,
      email: data.email,
      batch: data.batch,
      health: data.health,
      parentphone: data.parentphone,
      status: data.status,


    })

  }



  return (
    <div className="main d-block m-2">
      <div className="heading">
        <h3 style={{ letterSpacing: "2px" }}>
          Welcome {teachername}, to your classRoom
        </h3>
      </div>
      <div className="table fs-5" style={{ letterSpacing: "2px" }}>
        <Table responsive cstriped bordered hover variant="white">
          <thead style={{ letterSpacing: "4px" }}>
            <tr>
              <th className="bg-primary text-white ">Student_id</th>
              <th className="bg-primary text-white ">Student_Name</th>
              <th className="bg-primary text-white ">parent_Name</th>
              <th className="bg-primary text-white ">Contact_No</th>
              <th className="bg-primary text-white ">Edit</th>
              <th className="bg-primary text-white ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loggedteacherStudents.length !== 0 ? (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student._id}</td>
                  <td>{student.studentname}</td>
                  <td>{student.parentname}</td>
                  <td>{student.parentphone}</td>
                  <td><button onClick={()=> handleEditbtn(student._id,student)}>Edit</button></td>
                  <td><button onClick={()=>handleDelete(student._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <h1>No student available</h1>
            )}
          </tbody>
        </Table>
      </div>
      <div className="edit">
        {toggle === 1 && (
          <>
            <label>Student name</label>
            <input
              type="text"
              name="studentname"
              placeholder="student name"
              value={edit.studentname}
              onChange={handleChange}
            ></input>
            <label>parent name</label>
            <input
              type="text"
              name="parentname"
              placeholder="parent name"
              value={edit.parentname}
              onChange={handleChange}
            ></input>
            <label> Email</label>
            <input type="email" name="email" value={edit.email} placeholder="email" onChange={handleChange}></input>
            <label>Batch</label>
            <select name="batch" value={edit.batch} onChange={handleChange}>
              <option>batch</option>
              <option value="10A">10A</option>
              <option value="10B">10B</option>
              <option value="10C">10C</option>
            </select>
            <label>Health</label>
            <select name="health"  value={edit.health} onChange={handleChange}>
              <option></option>
              <option value="good">good</option>
              <option value="bad">bad</option>
            </select>
            <label>parent phone</label>
            <input
              type="string"
              name="parentphone"
              placeholder="parent phone"
              value={edit.parentphone}
              onChange={handleChange}
            ></input>
            <label>Status</label>
            <select name="status" value={edit.status} onChange={handleChange}>
              <option>status</option>
              <option value="MOTHER">MOTHER</option>
              <option value="FATHER">FATHER</option>
              <option value="BROTHER">BROTHER</option>
              <option value="SISTER">SISTER</option>
              <option value="GRANDFATHER">GRANDFATHER</option>
              <option value="GRANDMOTHER">GRANDMOTHER</option>
            </select>
            <button onClick={()=> handleSubmit(studentid)}>Update</button>
          </>
        )}
      </div>
    </div>
  );
}
