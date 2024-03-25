import React, { useContext,useEffect, useState } from 'react'
import mycontext from '../Context/Context'
import axios from 'axios'
import '../Components/Styles/DoctorManage.css'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Button,Table ,Form, Col, Row} from 'react-bootstrap'
export default function DoctorManage() {
    const {baseURL} = useContext(mycontext)
    const[doctors,setDoctors]=useState([])
    const[docID,setDocID]=useState("")
    const[passCon,setPassCon]=useState(0)
    const[editToggle,setEditToggle]=useState(0)
    const[passtoggle,setPasstoggle]=useState(0)
    const[oldPass,setOldpass]=useState("")
const [doctorObj,setdoctorObj] = useState({
    username:"",
    email:"",
    password:"",
    qualification:"",
    status:"",
    phone:""
})
const [status,setStatus] = useState("")
const [phoneno,setPhoneno] = useState("")
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newQuali,setNewQuali]=useState("")
    const[conPass,setConpass]=useState("")
    const[newPass,setNewpass]=useState("")
    //file
    const [selectedfile, setSelectedFile] = useState(null);
    const [filename, setFilename] = useState("");
console.log("hsgh",doctors)
    useEffect(()=>{

        fetchDoctors()

    },[])
const handleChange = ( key,value)=>{
    setdoctorObj({...doctorObj,[key]:value})
}
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
            setEditToggle(1)
            setDocID(id)
            setNewusername(response.data.doctor.username)
            setNewEmail(response.data.doctor.email)
            setNewQuali(response.data.doctor.qualification)
            setPhoneno(response.data.doctor.phone)
            setStatus(response.data.doctor.status)
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
            const formData = new FormData();
            formData.append("file", selectedfile);
      
            // Append other form fields to the formData
            Object.keys(doctorObj).forEach((key) => {
              formData.append(String(key), doctorObj[key]);
            });
      
            const response = await axios.post(`${baseURL}/Doctor/register`,formData)
            alert(response.data.message)
            fetchDoctors()
       setdoctorObj({
        username:"",
        email:"",
        password:"",
        qualification:"",
        status:"",
        phone:""
    })
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
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const editSave = async() =>{
        try
        {
            const response = await axios.put(`${baseURL}/Doctor/edit/${docID}`,{username:newUsername,
                email:newEmail,qualification:newQuali,phone:phoneno})
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
    const HandleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
          setFilename(file.name);
        }
      };

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
                    value={doctorObj.username}
                    placeholder='Username...'
                    onChange={(e)=>handleChange("username",e.target.value)}
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
                    value={doctorObj.email}
                    placeholder='Email...'
                    onChange={(e)=>handleChange("email",e.target.value)}
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
                    value={doctorObj.password}
                    placeholder='Password...'
                    onChange={(e)=>handleChange("password",e.target.value)}
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
                    value={doctorObj.qualification}
                    placeholder='Qualification...'
                    onChange={(e)=>handleChange("qualification",e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Phone no:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={doctorObj.phone}
                    placeholder='Phone number...'
                    onChange={(e)=>handleChange("phone",e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
  
  <Form.Label column sm="2" >Status:</Form.Label>

<Col sm="10">
<Form.Select    style={{letterSpacing:"2px"}}
           className='fs-5 me-2'  onChange={(e)=>handleChange("status",e.target.value)}>
    <option value="" >Status</option>
    <option value="Doctor">Doctor</option>

  </Form.Select>
  </Col>
  </Form.Group >
  <div className='hover-grp'>
          <div>
            <label htmlFor="fileUpload" className='hover'>
              <FaCloudUploadAlt /> Upload File
              <input
                id="fileUpload"
                type='file'
                onChange={HandleFile}
                className='ipt'
              />
            </label>
          </div>
          <p className='nm'>{filename ? filename : "No file chosen..."}</p>
        </div>
                <div className='sub-button'>
                    <Button variant='primary' className='mb-4'  style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{submitButton()}}>Submit</Button>
                </div>
            </Form>
        </div>
        <div className=''>
            <div>
           {doctors.length !==0 &&  <h3 className='doc-reg-head mb-4' style={{letterSpacing:"2px"}}>Registered Doctors...</h3> }
                <Table hover responsive striped  className='doc-map-ta fs-5' style={{letterSpacing:"2px"}}>
                {doctors.length !==0 &&   <thead>
                    <tr>
                        <th className='doc-map-head text-white bg-primary'>sl.No</th>
                        <th className='doc-map-head text-white bg-primary'>Username</th>
                        <th className='doc-map-head text-white bg-primary'>Email</th>
                        <th className='doc-map-head text-white bg-primary'>Qualification</th>
                        <th className='doc-map-head text-white bg-primary'>Action</th>
                    </tr>
                    </thead>}
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
            <Form>
                 <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Username:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={newUsername}
                    placeholder='Username...'
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
                    placeholder='Email...'
                    onChange={(e)=>setNewEmail(e.target.value)}
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
                    value={newQuali}
                    placeholder='Qualification...'
                    onChange={(e)=>setNewQuali(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Status:</Form.Label>
                    <Col sm="10">
                <Form.Select
                disabled
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={status}
                    placeholder='Status...'
                    onChange={(e)=>setStatus(e.target.value)}
                >
                    <option value="">Status</option>
                    <option value="Doctor">Doctor</option>
                </Form.Select>
                 </Col>
                </Form.Group>
                <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Phone no:</Form.Label>
                    <Col sm="10">
                <Form.Control
                    style={{letterSpacing:"2px"}}
                    className='fs-5 '
                    type='text'
                    value={phoneno}
                    placeholder='Phone no...'
                    onChange={(e)=>setPhoneno(e.target.value)}
                />
                 </Col>
                </Form.Group>
                <Button variant='primary' className='mt-2 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}  onClick={()=>{editSave()}}>Update</Button>
                <Button variant='danger' className='mt-2 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{cancelUpdate()}}>Cancel</Button>
                <Button variant='success' style={{letterSpacing:"2px",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem"}}className='mt-2 fs-6' onClick={()=>{passChange()}}>Password Update</Button>
            </Form>
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-edit'>
            {passtoggle ?(   
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
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-update'>
        {passCon ?(    
            <Form>
           <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Previous Password:</Form.Label>
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
        ):( 
            <div>

            </div>
        )}
        </div>
    </div>
  )
}
