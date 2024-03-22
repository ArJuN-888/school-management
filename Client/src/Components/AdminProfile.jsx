import React, { useEffect, useState,useContext } from 'react'
import mycontext from '../Context/Context'
import { Button ,Form, Col, Row} from 'react-bootstrap'
import axios from 'axios'

export default function () {
    const {baseURL} = useContext(mycontext)
    const[toggle,setToggle]=useState(0)
    const[passToggle,setPassToggle]=useState(0)
    const[admin,setAdmin]=useState({})
    const[adminID,setAdminID]=useState("")
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newStat,setNewStat]=useState("")
    const[oldPass,setOldpass]=useState("")
    const[newPass,setNewpass]=useState("")
    const[conPass,setConpass]=useState("")

    useEffect(()=>{
        fetchAdmin()
    },[])

    const subConpass = async() =>{
        try
        {
            const response=await axios.put(`${baseURL}/Admin/admpassupdate/${adminID}`,{password:newPass,conPass})
            alert(response.data.message)
            setOldpass("")
            if(response.data.message === "Password Updated successfully")
            {
                setPassToggle(0)
                setToggle(0)
                setConpass("")
                setNewpass("")
            }
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }


    const subConpassCancel = () =>{
        setPassToggle(0)
        setToggle(0)
        setOldpass("")
    }

    const fetchAdmin = async() =>{
        try
        {
            const response = await axios.get(`${baseURL}/Admin/getadmin`)
            setAdmin(response.data.admin)
            setNewEmail(response.data.admin.email)
            setNewusername(response.data.admin.username)
            setNewStat(response.data.admin.status)
            setAdminID(response.data.admin._id)
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const editSave =async()=>{
        try
        {
            const response = await axios.put(`${baseURL}/Admin/edit/${adminID}`,{username:newUsername,email:newEmail,status:newStat})
            alert(response.data.message)
            fetchAdmin()
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const passChange = async() =>{
        setToggle(1)
    }

    const subPass = async() =>{
        try
        {
            const response=await axios.post(`${baseURL}/Admin/admpassmatch/${adminID}`,{password:oldPass})
            alert(response.data.message)
            if(response.data.message ==="You can now update your Password")
            {
                setPassToggle(1)
                setToggle(0)
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const subCanpass = () =>{
        setToggle(0)
    }
   
  return (
    <div>
        <div>
           
            <>
                 <Form>
                 <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Username:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={newUsername}
                    onChange={(e)=>setNewusername(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Email:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={newEmail}
                    onChange={(e)=>setNewEmail(e.target.value)}
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
                    value={newStat}
                    onChange={(e)=>setNewStat(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Button variant='primary' className='mt-2 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}  onClick={()=>{editSave()}}>Update</Button>
                <Button variant='success' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}className='mt-2 fs-6' onClick={()=>{passChange()}}>Password Update</Button>
            </Form>
            </>
        </div>
        <div>
            {toggle ?(
                <>
                    <Form>
                 <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Previous Password:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={oldPass}
                    placeholder='Previous Password...'
                    onChange={(e)=>setOldpass(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Button className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subPass()}}>Check</Button>
                <Button variant='danger' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subCanpass()}}>Cancel</Button>
        
            </Form>
                </>
            ):(
                <>

                </>
            )}
        </div>
        <div>
            {passToggle?(
                <>
                    <Form>
           <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> New Password:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={newPass}
                    placeholder='New password...'
                    onChange={(e)=>setNewpass(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Confirm Password:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={conPass}
                    placeholder='Confirm Password...'
                    onChange={(e)=>setConpass(e.target.value)}
                />
                 </Col>
                </Form.Group>
            <Button variant='primary' className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subConpass()}}>Update</Button>
            <Button variant="danger" className='me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{subConpassCancel()}}>Cancel</Button>

            </Form>

                </>
               ):( 
                <>

                </>
                 )}
        </div>
        
    </div>
  )
}