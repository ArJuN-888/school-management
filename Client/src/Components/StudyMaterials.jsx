import React, { useContext, useEffect, useState } from 'react'
import GetadminID from './Hooks/GetadminID'
import axios from 'axios';
import moment from "moment"
import { Button,Form ,Col,Row} from 'react-bootstrap';

import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import mycontext from '../Context/Context';
import GetTID from './Hooks/Getteacherid';
import { Link } from 'react-router-dom';
export default function StudeyMaterial() {
  const {baseURL} = useContext(mycontext)
  const [selectedfile,setSelectedfile] = useState(null)
  const [allmaterial,setallMaterial] = useState([])
  const [filterprev,setFilterprev] = useState([])
  console.log("filter",filterprev)
  const [lnktog,setlnktog] = useState(false)
  const [reqURL,] = useState('http://localhost:5000/uploads');
  console.log("jf",allmaterial)
  console.log("file",selectedfile)
  const adminID = GetadminID()
  const teacherID = GetTID()
 useEffect(()=>{
 getStudymaterials()
 },[])
  const [material,setMaterial] = useState({
    userID:adminID || teacherID,
    status:"",
    note:"",
    subject:"",
    link:""
    
  })
  console.log("www",material)
  const handleChange = (key,value) =>{
     setMaterial({...material,[key]:value})
  }
  const handleFile = (e) =>{
setSelectedfile(e.target.files[0])

  }
  const getStudymaterials = async() =>{
try{
  const response = await axios.get(`${baseURL}/Material/gatherpost`)
  console.log("restudy",response.data.studymaterial)
  const filteredData = response.data.studymaterial.filter((element) => element.userID === adminID);
  const filteredDatas = response.data.studymaterial.filter((element) => element.userID === teacherID);
  
  console.log("Filtered data:", filteredData);
if(adminID){
    setFilterprev(filteredData);
}
else if(teacherID)
{
    setFilterprev(filteredDatas)
}

  setallMaterial(response.data.studymaterial);
}
catch(error)
{
  console.log("error",error)
}
  }
  const HandleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedfile);//file key  specfies  multer field name that is also specified in the multer-config they should match
     
    // Append other form fields to the formData
    Object.keys(material).forEach((key) => {
      formData.append(key, material[key]);
    
    });
    // if (Object.values(formData).some(value => !value)) return alert("empty fields");
   
 const errors =  validate(material,selectedfile)
 console.log("formdata",formData)
    if(Object.keys(errors).length===0)
    {
      const response = await axios.post(`${baseURL}/Material/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
       
    getStudymaterials()
    setSelectedfile("")
     alert(response.data.message);
    }
     } catch (error) {
     alert(error.response.data.message)
    }
  };
  const downloadImage = async (url, filename) => {
    await axios({
      url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      saveAs(new Blob([response.data]), filename);
    });
  };
  const validate = (data,sltfile) =>{
    console.log(data)
   const err = {}
  
   
    if(!data.note)
     {
       err.note = "note is required..."
       alert(err.note)
     }
     else if(!data.status)
     {
       err.status = "status is required..."
       alert(err.status)
     }
     else if(!data.subject)
     {
       err.subject = "subject is required..."
       alert(err.subject)
     }
     else if(!sltfile){
      err.file = "Please select a file..."
      alert(err.file)
     }
   
  
  return err
}

  return (
    <div className='m-3 fs-5' style={{letterSpacing:"2px"}}>
        {teacherID || adminID ? <>
<div><h1 className='fs-3 d-flex mb-4' style={{letterSpacing:"3px"}}>Upload study materials....</h1></div>
<Form>
    <Form.Group as={Row} >
        <Form.Label column sm="1">Note:</Form.Label>
        <Col sm="11">

       
<Form.Control
value={material.note}

style={{letterSpacing:"2px"}}
className='fs-5'
placeholder='Note...'
onChange={(e)=>handleChange("note",e.target.value)}
/>
</Col>
</Form.Group>
<Form.Group as={Row} className='mt-1'>
        <Form.Label column sm="1">Status:</Form.Label>
        <Col sm="11">
<Form.Select className='fs-5'  style={{letterSpacing:"2px"}}  onChange={(e)=>handleChange("status",e.target.value)}>
    <option value=""   >Status</option>
    <option value="Important">Important</option>
    <option value="Notify">Notify</option>
    <option value="Keeptrack">Keeptrack</option>
  </Form.Select>
  </Col>
</Form.Group>
<Form.Group as={Row} className='mt-1'>
        <Form.Label column sm="1">Subject:</Form.Label>
        <Col sm="11">
  <Form.Control
   style={{letterSpacing:"2px"}}
   className='fs-5'
value={material.subject}

placeholder='Subject...'
onChange={(e)=>handleChange("subject",e.target.value)}
/>
</Col>
</Form.Group>
{lnktog===true ?
<>
<Form.Group as={Row} className='mt-1'>
        <Form.Label column sm="1">Link:</Form.Label>
        <Col sm="11">
<Form.Control
value={material.link}

style={{letterSpacing:"2px"}}
className='fs-5'
placeholder='Link...'
onChange={(e)=>handleChange("link",e.target.value)}
/>
</Col>
</Form.Group>

<Button className='me-2 mb-2' style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}}  variant='danger' onClick={()=>setlnktog(!lnktog)}>Close</Button>
</>:
<Button className='mb-2 mt-2' style={{letterSpacing:"2px",border:"none", 
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}} variant='success'  onClick={()=>setlnktog(!lnktog)}>Provide a link if Any ?</Button>
}
<Form.Control
      type='file'
      className='fs-5'
      style={{letterSpacing:"2px"}}
     onChange={handleFile}
      />
    
      < Button className='mt-2' style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}} onClick={HandleSubmit}>Post</Button>
    </Form>
    <h3 className='ms-2 mt-4 mb-4' style={{letterSpacing:"2px"}}>Previous Uploads...</h3>
    {filterprev.length=== 0 && <h3>No History found...</h3>}
{ filterprev && filterprev.map((an,index)=>(
<div key={index} className='d-flex gap-5 mt-2 p-2' style={{backgroundColor:"transparent",boxShadow:"0px 0px 1px 0px"}} >
<span className='text-success fs-5' style={{letterSpacing:"3px"}}>{moment(an.createdAt).calendar()}</span>
<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div className=''><label style={{letterSpacing:"2px"}}>{an.subject}</label></div>
<div><label className='text-warning fs-5' style={{letterSpacing:"2px"}}>{an.status} !!</label></div>
{an.link && <>Refer :  <Link style={{color:"blue"}} to={`${an.link}`}>{an.link}</Link></>}
<button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${an.filename}`, an.filename)}>
<PiDownloadSimpleLight style={{fontSize:"30px"}} />
            </button>
          
            </div>

))}

</>:<>
{allmaterial.length=== 0 && <h3>Materials unavialable...</h3>}
{allmaterial && allmaterial.map((data,index)=>(
    <div key={index}>
        <span className='text-success fs-6' style={{fontSize:"15px",letterSpacing:"3px"}}>{moment(data.createdAt).calendar()}</span>
        {data.note}
        {data.status}
       Refer :  <Link style={{color:"blue"}} to={`${data.link}`}>{data.link}</Link>
        {data.subject}
        <button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${data.filename}`, data.filename)}><PiDownloadSimpleLight style={{fontSize:"30px"}} /></button>
    </div>
))}

</>
}
    </div>
  )
}
