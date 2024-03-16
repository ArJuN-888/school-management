import React ,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import moment from "moment"
import { Button } from 'react-bootstrap';
import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import GetParentID from './Hooks/GetParentID';
import mycontext from '../Context/Context';
import GetTID from './Hooks/Getteacherid';
export default function Broadcasts() {
  const [reqURL,] = useState('http://localhost:5000/uploads');
 
    const teacherID = GetTID()
    const parentID = GetParentID()
    useEffect(()=>{
      getAnnouncements()
      if(parentID)
      {
        getbroadcast()
      }
      
      },[])
  const {baseURL} = useContext(mycontext)
  const [broadcast,setbroadcast] = useState([])
  const [broadcastmess,setbroadcastmess] = useState([])
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
  const downloadImage = async (url, filename) => {
    await axios({
      url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      saveAs(new Blob([response.data]), filename);
    });
  };
  const getbroadcast = async() =>{
const response = await axios.get(`${baseURL}/allbroadcastmess`,{
  params:{
    parentid:parentID
  }

})
setbroadcastmess(response.data.bmess)
  }
  const postbroadcastmessage = async() =>{

  }
  return (
    <div className='brdiv'>
      <h3 style={{letterSpacing:"2px"}} className='ms-1'>Announcements</h3>
      {broadcast.length === 0  && <div>No latest announcements...</div>}
      { broadcast && broadcast.map((an,index)=>(
<div key={index} className='grp-dwld mt-4' style={{backgroundColor:"transparent"}}>
<span style={{fontSize:"15px",letterSpacing:"2px"}}>{moment(an.createdAt).calendar()}</span>
<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div><label style={{letterSpacing:"2px"}}>{an.status}</label></div>
<button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${an.filename}`, an.filename)}>
<PiDownloadSimpleLight style={{fontSize:"30px"}} />
            </button>
          
            </div>

))}

{teacherID && <div className='d-block  mt-4 m-1 '>
<h3 style={{letterSpacing:"2px"}} className='mt-5 ms-1'>Broadcast a message</h3>
  <input
  className='me-2'
  style={{
   letterSpacing:"2px",
   width:"50%"
  }}
  placeholder='Enter your message here...'
  />
  <select className='me-2'>
    <option value="select" >Select your Batch</option>
    <option value="10A">10A</option>
    <option value="10B">10B</option>
    <option value="10C">10C</option>
  </select>
  <Button onClick={postbroadcastmessage} style={{borderRadius:"0.2rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"2px"}}>Post</Button>
  </div>}
  <div>
    {parentID && <div>
      <h3>broadcast by teacher</h3>
      </div>}
  </div>
    </div>
  )
}
