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
  console.log("res",response.data.studymaterial)
  setallMaterial(response.data.studymaterial)
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
    <div className='m-3 fs-5'>
        {teacherID || adminID ? <>
<div><h1 className='fs-2' style={{letterSpacing:"2px"}}>Upload study materials....</h1></div>
<Form>
    <Form.Group as={Row}>
        <Form.Label column sm="2">Note:</Form.Label>
        <Col sm="10">

       
<Form.Control
value={material.note}
className='inp'
placeholder='note...'
onChange={(e)=>handleChange("note",e.target.value)}
/>
</Col>
</Form.Group>
<select className='me-2' onChange={(e)=>handleChange("status",e.target.value)}>
    <option value="Status"  >Status</option>
    <option value="Important">Important</option>
    <option value="Notify">Notify</option>
    <option value="Keeptrack">Keeptrack</option>
  </select>
  <input
value={material.subject}
className='inp'
placeholder='subject...'
onChange={(e)=>handleChange("subject",e.target.value)}
/>
{lnktog===true ?
<>
<input
value={material.link}
className='inp'
placeholder='Link...'
onChange={(e)=>handleChange("link",e.target.value)}
/>

<Button style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}}  variant='danger' onClick={()=>setlnktog(!lnktog)}>Close</Button>
</>:
<Button style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}}  onClick={()=>setlnktog(!lnktog)}>Provide a link if Any ?</Button>
}

      <input
      type='file'
     onChange={handleFile}
      />
      < Button  style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}} onClick={HandleSubmit}>Post</Button>
    </Form>
    <h3 className='ms-2 mt-4 mb-4' style={{letterSpacing:"2px"}}>Previous Uploads...</h3>
    {allmaterial.length=== 0 && <h3>No History found...</h3>}
{ allmaterial && allmaterial.map((an,index)=>(
<div key={index} className='grp-dwld' style={{backgroundColor:"transparent"}} >
<span className='text-success fs-6' style={{fontSize:"15px",letterSpacing:"3px"}}>{moment(an.createdAt).calendar()}</span>
<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div className=''><label style={{letterSpacing:"2px"}}>{an.subject}</label></div>
<div><label className='text-warning fs-5' style={{letterSpacing:"2px"}}>{an.status}</label></div>
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
