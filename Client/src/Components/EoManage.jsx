import React from 'react'
import { useState,useContext,useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import { Table,Button,Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import myContext from '../Context/Context';
export default function EoManage() {
    useEffect(()=>{
        fetcheo()
          },[])
    const [allEo,setallEo] = useState([])
    const {baseURL} = useContext(myContext)
    const [EOobj,setEOobj] = useState({
        username:"",
        email:"",
        status:"",
        organization:""
    
      })
      console.log("allEo",allEo)
      const [toggle,setToggle] = useState(0)
      const [Ename,setEname] = useState("")
      const [Eid,setEid]= useState("")
      const [passtoggle,setPasstoggle] = useState(false)
      const [prevpassword,setprevpassword] = useState("")
      const [grant,setGrant] = useState(false)
      const [updatedpassword,setUpdatedpassword] = useState({
        password:"",
        confirmation:""
      })
      const handleChange = (key,value) =>
      {
        setEOobj({...EOobj,[key]:value})
      }
      //handle pass
      const handlePass = (key,value) =>
      {
       setUpdatedpassword({...updatedpassword,[key]:value})
      }
    const fetcheo = async() =>{
        try{
          const response  = await axios.get(`${baseURL}/Organization/geteo`)
          setallEo(response.data.eo)
        }
      catch(error)
      {
        alert(error.response.data.message)
      }
      }
      const handleEdit = (data) =>{
        setToggle(1)
        setGrant(false)
        setPasstoggle(0)
        setprevpassword("")
        setEname(data.username)
        setEid(data._id)
        const filterEo = allEo.find((element)=>element._id === data._id)
        setEOobj({
              username:filterEo.username,
              email:filterEo.email,
              status:filterEo.status,
              organization:filterEo.organization
            })
          }
      const Cancel = () =>{
        setToggle(0)
        setGrant(false)
        setPasstoggle(false)
          }
          const Togglepassreq = () =>{
            setPasstoggle(!passtoggle)
          }
          //update 
          const Update = async() =>{
            try{
          const response = await axios.put(`${baseURL}/Organization/update/${Eid}`,EOobj)
          fetcheo()
          alert(response.data.message)
            }
            catch(error)
            {
          alert(error.response.data.message)
            }
           }
           //req password
           const RequestPasswordchange = async() =>{
            try{
          const response = await axios.post(`${baseURL}/Organization/passreq/${Eid}`,{prevpassword})
        setGrant(response.data.grant)
          alert(response.data.message)
            }
            catch(error)
            {
          alert(error.response.data.message)
            }
           }
           //update Password
           const UpdatePassword = async() =>{
            try{
            const response = await axios.put(`${baseURL}/Organization/updatepassword/${Eid}`,updatedpassword)
              alert(response.data.message)
              setToggle(0)
              setGrant(false)
              setPasstoggle(false)
                }
                catch(error)
                {
              alert(error.response.data.message)
                }
          }
          //delete
          const handleDelete = async(id) =>{
            try{
              const response = await axios.delete(`${baseURL}/Organization/delete/${id}`)
                alert(response.data.message)
                fetcheo()
                setToggle(0)
              setGrant(false)
              setPasstoggle(false)
                  }
                  catch(error)
                  {
                alert(error.response.data.message)
                  }
          }
  return (
    <>
    <div className='all-teacher m-2 mt-5' style={{letterSpacing:"2px"}}>
      <Table  responsive bordered hover  variant='white'>
       {allEo.length !== 0 &&
        <thead className='fs-5'>
        <tr>
          <th className="bg-primary text-white ">Teacher_ID</th>
          <th className="bg-primary text-white ">Status</th>
          <th className="bg-primary text-white ">Teacher_Name</th>
          <th className="bg-primary text-white ">Action</th>
        </tr>
      </thead>
       }
        <tbody className='fs-5'>
      {allEo && allEo.map((data,index)=>(
        <tr key={index}>
          <td>{data._id}</td>
          <td>{data.status}</td>
          <td>{data.username}</td>
        <td><Button  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 me-2' onClick={()=>handleEdit(data)}>Edit</Button>
        <Button style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 ' variant='danger' onClick={()=>handleDelete(data._id)}>Delete</Button></td>
        </tr>
      ))}
      </tbody>
      </Table>
    </div>
    {toggle === 1 && (<div className='m-2 d-block' style={{letterSpacing:"2px"}}>
      <label className='fs-4 mt-4 mb-4' >{`Modifying the particulars concerning ${Ename}`}   <Spinner animation="border" role="status" variant="primary" size="sm"></Spinner></label>
      <Form className='form '  style={{letterSpacing:"3px"}} >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5'>
          Username:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={EOobj.username}
      style={{letterSpacing:"3px"}}
      placeholder='Username...'
      onChange={(e)=>handleChange("username",e.target.value)}
      />
      </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5' >
        Organization:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={EOobj.organization}
      disabled
      style={{letterSpacing:"3px"}}
      placeholder='Organization...'
      onChange={(e)=>handleChange("batch",e.target.value)}
      />
      </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5'>
          Email:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={EOobj.email}
      style={{letterSpacing:"3px"}}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
      />
      </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5' >
          Status:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={EOobj.status}
      style={{letterSpacing:"3px"}}
      placeholder='Status...'
      onChange={(e)=>handleChange("status",e.target.value)}
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
  </>
  )
}
