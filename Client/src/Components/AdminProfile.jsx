import React, { useEffect, useState,useContext } from 'react'
import mycontext from '../Context/Context'
import { Button,Table ,Form, Col, Row} from 'react-bootstrap'
import axios from 'axios'

export default function () {
    const {baseURL} = useContext(mycontext)
    const[toggle,setToggle]=useState(0)
    const[admin,setAdmin]=useState({})
    const[adminID,setAdminID]=useState("")
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newStat,setNewStat]=useState("")

    useEffect(()=>{
        fetchAdmin()
    },[])

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

    const toggleButton = async() => {
        try
        {
            setToggle(1)
            fetchAdmin()
        }
        catch(err)
        {
            alert(err)
           
        }
    }

    const cancelUpdate = () =>{
        setToggle(0)
    }

    const editSave =async()=>{
        try
        {
            const response = await axios.put(`${baseURL}/Admin/edit/${adminID}`,{username:newUsername,email:newEmail,status:newStat})
            alert(response.data.message)
            setToggle(0)
            fetchAdmin()
        }
        catch(err)
        {
            console.log(err);
        }
    }
   
  return (
    <div>
        <div className='main-section'>
        {!toggle ?(     
            <button className='toggle-button' onClick={()=>{toggleButton()}}>EDIT PROFILE</button>
        )
        :(  
        <>
        </> 
        )
        }  
        </div>
        <div>
            {toggle ?( 
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
                <Button variant='danger' className='mt-2 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{cancelUpdate()}}>Cancel</Button>
                <Button variant='success' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}className='mt-2 fs-6' onClick={()=>{passChange()}}>Password Update</Button>
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
