import React, { useEffect, useState,useContext } from 'react'
import mycontext from '../Context/Context'
import { Button ,Form, Col, Row} from 'react-bootstrap'
import axios from 'axios'
import Getadprofile from './Hooks/GetProfile'
import { FaPlus,FaMinus } from "react-icons/fa";
import GetadminID from './Hooks/GetadminID'
import {Flip, toast} from "react-toastify"
export default function () {
    const adminID = GetadminID()
    const {baseURL} = useContext(mycontext)
    const[highTog,setHighTog]=useState(0)
    const[toggle,setToggle]=useState(0)
    const adminprofile = Getadprofile()
    const[passToggle,setPassToggle]=useState(0)
    const[admin,setAdmin]=useState([])
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newStat,setNewStat]=useState("")
    const[oldPass,setOldpass]=useState("")
    const[newPass,setNewpass]=useState("")
    const [tog,setTog] = useState(false)
    const[conPass,setConpass]=useState("")
    const [reqURL,] = useState('http://localhost:5000/uploads');
console.log("admin",admin)
    useEffect(()=>{
        fetchAdmin()
    },[])

    const mainToggle = () =>{
        setHighTog(1)
    }

    const cancel = () =>{
        setHighTog(0)
    }

    const subConpass = async() =>{
        try
        {
            const response=await axios.put(`${baseURL}/Admin/admpassupdate/${adminID}`,{password:newPass,conPass})
           toast.success(response.data.message)
            setOldpass("")
            if(response.data.message === "Password Updated successfully")
            {
                setPassToggle(0)
                setToggle(0)
                setConpass("")
                setNewpass("")
            }
            setHighTog(0)
        }
        catch(error)
        {
            toast.error(error.response.data.message,{transition:Flip})
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
            setNewEmail(response.data.admin[0].email)
            setNewusername(response.data.admin[0].username)
            setNewStat(response.data.admin[0].status)

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
            toast.success(response.data.message,{transition:Flip})
            setHighTog(0)
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
            toast.success(response.data.message)
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
    const HandleFile = async (e) => {
        const file = e.target.files[0];
    
        if (!file) {
          return;
        }
    
    
        try {
          const formData = new FormData();
          formData.append("file", file); // Use the correct field name
          console.log("formdata",formData)
          const response = await axios.put(`${baseURL}/Admin/editpic/${adminID}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Add this header
              },
            }
          );
    
          localStorage.setItem("adminProfile", response.data.admin.filename);
          fetchAdmin();
          toast.success(response.data.message,{transition:Flip});
        } catch (error) {
          
          toast.error( error.response.data.message,{transition:Flip});
        }
      };
    
  return (

    <div className='pdiv'>
         <div className="img-contain">
              <img className="image" src={`${reqURL}/${adminprofile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>

    <div className='m-2 justify-content-center align-items-center'>

        <div className='fs-5' style={{letterSpacing:"2px"}}>
                <div >

                            <div className="teacher-data">
                                {admin.map((data, index) => (
                                <div className="admin-info" key={index}>
                                    <h3>{data.username}</h3>
                                    <p>{data.email}</p>
                                    {tog &&<>
                                    <div style={{letterSpacing:"3px"}}>Stat - {data.status}</div>
                                    </> }  
                                </div>
                                ))}
                            </div>
                            <div className='d-flex gap-3'>
                            <div className='mt-2'  ><Button style={{boxShadow:"0px 0px 5px 0px grey"}} onClick={()=>setTog(!tog)}>{tog ? <FaMinus/> : <FaPlus/>}</Button></div>
                            
                                {!highTog ?(    
                                <Button variant='primary' className='mt-1 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}  onClick={()=>{mainToggle()}}>Edit Profile</Button>
                                ):( 
                                <></>
                                )}
                            </div>
                </div>
            {highTog ?(     
            <>
                 <Form>
                 <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="3"> Username:</Form.Label>
                    <Col sm="9">
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
                    <Form.Label  column sm="3"> Email:</Form.Label>
                    <Col sm="9">
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
                    <Form.Label  column sm="3"> Status:</Form.Label>
                    <Col sm="9">
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
                <Button variant='danger' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}className='mt-2 fs-6 ms-2' onClick={()=>{cancel()}}>Cancel</Button>
            </Form>
            </>
            ):( 
                <>
                </>
            )}
        </div>
        <div>
            {toggle ?(
                <>
                    <Form className='fs-5' style={{letterSpacing:"2px"}}>
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
        <div className='m-2'>
            {passToggle?(
                <>
                    <Form className='fs-5' style={{letterSpacing:"2px"}}>
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
    </div>
  )
}
