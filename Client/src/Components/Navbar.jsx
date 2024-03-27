import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import GetadminID from './Hooks/GetadminID';
import { PiExamFill } from "react-icons/pi";
import Getadminname from './Hooks/Getadminname';
import { MdSupervisorAccount } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoNewspaperSharp } from "react-icons/io5";
import mycontext from '../Context/Context'
import { PiChatsLight } from "react-icons/pi";
import GetTname from './Hooks/Getteachername';
import { RiHealthBookFill } from "react-icons/ri";
import GetTID from './Hooks/Getteacherid';
import { ImBook } from "react-icons/im";
import { MdSchool } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import {CgProfile} from "react-icons/cg"
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { BiHomeAlt2 } from "react-icons/bi";
import GetdoctorID from './Hooks/GetdoctorID';
import Getdoctorname from './Hooks/Getdoctorname';
import GetParentID from './Hooks/GetParentID';
import GetPname from './Hooks/GetParentName';
import { RiFileList2Fill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
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
        localStorage.removeItem("teacherProfile")
        
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
         localStorage.removeItem("doctorProfile")
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
       localStorage.removeItem("adminProfile")
         localStorage.removeItem("adminName")
         localStorage.removeItem("adminID")
         localStorage.removeItem("adminProfile")
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
         localStorage.removeItem("parentProfile")
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
         localStorage.removeItem("eoProfile")
         localStorage.removeItem("eoName")
         localStorage.removeItem("eoID")
         nav("/Elogin")
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
         localStorage.removeItem("staffProfile")
         localStorage.removeItem("staffbatch")
         nav("/Staff")
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

const Allteachers = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Teacher/Staff management
  </Tooltip>
);
const Profile = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Profile
</Tooltip>
)
const Ap = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Your Profile
  </Tooltip>
);
const La = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     LogOut
  </Tooltip>
);
const Sr = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Student Register
  </Tooltip>
);
const Bm = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Broadcast Message
  </Tooltip>
);
const Sa = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Student Attendence
  </Tooltip>
);
const Va = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Attendence
  </Tooltip>
);
const Ml = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Marklist
  </Tooltip>
);
const Vm = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     View Marklist
  </Tooltip>
);
const Vl = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Leaveletter
  </Tooltip>
);
const Tt = (props) => (
  <Tooltip id="button-tooltip" {...props}>
      Timetable
  </Tooltip>
);
const Hr = (props) => (
  <Tooltip id="button-tooltip" {...props}>
     Student Health Report

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
        marginTop:"13px"
       
    }}>
  {adminID &&<>
  <div className='d-flex gap-4  justify-content-center'  >
        <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{adminName}</div></li>
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

        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Allteachers}><Link style={{textDecoration:"none"}} to="/Allteachers"><FaUserEdit style={{color:"black",fontSize:"28px"}}  /></Link></OverlayTrigger></li>

    

        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}  ><Link style={{textDecoration:"none"}} to="/Admprofile"><CgProfile  style={{color:"black",fontSize:"28px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La} ><button style={{border:"none",backgroundColor:"transparent"}}  onClick={()=>{Logadminout()}}><IoLogOutOutline style={{fontSize:"28px",color:"black"}}/></button></OverlayTrigger></li> 

        </div></>}
        {teacherID &&<>
          <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{teacherName}</div></li>

<OverlayTrigger
                    placement="bottom"
                    delay={{ show: 50, hide: 100 }}
                    overlay={renderTooltip}
                  >
         <li><Link style={{ textDecoration: "none" }} to="/Home">
              
                    <BiHomeAlt2 style={{ color: "black", fontSize: "25px" }} />
              
                </Link></li></OverlayTrigger>
         {/* <li><Link style={{textDecoration:"none"}} to="/TeacherClassroom">Your Classroom</Link></li> */}

         <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sr}><Link style={{textDecoration:"none"}} to="/Pregister"><FaUserPlus style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Bm}><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sa}><Link style={{textDecoration:"none"}} to="/Studentattendence"><RiFileList2Fill style={{color:"black",fontSize:"28xp"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Va}><Link style={{textDecoration:"none"}} to="/viewattendence"><MdSupervisorAccount style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ml}><Link style={{textDecoration:"none"}} to="/marklist"><PiExamFill style={{color:"black",fontSize:"23px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Vm}><Link style={{textDecoration:"none"}} to="/viewmarklist"><IoNewspaperSharp style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Vl}><Link style={{textDecoration:"none"}} to="/viewletter"><SlEnvolopeLetter style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Tt}><Link style={{textDecoration:"none"}} to="/timetable"><FaCalendarDays style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}><Link style={{textDecoration:"none"}} to="/Tpro"><CgProfile  style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Classroom}><Link style={{textDecoration:"none"}} to="/TeacherClassroom"><SiGoogleclassroom style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Hr}><Link style={{textDecoration:"none"}} to="/Health"> <RiHealthBookFill style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La}><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logststate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></OverlayTrigger></li> 
        </>}
        {doctorID &&<>
          <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{doctorName}</div></li>
         <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={renderTooltip}><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}}  to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}><Link style={{textDecoration:"none"}}  to="/Dpro"><CgProfile  style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Hr}><Link style={{textDecoration:"none"}}  to="Healthview"><RiHealthBookFill style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Bm}><Link style={{textDecoration:"none"}}  to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
      
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La}><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logdocstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></OverlayTrigger></li> 
        </>}
        {staffID &&<>
          <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{staffName}</div></li>


         <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={renderTooltip}><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"28px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"28px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Bm}><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"24px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ml}><Link style={{textDecoration:"none"}} to="/Staffmark"><PiExamFill style={{color:"black",fontSize:"23px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Vm}><Link style={{textDecoration:"none"}} to="/Staffmarkview"><IoNewspaperSharp style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"25px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}><Link style={{textDecoration:"none"}} to="/StaffPro"><CgProfile style={{color:"black",fontSize:"27px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La}><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logstaffstate()}}><IoLogOutOutline style={{fontSize:"28px"}}/></button></OverlayTrigger></li> 
        </>}
        {parentID &&<>
          <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{parentName}</div></li>

        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={renderTooltip}><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Bm}><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Tt}><Link style={{textDecoration:"none"}} to="/viewtime"><FaCalendarDays style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Vl}><Link style={{textDecoration:"none"}} to="/leaveletter"><SlEnvolopeLetter style={{color:"black",fontSize:"25px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Vm}><Link style={{textDecoration:"none"}} to="/ParentmarklistView"><PiExamFill style={{color:"black",fontSize:"23px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Va}><Link style={{textDecoration:"none"}} to="/parentattendeceView"><MdSupervisorAccount style={{color:"black",fontSize:"25px"}}/></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}><Link style={{textDecoration:"none"}} to="/Ppro"><CgProfile style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Sm}><Link style={{textDecoration:"none"}} to="/Studymaterial"><ImBook style={{color:"black",fontSize:"23px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La}><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logparentstate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></OverlayTrigger></li> 
        </>}
        {eoID &&<>
          <li className='d-flex gap-2'><div className='text-danger'>Active </div> <label className='text-black'>:-</label> <div className='text-success'>{eoName}</div></li>
         <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={renderTooltip}><Link style={{textDecoration:"none"}} to="/Home"><BiHomeAlt2  style={{color:"black",fontSize:"23px"}}  /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Chat}><Link style={{textDecoration:"none"}} to="/Chat"><PiChatsLight style={{color:"black",fontSize:"27px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Bm}><Link style={{textDecoration:"none"}} to="/Broadcasts"><BsChatLeftTextFill style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={Ap}><Link style={{textDecoration:"none"}} to="/Expro"><CgProfile style={{color:"black",fontSize:"23px"}} /></Link></OverlayTrigger></li>
        <li><OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={La}><button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>{Logeostate()}}><IoLogOutOutline style={{fontSize:"25px"}}/></button></OverlayTrigger></li> 
        </>}
        {(!adminID && !teacherID && !doctorID && !parentID && !eoID && !staffID) && <>
      <li className='fs-5 mt-2 flex-grow-1' style={{letterSpacing:"4px",fontFamily:"", color:'black'}}><label className='me-2'><MdSchool className='fs-2'/><label  style={{fontFamily:'monospace',fontSize:'22px',marginLeft:'5px'}}>EduWorld</label></label></li>
      <li> <Link className='fs-5' to="/contactus" style={{letterSpacing:"2px",textDecoration:'none',color:"black"}}>Contact Us</Link></li>
       <li> <Dropdown className=' me-5' as={ButtonGroup}>
 
      <Button  style={{borderRadius:"0rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"3px"}} variant="secondary"><u style={{textDecoration:'none'}}>Login Options</u></Button>

      <Dropdown.Toggle style={{borderRadius:"0rem",boxShadow:"0px 0px 4px 0px grey"}} split variant="secondary" id="dropdown-split-basic" />

      <Dropdown.Menu className='fs-6 ' style={{letterSpacing:"2px",border:"1px solid grey"}}  >
        <Dropdown.Item   >  <Link className='text-black' style={{ textDecoration: 'none' }} to="/Tlogin">Teacher</Link></Dropdown.Item>
        <Dropdown.Item >  <Link className='text-black' style={{ textDecoration: 'none' }} to="/Dlogin">Doctor</Link></Dropdown.Item>
        <Dropdown.Item>   <Link className='text-black' style={{ textDecoration: 'none' }} to="/Plogin">Parent</Link></Dropdown.Item>
        <Dropdown.Item>  <Link className='text-black' style={{ textDecoration: 'none' }}  to="/Elogin">External</Link></Dropdown.Item>
        <Dropdown.Divider />
            <Dropdown.Item eventKey="4" ><Link className='text-black ' style={{ textDecoration: 'none' }} to="/Adminlogin">Admin</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown></li>
        </> }
        
     
        </ul>
        </nav>
    </>
  )
}

