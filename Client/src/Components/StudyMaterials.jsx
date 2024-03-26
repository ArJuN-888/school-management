import React, { useContext, useEffect, useState } from 'react'
import GetadminID from './Hooks/GetadminID'
import axios from 'axios';
import moment from "moment"
import { Button,Form ,Col,Row, Table} from 'react-bootstrap';

import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import mycontext from '../Context/Context';
import GetTID from './Hooks/Getteacherid';
import { Link } from 'react-router-dom';
import GetSID from './Hooks/GetstaffID';
import GetParentID from './Hooks/GetParentID';
import {Flip, toast} from "react-toastify"
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
  const staffID = GetSID()
  const parentId = GetParentID()
 useEffect(()=>{
 getStudymaterials()
 },[])
  const [material,setMaterial] = useState({
    userID:adminID || teacherID || staffID,
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
  const filteredSDatas = response.data.studymaterial.filter((element) => element.userID === staffID);
  console.log("Filtered data:", filteredData);
if(adminID){
    setFilterprev(filteredData);
}
else if(teacherID)
{
    setFilterprev(filteredDatas)
}
else if(staffID)
{
  setFilterprev(filteredSDatas)
}
  setallMaterial(response.data.studymaterial);
}
catch(error)
{
 toast.error(error.response.data.message,{transition:Flip})
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
     toast.success(response.data.message,{transition:Flip});
    }
     } catch (error) {
     toast.error(error.response.data.message,{transition:Flip})
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
       toast.error(err.note,{transition:Flip})
     }
     else if(!data.status)
     {
       err.status = "status is required..."
       toast.error(err.status ,{transition:Flip})
     }
     else if(!data.subject)
     {
       err.subject = "subject is required..."
       toast.error(err.subject,{transition:Flip})
     }
     else if(!sltfile){
      err.file = "Please select a file..."
      toast.error(err.file,{transition:Flip})
     }
   
  
  return err
}

  return (
    <div className='m-3 fs-5 text-center' style={{letterSpacing:"2px"}}>
        {teacherID || adminID ||staffID ? <>
<div className='text-center'><h1 className='fs-3 d-flex mb-4 text-center' style={{letterSpacing:"3px"}}>Upload study materials....</h1></div>
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
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"5px", margin:"3px"}}  variant='danger' onClick={()=>setlnktog(!lnktog)}>Close</Button>
</>:
<Button className='mb-2 mt-2' style={{letterSpacing:"2px",border:"none", 
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"5px"}} variant='success'  onClick={()=>setlnktog(!lnktog)}>Provide a link if Any ?</Button>
}
<Form.Control
      type='file'
      className='fs-5'
      style={{letterSpacing:"2px"}}
     onChange={handleFile}
      />
    
      < Button className='mt-2' style={{letterSpacing:"2px",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"5px"}} onClick={HandleSubmit}>Post</Button>
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
{parentId && allmaterial.length=== 0 && <h3>Materials unavialable...</h3>}
<div className='m-5 pt-3'>
  <h3 className='text-center' style={{color:'brown',textDecoration:'underline', letterSpacing:'3px', fontFamily:'monospace'}}>STUDY MATERIALS FOR YOU</h3>
        <Table striped bordered variant='light' >
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th>Status</th>
              <th>Link</th>
              <th>Subject</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
          {allmaterial && allmaterial.map((data,index)=>(
            <tr key={index}>
              <td>{moment(data.createdAt).calendar()}</td>
              <td >{data.note}</td>
              <td style={{color:data.status === 'Important' ? 'red' : 'yellow'}}>{data.status}</td>
              {data.link ?(
                <>
                <td><Link style={{textDecoration:'none'}}>{data.link}</Link></td>
                </>
              ):(
              <>
              <td>No Link Provided</td>
              </>
              )}
              <td>{data.subject}</td>
              <td>
              <button className='req-dwld-btn border-0 bg-transparent' style={{color:'blue'}} onClick={() => downloadImage(`${reqURL}/${data.filename}`, data.filename)}><PiDownloadSimpleLight style={{fontSize:"30px"}} /></button>
              </td>
            </tr>
          
))}
</tbody>

</Table>
</div>

</>
}
    </div>
  )
}
