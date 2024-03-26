import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import { Table,Button,Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import myContext from "../Context/Context"
import Staff from './Staff';
import {Flip, toast} from 'react-toastify'
export default function Teachers() {
  const {baseURL} = useContext(myContext)
  const [Teachers,setTeachers] = useState([])

  const [toggle,setToggle] = useState(0)
  const [Tname,setTname] = useState("")
  const [Tid,setTid]= useState("")
  const [passtoggle,setPasstoggle] = useState(false)
  const [prevpassword,setprevpassword] = useState("")
  const [grant,setGrant] = useState(false)
  const [updatedpassword,setUpdatedpassword] = useState({
    password:"",
    confirmation:""
  })

  const [teacherObj,setTeacherObj] = useState({
    username:"",
    email:"",
    status:"",
    batch:"",
    specialization:"",
    phone:"",

  })
  console.log("AllTEACHERS",Teachers)
  useEffect(()=>{
fetchTeachers()

  },[])
  const handleChange = (key,value) =>
  {
   setTeacherObj({...teacherObj,[key]:value})
  }
  const handlePass = (key,value) =>
  {
   setUpdatedpassword({...updatedpassword,[key]:value})
  }
  const fetchTeachers = async() =>{
    try{
      const response  = await axios.get(`${baseURL}/Teacher/getallteachers`)
      setTeachers(response.data.teacher)
    }
  catch(error)
  {
    toast.error(error.response.data.message,{transition:Flip})
  }
  }

  const handleEdit = (data) =>{
setToggle(1)
setGrant(false)
setPasstoggle(0)
setprevpassword("")
setTname(data.username)
setTid(data._id)
const filterTeachertoEdit = Teachers.find((element)=>element.batch === data.batch)
    setTeacherObj({
      username:filterTeachertoEdit.username,
      email:filterTeachertoEdit.email,
      batch:filterTeachertoEdit.batch,
      status:filterTeachertoEdit.status,
      specialization:filterTeachertoEdit.specialization,
      phone:filterTeachertoEdit.phone
    })
  }
  const Update = async() =>{
   try{
 const response = await axios.put(`${baseURL}/Teacher/update/${Tid}`,teacherObj)
 fetchTeachers()
 toast.success(response.data.message,{transition:Flip})
   }
   catch(error)
   {
 toast.error(error.response.data.message,{transition:Flip})
   }
  }
  const RequestPasswordchange = async() =>{
    try{
  const response = await axios.post(`${baseURL}/Teacher/passreq/${Tid}`,{prevpassword})
setGrant(response.data.grant)
  toast.success(response.data.message,{transition:Flip})
    }
    catch(error)
    {
  toast.error(error.response.data.message,{transition:Flip})
    }
   }
  const Cancel = () =>{
setToggle(0)
setGrant(false)
setPasstoggle(false)
  }
  const Togglepassreq = () =>{
    setPasstoggle(!passtoggle)
  }
  const UpdatePassword = async() =>{
    try{
    const response = await axios.put(`${baseURL}/Teacher/updatepassword/${Tid}`,updatedpassword)
      alert(response.data.message)
      setToggle(0)
      setGrant(false)
      setPasstoggle(false)
        }
        catch(error)
        {
      toast.error(error.response.data.message,{transition:Flip})
        }
  }
  const handleDelete = async(id) =>{
    try{
      const response = await axios.delete(`${baseURL}/Teacher/delete/${id}`)
        toast.success(response.data.message,{transition:Flip})
        fetchTeachers()
        setToggle(0)
      setGrant(false)
      setPasstoggle(false)
          }
          catch(error)
          {
        toast.error(error.response.data.message,{transition:Flip})
          }
  }
  return (
    <>
      <div className='all-teacher m-2 ' style={{letterSpacing:"3px"}}>
      <h2 className=' mb-3 text-center fs-4' ><u style={{color:'brown',fontFamily:'verdana',letterSpacing:"4px"}}>CERTIFIED TUTORS</u></h2>
        <Table  responsive bordered hover  variant='white'>
          {Teachers.length === 0 && <h3>No Data Found...</h3>}
        {Teachers.length !==0 &&  <thead className='fs-5'>
            <tr>

              <th className="bg-primary text-white ">SL_No</th>
              <th className="bg-primary text-white ">Status</th>
              <th className="bg-primary text-white ">Teacher_Name</th>
              <th className="bg-primary text-white ">Batch</th>
              <th className="bg-primary text-white ">Action</th>
            </tr>
          </thead>}
          <tbody className='fs-5'>
        {Teachers && Teachers.map((data,index)=>(
          <tr key={index}>
              <td>{index+1}</td>
            <td>{data.status}</td>
            <td>{data.username}</td>
          <td>{data.batch}</td>
          <td><Button  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 me-2' onClick={()=>handleEdit(data)}>Edit</Button>
          <Button style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 ' variant='danger' onClick={()=>handleDelete(data._id)}>Delete</Button></td>
          </tr>
        ))}
        </tbody>
        </Table>
      </div>
      {toggle === 1 && (<div className='m-2 d-block' style={{letterSpacing:"2px"}}>
        <label className='fs-4 mt-4 mb-4' >{`Modifying the particulars concerning ${Tname}`}   <Spinner animation="border" role="status" variant="primary" size="sm"></Spinner></label>
        <Form className='form '  style={{letterSpacing:"3px"}} >
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
          <Form.Label column sm="2" className='fs-5'>
            Username:
          </Form.Label>
          <Col sm="10">
        <Form.Control
        className='fs-5'
        value={teacherObj.username}
        style={{letterSpacing:"3px"}}
        placeholder='Username...'
        onChange={(e)=>handleChange("username",e.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5' >
          Batch:
        </Form.Label>
        <Col sm="10">
      <Form.Select
      className='fs-5'
      value={teacherObj.batch}
      style={{letterSpacing:"3px"}}
      placeholder='Batch...'
      onChange={(e)=>handleChange("batch",e.target.value)}
      >
        <option value="">Status</option>
        <option value="10A">10A</option>
        <option value="10B">10B</option>
        <option value="10C">10C</option>
        <option value="10D">10D</option>
      </Form.Select>
      </Col>
      </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
          <Form.Label column sm="2" className='fs-5'>
            Email:
          </Form.Label>
          <Col sm="10">
        <Form.Control
        className='fs-5'
        value={teacherObj.email}
        style={{letterSpacing:"3px"}}
        placeholder='Email...'
        onChange={(e)=>handleChange("email",e.target.value)}
        />
        </Col>
       
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2" className='fs-5'>
            Phone no:(+91)
          </Form.Label>
        <Col sm="10">
        <Form.Control
        className='fs-5'
        value={teacherObj.phone}
        style={{letterSpacing:"3px"}}
        placeholder='phone...'
        onChange={(e)=>handleChange("phone",e.target.value)}
        />
        </Col>
        </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5' >
          Status:
        </Form.Label>
        <Col sm="10">
      <Form.Select
      disabled
      className='fs-5'
      value={teacherObj.status}
      style={{letterSpacing:"3px"}}
      placeholder='Status...'
      onChange={(e)=>handleChange("status",e.target.value)}
      >
        <option value="" >Status</option>
        <option value="Class teacher">Class teacher</option>
      </Form.Select>
      </Col>
      </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
          <Form.Label column sm="2" className='fs-5' >
            Specialization:
          </Form.Label>
          <Col sm="10">
        <Form.Control
        className='fs-5'
        value={teacherObj.specialization}
        style={{letterSpacing:"3px"}}
        placeholder='Specialized in...'
        onChange={(e)=>handleChange("specialization",e.target.value)}
        />
        </Col>
        </Form.Group>
        <div className='d-flex gap-1 mt-1' style={{letterSpacing:"2px"}}>
        <Button style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}} onClick={()=>Update()}>Update</Button>
        <Button style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='danger' onClick={Cancel}>Cancel</Button>
        <Button style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='success' onClick={Togglepassreq}>Password Change</Button>
        </div>
        </Form>
      </div>)}
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
        <Button className='' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='primary' onClick={RequestPasswordchange}>Request Password Change</Button>
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
        <Button className='' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey",letterSpacing:"2px"}}  variant='primary' onClick={UpdatePassword}>Update Password</Button>
      </Form>
      
      </> 
      
      
      }
      <div className='staff'>
<Staff/>
      </div>
    </>
  )
}
