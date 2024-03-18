import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import GetadminID from './Hooks/GetadminID';
import Getadminname from './Hooks/Getadminname';
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
import GetTname from './Hooks/Getteachername';
import GetTID from './Hooks/Getteacherid';
import GetdoctorID from './Hooks/GetdoctorID';
import Getdoctorname from './Hooks/Getdoctorname';
import GetParentID from './Hooks/GetParentID';
import GetPname from './Hooks/GetParentName';
import GetEID from './Hooks/GetEID';
import GetEName from './Hooks/GetEName'
export default function Navbar() {
  const {setCurrentChat,setMessages,setChat,userID,setUserID,setPotentialChats} = useContext(mycontext)
    const teacherID = GetTID()
    const teacherName = GetTname()
    const adminID = GetadminID()
    const adminName = Getadminname()
    const  doctorID = GetdoctorID()
    const doctorName = Getdoctorname()
  const parentID = GetParentID()
  const parentName = GetPname()
  const eoName = GetEName()
  const eoID = GetEID()
    const nav = useNavigate()
    const Logststate = () =>{
     if(teacherID)
     {
        localStorage.removeItem("teacherID")
        localStorage.removeItem("teacherName")
        setPotentialChats([])
        setCurrentChat(null)
        setMessages(null)
        setUserID(null)
        setChat([])

        nav("/Tlogin")
        // location.reload()
     }
    }
    const Logdocstate = () =>{
      if(doctorID)
      {
         localStorage.removeItem("doctorID")
         localStorage.removeItem("doctorName")
         setPotentialChats([])
         setCurrentChat(null)
         setMessages(null)
         setUserID(null)
         setChat([])
 
         nav("/Dlogin")
         // location.reload()
      }
     }
     const Logadminout = () =>{
      if(adminID)
      {
        setPotentialChats([])
         setCurrentChat(null)
         setMessages(null)
         setUserID(null)
         setChat([])
       
         localStorage.removeItem("adminName")
         localStorage.removeItem("adminID")
         nav("/AdminLogin")
        //  location.reload()
      }

    
    }
    const Logparentstate = () =>{
      if(parentID)
      {
        setPotentialChats([])
         setCurrentChat(null)
         setMessages(null)
         setUserID(null)
         setChat([])
       
         localStorage.removeItem("parentName")
         localStorage.removeItem("parentID")
         nav("/Plogin")
        //  location.reload()
      }

    
    }
    const Logeostate = () =>{
      if(eoID)
      {
        setPotentialChats([])
         setCurrentChat(null)
         setMessages(null)
         setUserID(null)
         setChat([])
       
         localStorage.removeItem("eoName")
         localStorage.removeItem("eoID")
         nav("/Plogin")
        //  location.reload()
      }

    
    }
  return (
    <>
    <nav style={{
        display:"flex",
        justifyContent:"center",
       fontFamily:"monospace",
    }}>
       <label style={{
    
        fontSize:"18px"
       }}>Personal-Chat</label>
      <ul style={{
        display:"flex",
        justifyContent:"center",
        gap:"20px",
        listStyleType:"none",
        fontSize:"18px"
    }}>
  {adminID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{adminName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/AdminHome">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Tregister">Teacher-register</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Classroom">classroom</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/createAnnouncements">Create Announcements</Link></li>
       
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logadminout()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {teacherID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{teacherName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Teacherhome">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Pregister">Add Students</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts">Announcements</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Studentattendence">Mark-Attendence</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewattendence">Attendence-Record</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/marklist">Add-Students-mark</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewmarklist">View-mark-list</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewletter">View-letter</Link></li>
        
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logststate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {doctorID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{doctorName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts">Announcements</Link></li>
      
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logdocstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {parentID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{parentName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts">Announcements</Link></li>

        <li><Link style={{textDecoration:"none"}} to="/leaveletter">Leaveletter</Link></li>

        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logparentstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {eoID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{eoName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home">Home</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat">Chat</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts">Announcements</Link></li>

        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logeostate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {(!adminID && !teacherID && !doctorID && !parentID && !eoID) && <>
        <li><Link style={{textDecoration:"none"}} to="/Tlogin">Teacher-Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Adminlogin">Admin-Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Dlogin">Doctor-Login</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Plogin">Parent-Login</Link></li>
        </> }
        
     
        </ul>
        </nav>
    </>
  )
}
