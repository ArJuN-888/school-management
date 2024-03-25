import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import GetadminID from './Hooks/GetadminID';
import Getadminname from './Hooks/Getadminname';
import { useNavigate } from 'react-router-dom'
import mycontext from '../Context/Context'
import { PiChatsLight } from "react-icons/pi";
import GetTname from './Hooks/Getteachername';
import GetTID from './Hooks/Getteacherid';
import { ImBook } from "react-icons/im";
import { MdSchool } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import {CgProfile} from "react-icons/cg"
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaUserTie } from "react-icons/fa6";
import { BiHomeAlt2 } from "react-icons/bi";
import GetdoctorID from './Hooks/GetdoctorID';
import Getdoctorname from './Hooks/Getdoctorname';
import GetParentID from './Hooks/GetParentID';
import GetPname from './Hooks/GetParentName';
import { RiFileList2Fill } from "react-icons/ri";
import GetEID from './Hooks/GetEID';
import GetEName from './Hooks/GetEName'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import GetSID from './Hooks/GetstaffID';
import { SiGoogleclassroom } from "react-icons/si";
import GetSname from './Hooks/GetstaffName';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Tooltip from 'react-bootstrap/Tooltip';
export default function Navbar() {
  const {setCurrentChat,setMessages,setChat,userID,setUserID,setPotentialChats,setNotifications} = useContext(mycontext)
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
  const staffID = GetSID()
  const staffName = GetSname()
    const nav = useNavigate()
    const Logststate = () =>{
     if(teacherID)
     {
        localStorage.removeItem("teacherID")
        localStorage.removeItem("teacherName")
        localStorage.removeItem("teacherClass")
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
         localStorage.removeItem("parentClass")
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
    const Logstaffstate = () =>{
      if(staffID)
      {
        setPotentialChats([])
         setCurrentChat(null)
         setMessages(null)
         setUserID(null)
         setChat([])
       
         localStorage.removeItem("staffName")
         localStorage.removeItem("staffID")
         nav("/Tlogin")
        //  location.reload()
      }

    
    }
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
         Home
      </Tooltip>
  );
  const Chat = (props) => (
    <Tooltip id="button-tooltip" {...props}>
       Chat
    </Tooltip>
);
const Registers = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Add Faculties 
  </Tooltip>
);
const Classroom = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Classroom
  </Tooltip>
);
const Doctor = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Manage-Doctor
  </Tooltip>
);
const Extern = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Manage-E-Organization
  </Tooltip>
);
const CAnn = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Announcements
  </Tooltip>
);
const Sm = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Study materials
  </Tooltip>
);
  return (
    <>
    <nav className=' nv position-fixed fixed-top' style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      width:"100%",
      zIndex:"3",

    }}>
      
      <ul style={{
        display:"flex",
        justifyContent:"center",
        gap:"20px",
        alignItems:"center",
        listStyleType:"none",
        fontSize:"18px",
        width:"100%",
       
    }}>
  {adminID &&<>
  <div className='d-flex gap-4 mt-3 justify-content-center'  >
        <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-white'>:-</label> <div className='text-white'>{adminName}</div></li>
            <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 50, hide: 100 }}
                    overlay={renderTooltip}
                  >
         <li><Link style={{ textDecoration: "none" }} to="/Home">
              
                    <BiHomeAlt2 style={{ color: "black", fontSize: "25px" }} />
              
                </Link></li></OverlayTrigger>

   <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Registers}><Link style={{textDecoration:"none"}} to="/Tregister"><FaUserPlus style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Classroom}><Link style={{textDecoration:"none"}} to="/Classroom"><SiGoogleclassroom style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Doctor}><Link style={{textDecoration:"none"}} to="/doctormanage"><FaUserDoctor style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Extern}><Link style={{textDecoration:"none"}} to="/Exmanage"><FaUserTie style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={CAnn}><Link style={{textDecoration:"none"}} to="/createAnnouncements"><TfiAnnouncement style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>


        <li><Link style={{textDecoration:"none"}} to="/Admprofile"><CgProfile  style={{color:"black",fontSize:"25px"}}  /></Link></li>

        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logadminout()}}><IoLogOutOutline style={{fontSize:"28px"}}/></button></li> 
        </div></>}
        {teacherID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{teacherName}</label></li>

<OverlayTrigger
                    placement="bottom"
                    delay={{ show: 50, hide: 100 }}
                    overlay={renderTooltip}
                  >
         <li><Link style={{ textDecoration: "none" }} to="/Home">
              
                    <BiHomeAlt2 style={{ color: "black", fontSize: "25px" }} />
              
                </Link></li></OverlayTrigger>
         <li><Link style={{textDecoration:"none"}} to="/TeacherClassroom">Your Classroom</Link></li>
         <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><Link style={{textDecoration:"none"}} to="/Pregister"><FaUserPlus style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Studentattendence"><RiFileList2Fill style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewattendence">Attendence-Record</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/marklist">Add-Students-mark</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewmarklist">View-mark-list</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewletter">View-letter</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/timetable">Time Table</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Tpro">Profile</Link></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><Link style={{textDecoration:"none"}} to="/Health"> Mark Health Record</Link></li>
        
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logststate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {doctorID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{doctorName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}}/></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}}  to="/Dpro">Profile</Link></li>
        <li><Link style={{textDecoration:"none"}} to="Healthview">Health Record</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></li>
      
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logdocstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {staffID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{staffName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}}/></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logstaffstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {parentID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{parentName}</label></li>

         <li><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/viewtime">Timetable</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/leaveletter">Leaveletter</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/ParentmarklistView">Marklist</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/parentattendeceView">Attendence</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Ppro">Profile</Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"23px"}}  /></Link></li>
        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logparentstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {eoID &&<>
        <li>Logged in as <label style={{
            color:'green',
            fontWeight:"bolder"
        }}>{eoName}</label></li>
         <li><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}}  /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></li>
        <li><Link style={{textDecoration:"none"}} to="/Expro">Profile</Link></li>
    
        

        <li><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logeostate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></li> 
        </>}
        {(!adminID && !teacherID && !doctorID && !parentID && !eoID && !staffID) && <>
      <li className='fs-5 mt-2 flex-grow-1' style={{letterSpacing:"4px",fontFamily:""}}><label className='me-2'><MdSchool className='fs-2'/></label><label>S</label>chool-<label>M</label>anagement-<label>S</label>ystem</li>
      <li><Link>About us</Link></li>
       <li> <Dropdown className='mt-2 me-5' as={ButtonGroup}>
      <Button  style={{borderRadius:"0rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"2px"}} variant="secondary"><u>Login Options</u></Button>

      <Dropdown.Toggle style={{borderRadius:"0rem",boxShadow:"0px 0px 4px 0px grey"}} split variant="secondary" id="dropdown-split-basic" />

      <Dropdown.Menu className='fs-6 ' style={{letterSpacing:"2px",border:"1px solid grey"}}  >
        <Dropdown.Item   >  <Link className='text-black'  to="/Tlogin">Teacher</Link></Dropdown.Item>
        <Dropdown.Item ><Link className='text-black'  to="/Adminlogin">Admin</Link></Dropdown.Item>
        <Dropdown.Item >  <Link className='text-black'  to="/Dlogin">Doctor</Link></Dropdown.Item>
        <Dropdown.Item>   <Link className='text-black'  to="/Plogin">Parent</Link></Dropdown.Item>
        <Dropdown.Item>  <Link className='text-black'  to="/Elogin">External</Link></Dropdown.Item>
        <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Contact us</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown></li>
        </> }
        
     
        </ul>
        </nav>
    </>
  )
}

