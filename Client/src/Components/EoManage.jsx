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
        organization:"",
        phone:""
    
      })
      const [registerEo,setregisterEo] = useState({
        email:"",
        username:"",
        organization:"",
        password:"",
        status:"",
        phone: ""
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
        setToggle(2)
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
              organization:filterEo.organization,
              phone: filterEo.phone
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

          const handle1Change = (key,value) =>{
            setregisterEo({...registerEo,[key]:value})
                }
                const handleSubmit = async() =>{
                    try{
             const response = await axios.post(`${baseURL}/Organization/register`,registerEo)
             alert(response.data.message)
             fetcheo()
                    }
                    catch(error){
            alert(error.response.data.message)
                    }
                }
  return (
    <div className='fs-5' style={{letterSpacing:"2px"}}>
      <div className='m-2' >
      <div className='Staff-Register mt-2 '>
  <h3 className='mb-4'>External Organization Registration...</h3>

   </div>
      <Form  >
        <Form.Group as={Row} className='mt-2'>
          <Form.Label column sm="2">Username:</Form.Label>
          <Col sm="10" >
        <Form.Control
           style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='Username...'
        value={registerEo.username}
        onChange={(e)=> handle1Change("username",e.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} className='mt-2'>
          <Form.Label column sm="2">Email:</Form.Label>
          <Col sm="10" >
        <Form.Control
           style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='Email...'
        value={registerEo.email}
        onChange={(e)=> handle1Change("email",e.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} className='mt-2'>
        <Form.Label column sm="2">Phone No:</Form.Label>
        <Col sm="10" >
        <Form.Control
           style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='phone...'
        value={registerEo.phone}
        onChange={(e)=> handle1Change("phone",e.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} className='mt-2'>
          <Form.Label column sm="2">Password:</Form.Label>
          <Col sm="10" >
        <Form.Control
           style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='Password...'
        value={registerEo.password}
        onChange={(e)=> handle1Change("password",e.target.value)}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row} className='mt-2'>
          <Form.Label column sm="2">Status:</Form.Label>
          <Col sm="10" >
        <Form.Select   style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='Status...'
        value={registerEo.status}
        onChange={(e)=> handle1Change("status",e.target.value)}>
          <option value="">Status</option>
         <option value="Representative">Representative</option>
        </Form.Select>
        </Col>
        </Form.Group>
        <Form.Group as={Row} className='mt-2'>
          <Form.Label column sm="2">Organization:</Form.Label>
          <Col sm="10" >
        <Form.Control
           style={{letterSpacing:"2px"}}
           className='fs-5'
        placeholder='Organization...'
        value={registerEo.organization}
        onChange={(e)=> handle1Change("organization",e.target.value)}
        />
        </Col>
        </Form.Group>
        
        <Button variant='primary' className=' mt-2'  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}  onClick={handleSubmit}>Submit</Button>
      
       
        </Form>
        
    </div>
  
    <div className='all-teacher m-2 mt-3' style={{letterSpacing:"2px"}}>
    <h3 className='doc-reg-head mb-4' style={{letterSpacing:"3px"}}>Registered Organizations...</h3>
      <Table  responsive bordered hover  variant='white'>
       {allEo.length !== 0 &&
        <thead className='fs-5'>
        <tr>
          <th className="bg-primary text-white ">Organization_ID</th>
          <th className="bg-primary text-white ">Status</th>
          <th className="bg-primary text-white ">Representative</th>
          <th className="bg-primary text-white ">Organization</th>
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
          <td>{data.organization}</td>
          <td>{data.phone}</td>
        <td><Button  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 me-2' onClick={()=>handleEdit(data)}>Edit</Button>
        <Button style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} className='fs-6 ' variant='danger' onClick={()=>handleDelete(data._id)}>Delete</Button></td>
        </tr>
      ))}
      </tbody>
      </Table>
    </div>
    {toggle === 2 && (<div className='m-2 d-block' style={{letterSpacing:"2px"}}>
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
        <Form.Label column sm="2" className='fs-5'>
          phone:
        </Form.Label>
        <Col sm="10">
      <Form.Control
      className='fs-5'
      value={EOobj.phone}
      style={{letterSpacing:"3px"}}
      placeholder='Email...'
      onChange={(e)=>handleChange("phone",e.target.value)}
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
      <div className='d-flex gap-2 mt-2' style={{letterSpacing:"2px"}}>
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
  </div>
  )
}
