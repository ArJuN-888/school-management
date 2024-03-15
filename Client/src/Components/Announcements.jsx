import React, { useContext, useEffect, useState } from 'react'
import GetadminID from './Hooks/GetadminID'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import mycontext from '../Context/Context';
export default function Announcements() {
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
    <div>
<div><h1>Upload announcements</h1></div>
<input
value={announce.note}
className='inp'
placeholder='note...'
onChange={(e)=>handleChange("note",e.target.value)}
/>
<input
value={announce.status}
placeholder='status...'
className='inp'
onChange={(e)=>handleChange("status",e.target.value)}
/>
      <input
      type='file'
     onChange={handleFile}
      />
      < Button  style={{letterSpacing:"2px",backgroundColor:"green",border:"none",
    boxShadow:"0px 0px 5px 0px grey",borderRadius:"0rem"}} onClick={HandleSubmit}>Post</Button>
{ broadcast && broadcast.map((an,index)=>(
<div key={index} className='grp-dwld'>

<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div><label style={{letterSpacing:"2px"}}>{an.status}</label></div>
<button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${an.filename}`, an.filename)}>
<PiDownloadSimpleLight style={{fontSize:"30px"}} />
            </button>
          
            </div>

))}
    </div>
  )
}
