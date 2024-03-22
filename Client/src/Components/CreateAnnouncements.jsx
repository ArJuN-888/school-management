import React, { useContext, useEffect, useState } from 'react'
import GetadminID from './Hooks/GetadminID'
import axios from 'axios';
import moment from "moment"
import { Button,Col,Form, Row } from 'react-bootstrap';
import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import mycontext from '../Context/Context';
export default function CreateAnnouncements() {
  const {baseURL} = useContext(mycontext)
  const [selectedfile,setSelectedfile] = useState(null)
  const [broadcast,setbroadcast] = useState([])
  const [reqURL,] = useState('http://localhost:5000/uploads');
  console.log("jf",broadcast)
  console.log("file",selectedfile)
  const adminID = GetadminID()
 useEffect(()=>{
 getAnnouncements()
 },[])
  const [announce,setannounce] = useState({
    adminID,
    status:"",
    note:"",
    
  })
  console.log("www",announce)
  const handleChange = (key,value) =>{
     setannounce({...announce,[key]:value})
  }
  const handleFile = (e) =>{
setSelectedfile(e.target.files[0])

  }
  const getAnnouncements = async() =>{
try{
  const response = await axios.get(`${baseURL}/Announcement/gatherpost`)
  console.log("res",response.data.announcement)
  setbroadcast(response.data.announcement)
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
    Object.keys(announce).forEach((key) => {
      formData.append(key, announce[key]);
    
    });
    // if (Object.values(formData).some(value => !value)) return alert("empty fields");
   
 const errors =  validate(announce,selectedfile)
 console.log("formdata",formData)
    if(Object.keys(errors).length===0)
    {
      const response = await axios.post(`${baseURL}/Announcement/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
       
    getAnnouncements()
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
    
     else if(!sltfile){
      err.file = "Please select a file..."
      alert(err.file)
     }
   
  
  return err
}
  return (
    <div className='m-2'>
<div><h1 className='fs-2' style={{letterSpacing:"2px"}}>Upload announcements...</h1></div>
<Form.Group as={Row}>
  <Form.Label column sm="1" >Note:</Form.Label>

<Col sm="11">
<Form.Control
value={announce.note}
className='inp'
placeholder='Description...'
onChange={(e)=>handleChange("note",e.target.value)}
/>
</Col>
</Form.Group>
<Form.Group as={Row}>
  <Form.Label column sm="1" >Status:</Form.Label>

<Col sm="11">
<Form.Select className='me-2' onChange={(e)=>handleChange("status",e.target.value)}>
    <option value="Status" >Status</option>
    <option value="Important">Important</option>
    <option value="Notify">Notify</option>
    <option value="Keeptrack">Keeptrack</option>
  </Form.Select>
  </Col>
  </Form.Group>
      <Form.Control
      type='file'
     onChange={handleFile}
      />
      < Button  style={{letterSpacing:"2px",backgroundColor:"green",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}} onClick={HandleSubmit}>Post</Button>
    <h3 className='ms-2 mt-4 mb-4' style={{letterSpacing:"2px"}}>Previous Uploads...</h3>
{ broadcast && broadcast.map((an,index)=>(
<div key={index} className='grp-dwld' style={{backgroundColor:"transparent"}} >
<span className='text-success fs-6' style={{fontSize:"15px",letterSpacing:"3px"}}>{moment(an.createdAt).calendar()}</span>
<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div><label className='text-warning fs-5' style={{letterSpacing:"2px"}}>{an.status}</label></div>
<button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${an.filename}`, an.filename)}>
<PiDownloadSimpleLight style={{fontSize:"30px"}} />
            </button>
          
            </div>

))}
    </div>
  )
}
