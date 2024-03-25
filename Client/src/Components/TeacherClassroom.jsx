import React, { useContext, useEffect, useState } from "react";
import getteachername from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { Table,Button,Form, Row, Col } from 'react-bootstrap';
import mycontext from "../Context/Context";
import "./Styles/Home.css";
import {Flip, toast} from "react-toastify"
export default function TeacherClassroom() {

  const teachername = getteachername();
  const teacherID = GetTID();
  const [passtoggle,setPasstoggle] = useState(false)
  const [prevpassword,setprevpassword] = useState("")
  const [sname,setsname] = useState("")
  const[pid,setpid] = useState("")
  const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents } =
    useContext(mycontext);
  console.log("logged in teacher students", loggedteacherStudents);
  const [edit, setEdit] = useState({
    studentname: "",
    parentname: "",
    classteacher: teachername,
    email: "",
    batch: "",
    parentphone: "",
    address:"",
    status: "",
    rollno:""
  });
  const [grant,setGrant] = useState(false)
  const [updatedpassword,setUpdatedpassword] = useState({
    password:"",
    confirmation:""
  })
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
  const handlePass = (key,value) =>
  {
   setUpdatedpassword({...updatedpassword,[key]:value})
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
      toast.success("Student Deleted Sucessfully",{transition:Flip})
      getStudents()
    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmit = async (id) => {
    try {
      if (!edit.studentname || !edit.parentname || !edit.email || !edit.batch  || !edit.parentphone || !edit.status) {
        toast.error("All fields are required");
        return;
      }
  
      const response = await axios.put(`${baseURL}/Parent/edit/${id}`, edit);
      console.log(response.data.message);
  
      toast.success("Parent Account Edited Successfully");
      // setEdit({
      //   studentname: "",
      //   parentname: "",
      //   classteacher: teachername,
      //   email: "",
      //   batch: "",
      //   parentphone: "",
      //   status: "",

      // });
      getStudents();
      setToggle(0);
    } catch (error) {
     toast.error(error.response.data.message)
    }
  };
  

  const handleEditbtn=(id,data)=>{
    setToggle(1)
    setStudentid(id)
    setpid(id)
    setsname(data.studentname)
    setEdit({
      studentname: data.studentname,
      parentname: data.parentname,
      classteacher: data.classteacher,
      email: data.email,
      batch: data.batch,
      parentphone: data.parentphone,
      status: data.status,
       rollno:data.rollno,
       address:data.address,
       

    })

  }


  const Cancel = () =>{
    setToggle(0)
    // setGrant(false)
   
      }
      const Togglepassreq = () =>{
        setPasstoggle(!passtoggle)
      }
      //req pass

      const RequestPasswordchange = async() =>{
        try{
      const response = await axios.post(`${baseURL}/Parent/passreq/${pid}`,{prevpassword})
    setGrant(response.data.grant)
      toast.success(response.data.message,{transition:Flip})
        }
        catch(error)
        {
      toast.error(error.response.data.message,{transition:Flip})
        }
       }      //update pass
      const UpdatePassword = async() =>{
        try{
        const response = await axios.put(`${baseURL}/Parent/updatepassword/${pid}`,updatedpassword)
          toast.success(response.data.message,{transition:Flip})
          setToggle(0)
          setGrant(false)
          setPasstoggle(false)
          setprevpassword("")
          setUpdatedpassword({
            password:"",
            confirmation:""
          })
            }
            catch(error)
            {
          toast.error(error.response.data.message,{transition:Flip})
            }
      }
  return (
    <div className="main d-block m-2 fs-5" style={{letterSpacing:"2px"}}>
      <div className="heading">
        <h3 style={{ letterSpacing: "2px" }}>
          Welcome {teachername}, to your classRoom
        </h3>
      </div>
      <div className="table fs-5" style={{ letterSpacing: "2px" }}>
      <Table responsive striped bordered hover variant="white">
  {loggedteacherStudents.length !== 0 && (
    <thead style={{ letterSpacing: "4px" }}>
      <tr>
        <th className="bg-primary text-white">Health-id</th>
        <th className="bg-primary text-white">Admnumber_no</th>
        <th className="bg-primary text-white">Batch</th>
        <th className="bg-primary text-white">Student_Name</th>
        <th className="bg-primary text-white">parent_Name</th>
        <th className="bg-primary text-white">Contact_No</th>
        <th className="bg-primary text-white">Action</th>
      </tr>
    </thead>
  )}
  <tbody>
    {loggedteacherStudents.length !== 0 && (
      loggedteacherStudents.map((student, index) => (
        <tr key={index}>
            <td style={{ padding: '10px', borderSpacing: '12px' }}>{student._id}</td>
          <td style={{ padding: '10px', borderSpacing: '12px' }}>{student.rollno}</td>
          <td style={{ padding: '10px', borderSpacing: '10px' }}>{student.batch}</td>
          <td style={{ padding: '10px', borderSpacing: '10px' }}>{student.studentname}</td>
          <td style={{ padding: '10px', borderSpacing: '10px' }}>{student.parentname}</td>
          <td style={{ padding: '10px', borderSpacing: '10px' }}>{student.parentphone}</td>
          <td className="d-flex">
            <Button className="me-1 fs-6" style={{ borderRadius: "0.2rem", boxShadow: "0px 0px 5px 0px grey", letterSpacing: "2px" }} onClick={() => handleEditbtn(student._id, student)}>Edit</Button>
            <Button className="fs-6" style={{ borderRadius: "0.2rem", boxShadow: "0px 0px 5px 0px grey", letterSpacing: "2px" }} variant="danger" onClick={() => handleDelete(student._id)}>Delete</Button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</Table>

        {loggedteacherStudents.length ===0 && <h1 style={{letterSpacing:"3px"}} className="fs-3">No student available...</h1> }
      </div>
      <div className="edit">
        {toggle === 1 && (
          <>
              <label className='fs-4 mt-4 mb-4' >{`Modifying the particulars concerning ${sname}`}   <Spinner animation="border" role="status" variant="primary" size="sm"></Spinner></label>
          <Form className=""  >
          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Roll no:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              name="rollno"
              className="fs-5"
              style={{letterSpacing:"2px"}}
              placeholder="Student name..."
              value={edit.rollno}
              onChange={handleChange}
            ></Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Student name:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              name="studentname"
              className="fs-5"
              style={{letterSpacing:"2px"}}
              placeholder="Student name..."
              value={edit.studentname}
              onChange={handleChange}
            ></Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Parent name:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              className="fs-5"
              style={{letterSpacing:"2px"}}
              name="parentname"
              placeholder="Parent name..."
              value={edit.parentname}
              onChange={handleChange}
            ></Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Email:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              className="fs-5"
              style={{letterSpacing:"2px"}}
              name="email"
              placeholder="Email..."
              value={edit.email}
              onChange={handleChange}
            ></Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Address:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              className="fs-5"
              style={{letterSpacing:"2px"}}
              name="address"
              placeholder="Address..."
              value={edit.address}
              onChange={handleChange}
            ></Form.Control>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Batch:</Form.Label>
            <Col sm="10">
            <Form.Select style={{letterSpacing:"2px"}} className="fs-5"  name="batch" disabled value={edit.batch} onChange={handleChange}>
              <option className="fs-5">batch</option>
              <option value="10A">10A</option>
              <option value="10B">10B</option>
              <option value="10C">10C</option>
             
            </Form.Select>
            </Col>
            </Form.Group>
        
         
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Student Phno:</Form.Label>
            <Col sm="10">
            <Form.Control 
              type="text"
              style={{letterSpacing:"2px"}}
              className="fs-5"
              name="parentphone"
              placeholder="Parent Phno..."
              value={edit.parentphone}
              onChange={handleChange}
            ></Form.Control>
 
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="2">Status:</Form.Label>
            <Col sm="10">
            <Form.Select style={{letterSpacing:"2px"}} className="fs-5"  name="status"  value={edit.status} onChange={handleChange}>
                       <option disabled>status</option>
              <option value="MOTHER">MOTHER</option>
              <option value="FATHER">FATHER</option>
              <option value="BROTHER">BROTHER</option>
              <option value="SISTER">SISTER</option>
              <option value="GRANDFATHER">GRANDFATHER</option>
              <option value="GRANDMOTHER">GRANDMOTHER</option>
             
            </Form.Select>
            </Col>
            </Form.Group>
           
            <Button className="me-2 mt-4 fs-6"style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"3px"}} onClick={()=> handleSubmit(studentid)}>Update</Button>
            <Button className="me-2 mt-4 fs-6" style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"3px"}}  variant='danger' onClick={Cancel}>Cancel</Button>
            <Button className="me-2 mt-4 fs-6" style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"3px"}}  variant='success' onClick={Togglepassreq}>Password Change</Button>
          </Form>
          </>
        )}
      </div>
      <div className="password-change">
      {passtoggle ===true && grant=== false && <>
      <Form className='m-2'  style={{letterSpacing:"3px"}}>
        <Form.Group as={Row}>
          <Form.Label column  sm="2" className='fs-5'>
            Previous Password:
          </Form.Label>
          <Col sm="10">
          <Form.Control 
            className='fs-5'
            value={prevpassword}
            style={{letterSpacing:"3px"}}
            placeholder='Previous password...'
            onChange={(e)=>setprevpassword(e.target.value)}
           
          />
          </Col>
         
        </Form.Group>
        <Button className='fs-6 mt-2' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='primary' onClick={RequestPasswordchange}>Request Password Change</Button>
      </Form>
      
      </> 
    
      }
         {grant ===true && <>
      <Form className='m-2'  style={{letterSpacing:"3px"}}>
        <Form.Group as={Row}>
          <Form.Label column  sm="2" className='fs-5'>
            New Password:
          </Form.Label>
          <Col sm="10">
          <Form.Control 
            className='fs-5'
            value={updatedpassword.password}
            style={{letterSpacing:"3px"}}
            placeholder='New password...'
            onChange={(e)=>handlePass("password",e.target.value)}
           
          />
          </Col>
         
        </Form.Group>
        <Form.Group as={Row} className='mt-3'>
          <Form.Label column  sm="2" className='fs-5'>
           Confirm New Password:
          </Form.Label>
          <Col sm="10">
          <Form.Control 
            className='fs-5'
            value={updatedpassword.confirmation}
            style={{letterSpacing:"3px"}}
            placeholder='Confirm password...'
            onChange={(e)=>handlePass("confirmation",e.target.value)}
           
          />
          </Col>
         
        </Form.Group>
        <Button className='fs-6' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='primary' onClick={UpdatePassword}>Update Password</Button>
      </Form>
      
      </> 
      
      
      }
      </div>
    </div>
  );
}
