import React from 'react'
import { useState,useContext,useEffect } from 'react'
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import { Table,Button,Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import myContext from '../Context/Context';
import {Flip, toast} from 'react-toastify'
export default function Staff() {
    useEffect(()=>{
        fetchStaff()
          },[])
    const [allstaff,setallStaff] = useState([])
    const {baseURL} = useContext(myContext)
    const [staffObj,setStaffobj] = useState({
        username:"",
        email:"",
        status:"",
        batch:"",
        specialization:"",
        phone:"",
    
      })
      console.log("allstaff",allstaff)
      const [toggle,setToggle] = useState(0)
      const [Sname,setSname] = useState("")
      const [Sid,setSid]= useState("")
      const [passtoggle,setPasstoggle] = useState(false)
      const [prevpassword,setprevpassword] = useState("")
      const [grant,setGrant] = useState(false)
      const [updatedpassword,setUpdatedpassword] = useState({
        password:"",
        confirmation:""
      })
      const handleChange = (key,value) =>
      {
        setStaffobj({...staffObj,[key]:value})
      }
      //handle pass
      const handlePass = (key,value) =>
      {
       setUpdatedpassword({...updatedpassword,[key]:value})
      }
    const fetchStaff = async() =>{
        try{
          const response  = await axios.get(`${baseURL}/Staff/getstaff`)
          setallStaff(response.data.staff)
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
        setSname(data.username)
        setSid(data._id)
        const filterstafftoedit = allstaff.find((element)=>element._id === data._id)
        setStaffobj({
              username:filterstafftoedit.username,
              email:filterstafftoedit.email,
              batch:filterstafftoedit.batch,
              status:filterstafftoedit.status,
              specialization:filterstafftoedit.specialization,
              phone:filterstafftoedit.phone
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
          const response = await axios.put(`${baseURL}/Staff/update/${Sid}`,staffObj)
          fetchStaff()
          toast.success(response.data.message,{transition:Flip})
            }
            catch(error)
            {
          toast.error(error.response.data.message,{transition:Flip})
            }
           }
           //req password
           const RequestPasswordchange = async() =>{
            try{
          const response = await axios.post(`${baseURL}/Staff/passreq/${Sid}`,{prevpassword})
        setGrant(response.data.grant)
          toast.success(response.data.message,{transition:Flip})
            }
            catch(error)
            {
          toast.error(error.response.data.message,{transition:Flip})
            }
           }
           //update Password
           const UpdatePassword = async() =>{
            try{
            const response = await axios.put(`${baseURL}/Staff/updatepassword/${Sid}`,updatedpassword)
              toast.success(response.data.message,{transition:Flip})
              setToggle(0)
              setGrant(false)
              setPasstoggle(false)
                }
                catch(error)
                {
              toast.error(error.response.data.message,{transition:Flip})
                }
          }
          //delete
          const handleDelete = async(id) =>{
            try{
              const response = await axios.delete(`${baseURL}/Staff/delete/${id}`)
                toast.success(response.data.message,{transition:Flip})
                fetchStaff()
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
    <div className='all-teacher m-2 mt-5' style={{letterSpacing:"2px"}}>
      <Table  responsive bordered hover  variant='white'>
       {allstaff.length !== 0 &&
        <thead className='fs-5'>
        <tr>
        <th className="bg-primary text-white ">SL_No</th>
          <th className="bg-primary text-white ">Status</th>
          <th className="bg-primary text-white ">Teacher_Name</th>
          <th className="bg-primary text-white ">Batch</th>
          <th className="bg-primary text-white ">Action</th>
        </tr>
      </thead>
       }
        <tbody className='fs-5'>
      {allstaff && allstaff.map((data,index)=>(
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
      <label className='fs-4 mt-4 mb-4' >{`Modifying the particulars concerning ${Sname}`}   <Spinner animation="border" role="status" variant="primary" size="sm"></Spinner></label>
      <Form className='form '  style={{letterSpacing:"3px"}} >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5'>
          Username:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={staffObj.username}
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
      value={staffObj.batch}
      style={{letterSpacing:"3px"}}
      placeholder='Batch...'
      onChange={(e)=>handleChange("batch",e.target.value)}
      >
        <option value="">Status</option>
        <option value="10A">10A</option>
        <option value="10B">10B</option>
        <option value="10C">10C</option>
        <option value="10D">10D</option>
        <option value="9A">9A</option>
        <option value="9B">9B</option>
        <option value="9C">9C</option>
        <option value="9D">9D</option>
        <option value="8A">8A</option>
                            <option value="8B">8B</option>
                            <option value="8C">8C</option>
                            <option value="8D">8D</option>
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
      value={staffObj.email}
      style={{letterSpacing:"3px"}}
      placeholder='Email...'
      onChange={(e)=>handleChange("email",e.target.value)}
      />
      </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" >
        <Form.Label column sm="2" className='fs-5'>
          phone no:(+91)
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={staffObj.phone}
      style={{letterSpacing:"3px"}}
      placeholder='Phone...'
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
      value={staffObj.status}
      style={{letterSpacing:"3px"}}
      placeholder='Status...'
      onChange={(e)=>handleChange("status",e.target.value)}
      >
        <option value="" >Status</option>
        <option value="Subject teacher">Subject teacher</option>
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
      value={staffObj.specialization}
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
  </>
  )
}
