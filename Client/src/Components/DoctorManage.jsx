import React, { useContext,useEffect, useState } from 'react'
import mycontext from '../Context/Context'
import axios from 'axios'
import '../Components/Styles/DoctorManage.css'
import { Button,Table ,Form, Col, Row} from 'react-bootstrap'
export default function DoctorManage() {
    const {baseURL} = useContext(mycontext)
    const[doctors,setDoctors]=useState([])
    const[doctor,setDoctor]=useState([])
    const[docID,setDocID]=useState("")
    const[passCon,setPassCon]=useState(0)
    const[editToggle,setEditToggle]=useState(0)
    const[passtoggle,setPasstoggle]=useState(0)
    const[oldPass,setOldpass]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[quali,setQuali]=useState("")
    const[status,setStatus]=useState("")
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newQuali,setNewQuali]=useState("")
    const[conPass,setConpass]=useState("")
    const[newPass,setNewpass]=useState("")
console.log("hsgh",doctors)
    useEffect(()=>{

        fetchDoctors()

    },[])

    const fetchDoctors = async() =>{
        try
        {
            const response = await axios.get(`${baseURL}/Doctor/getalldoctor`)
            setDoctors(response.data.doctor)
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const editDoc = async(id) =>{
        try
        {
            const response = await axios.get(`${baseURL}/Doctor/find/${id}`)
            setDoctor(response.data.doctor)
            setEditToggle(1)
            setDocID(id)
            setNewusername(response.data.doctor.username)
            setNewEmail(response.data.doctor.email)
            setNewQuali(response.data.doctor.qualification)
            
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }
console.log("id",docID);
    const submitButton = async() =>{
        try
        {
            const response = await axios.post(`${baseURL}/Doctor/register`,{username,email,password,qualification:quali,status})
            alert(response.data.message)
            fetchDoctors()
            setUsername("")
            setEmail("")
            setPassword("")
            setQuali("")
            setStatus("")
            setDocID("")
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const deleteDoc = async(id) =>{
        try
        {
            const response = await axios.delete(`${baseURL}/Doctor/delete/${id}`)
            alert(response.data.message)
            fetchDoctors()
            setDocID("")
        }
        catch(err)
        {
            alert(error.response.data.message)
        }
    }

    const editSave = async() =>{
        try
        {
            const response = await axios.put(`${baseURL}/Doctor/edit/${docID}`,{username:newUsername,email:newEmail,qualification:newQuali})
            alert(response.data.message)
            setEditToggle(0)
            fetchDoctors()
            setOldpass("")
            setPasstoggle(0)
            setPassCon(0)
            setDocID("")
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const cancelUpdate =async()=>{
        setEditToggle(0)
        setOldpass("")
        setPasstoggle(0)
        setPassCon(0)
        setDocID("")
    }

    const passChange = async() =>{
        setPasstoggle(1)
        setOldpass("")
    }

    const subCanpass =async() =>{
        setPasstoggle(0)
        setOldpass("")
    }

    const subPass =async() =>{
        try
        {
            const response=await axios.post(`${baseURL}/Doctor/docpassmatch/${docID}`,{password:oldPass})
            alert(response.data.message)
            if(response.data.message ==="You can now update your Password")
            {
                setPassCon(1)
                setPasstoggle(0)
            }
            setOldpass("")
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const subConpass = async() =>{
        try
        {
            const response=await axios.put(`${baseURL}/Doctor/docpassupdate/${docID}`,{password:newPass,conPass})
            alert(response.data.message)
            setOldpass("")
            setDocID("")
            if(response.data.message === "Password Updated successfully")
            {
                setPassCon(0)
                setPasstoggle(0)
            }
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const subConpassCancel = async() =>{
        setPasstoggle(0)
        setEditToggle(0)
        setPassCon(0)
        setOldpass("")
        setDocID("")
    }

  return (
    <div className='m-2 fs-5' style={{letterSpacing:"2px"}}>
        <div >
            <h3 className='doc-reg-head mb-4' style={{letterSpacing:"2px"}}>Doctor Registration...</h3>
            <Form>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Username:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5'
                    type='text'
                    value={username}
                    placeholder='Username...'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Email:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5'
                    type='text'
                    value={email}
                    placeholder='Email...'
                    onChange={(e)=>setEmail(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Password:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5'
                    type='text'
                    value={password}
                    placeholder='Password...'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Qualification:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={quali}
                    placeholder='Qualification...'
                    onChange={(e)=>setQuali(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Status:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={status}
                    placeholder='Status...'
                    onChange={(e)=>setStatus(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <div className='sub-button'>
                    <Button variant='primary' className='mb-4'  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{submitButton()}}>Submit</Button>
                </div>
            </Form>
        </div>
        <div className=''>
            <div>
            <h3 className='doc-reg-head mb-4' style={{letterSpacing:"2px"}}>Registered Doctors...</h3>
                <Table hover responsive striped  className='doc-map-ta fs-5' style={{letterSpacing:"2px"}}>
                    <thead>
                    <tr>
                        <th className='doc-map-head text-white bg-primary'>sl.No</th>
                        <th className='doc-map-head text-white bg-primary'>Username</th>
                        <th className='doc-map-head text-white bg-primary'>Email</th>
                        <th className='doc-map-head text-white bg-primary'>Qualification</th>
                        <th className='doc-map-head text-white bg-primary'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {doctors.map((doc,index)=>(
                    <tr>
                        <td className='doc-map-data'>{index+1}</td>
                        <td className='doc-map-data'>{doc.username}</td>
                        <td className='doc-map-data'>{doc.email}</td>
                        <td className='doc-map-data'>{doc.qualification}</td>
                        <td className='doc-map-data'>
                            <Button className='me-2'  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>editDoc(doc._id)}>Edit</Button>
                            <Button style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} variant='danger'  onClick={()=>deleteDoc(doc._id)}>Delete</Button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
        <div className='edit-sec-doc'>
            {editToggle ?(  
            <>
                <input
                    type='text'
                    className='new-doc-det'
                    value={newUsername}
                    placeholder='New Username'
                    onChange={(e)=>setNewusername(e.target.value)}
                />
                <input
                    type='text'
                    className='new-doc-det'
                    value={newEmail}
                    placeholder='New Email'
                    onChange={(e)=>setNewEmail(e.target.value)}
                />
                <input
                    type='text'
                    className='new-doc-det'
                    value={newQuali}
                    placeholder='Qualification'
                    onChange={(e)=>setNewQuali(e.target.value)}
                />
                <Button variant='primary' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}  onClick={()=>{editSave()}}>Update</Button>
                <Button variant='danger' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{cancelUpdate()}}>Cancel</Button>
                <Button variant='success' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}className='' onClick={()=>{passChange()}}>Password Update</Button>
            </>
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-edit'>
            {passtoggle ?(   
            <>
                <div className='pass-section'>
                <input
                    type='text'
                    className='pass-ch-edit'
                    value={oldPass}
                    placeholder='Old Password'
                    onChange={(e)=>setOldpass(e.target.value)}
                />
                <Button className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subPass()}}>Check</Button>
                <Button variant='danger' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subCanpass()}}>Cancel</Button>
                </div>
            </>
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-update'>
        {passCon ?(    
            <>
            <input
                    type='text'
                    className='pass-up-edit'
                    value={newPass}
                    placeholder='New Password'
                    onChange={(e)=>setNewpass(e.target.value)}
            />
            <input
                    type='text'
                    className='pass-up-edit'
                    value={conPass}
                    placeholder='Confirm New Password'
                    onChange={(e)=>setConpass(e.target.value)}
            />
            <Button variant='primary' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subConpass()}}>Update</Button>
            <Button variant="danger" className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subConpassCancel()}}>Cancel</Button>

            </>
        ):( 
            <div>

            </div>
        )}
        </div>
    </div>
  )
}
