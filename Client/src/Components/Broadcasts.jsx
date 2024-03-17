import React ,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import moment from "moment"
import { Button } from 'react-bootstrap';
import { PiDownloadSimpleLight } from "react-icons/pi";
import { saveAs } from 'file-saver';
import GetParentID from './Hooks/GetParentID';
import mycontext from '../Context/Context';
import GetTID from './Hooks/Getteacherid';
import GetTname from './Hooks/Getteachername';
export default function Broadcasts() {
  const [reqURL,] = useState('http://localhost:5000/uploads');
   const teachername = GetTname()
    const teacherID = GetTID()
    const parentID = GetParentID()
    useEffect(()=>{
      getAnnouncements()
      if(parentID)
      {
        getbroadcast()
      }
      
      },[])
      const [notmessage,setNotmessage] = useState("")
  const {baseURL} = useContext(mycontext)
  const [broadcast,setbroadcast] = useState([])
  const [broadcastmess,setbroadcastmess] = useState([])
  const [status,setStatus] = useState("")
  const [batch,setBatch] = useState("")
  const [text,setText] = useState("")
  console.log("broadcastmess",broadcastmess)
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
    try{

      const response = await axios.get(`${baseURL}/Broadcast/allbroadcastmess`,{
        params:{
          parentid:parentID
        }
      
      })
      setbroadcastmess(response.data.bmess)
      setNotmessage(response.data.message)
      console.log("mss",response.data.message)
    }
catch(error)
{
  console.log("error",error.response.data.message)
}
  }
  const postbroadcastmessage = async() =>{
try{
const response = await axios.post(`${baseURL}/Broadcast/addbroadcast`,{text,status,teachername,batch},{
  params:{
    teacherid:teacherID
  }
})
alert(response.data.message)
}
catch(error)
{
  alert(error.response.data.message)
}
  }
  return (
    <div className='brdiv'>
      <h3 style={{letterSpacing:"2px"}} className='ms-1 mb-3'>Announcements</h3>
      {broadcast.length === 0  && <div>No latest announcements...</div>}
      { broadcast && broadcast.map((an,index)=>(
<div key={index} className='grp-dwld mt-2 flex-wrap' style={{backgroundColor:"transparent"}}>
<span className='fs-6 text-success' style={{fontSize:"15px",letterSpacing:"2px"}}>{moment(an.createdAt).calendar()}</span>
<div className=''><label style={{letterSpacing:"2px"}}>{an.note}</label></div>
<div><label className='text-warning' style={{letterSpacing:"2px"}}>{an.status}</label></div>
<button className='req-dwld-btn border-0 bg-transparent' onClick={() => downloadImage(`${reqURL}/${an.filename}`, an.filename)}>
<PiDownloadSimpleLight style={{fontSize:"30px"}} />
            </button>
          
            </div>

))}

{teacherID && <div className='d-block  mt-4 m-1 '>
<h3 style={{letterSpacing:"2px"}} className='mt-5 ms-1'>Broadcast a message</h3>
  <input
  value={text}
  className='me-2'
  style={{
   letterSpacing:"2px",
   width:"50%"
  }}
  placeholder='Enter your message here...'
  onChange={(e)=> setText(e.target.value)}
  />
   <select className='me-2' onChange={(e)=>setStatus(e.target.value)}>
    <option value="Status" >Status</option>
    <option value="Important">Important</option>
    <option value="Notify">Notify</option>
    <option value="Keeptrack">Keeptrack</option>
  </select>
  <select className='me-2' onChange={(e)=>setBatch(e.target.value)}>
    <option value="select" >Select your Batch</option>
    <option value="10A">10A</option>
    <option value="10B">10B</option>
    <option value="10C">10C</option>
  </select>
  <Button onClick={postbroadcastmessage} style={{borderRadius:"0.2rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"2px"}}>Post</Button>
  </div>}
  <div>
    {parentID && <div>
      <h3 style={{letterSpacing:"2px"}} className='mt-5 ms-1'>Class Routines</h3>
      {broadcastmess && broadcastmess.map((data,index)=>(
        <div key={index} className='routines-parent'>
          <span className='text-success fs-6 me-5'  style={{fontSize:"15px",letterSpacing:"2px"}}>{moment(data.createdAt).calendar()}</span>
         <div style={{letterSpacing:"1px"}}> {data.text}</div>
         <div><sub className='fs-4 text-danger me-5'>-{data.teachername}</sub> </div>
          <div className='text-warning'>{data.status}</div>
          </div>
      ))}
      </div>}
      {notmessage && notmessage}
  </div>
    </div>
  )
}
