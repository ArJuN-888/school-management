import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/Teacherlogin';
import mycontext from "./Context/Context";
import Register from './Components/Teacherregister';
import Navbar from "./Components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from "./Components/Chat";
import GetTID from "./Components/Hooks/Getteacherid";
import GetadminID from "./Components/Hooks/GetadminID";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"
import { AdminLogin } from "./Components/AdminLogin";
import DoctorLogin from "./Components/DoctorLogin";
import DoctorRegister from "./Components/DoctorRegister"
import GetdoctorID from "./Components/Hooks/GetdoctorID";
import ParentRegistration from "./Components/ParentRegistration";
import ParentLogin from "./Components/ParentLogin";
import GetParentID from "./Components/Hooks/GetParentID";
import AdminHome from "./Components/AdminHome";
import TeacherHome from "./Components/TeacherHome";
import Leaveletter from "./Components/Leaveletter";
function App() {
  const adminID = GetadminID()
  const teacherID = GetTID()
  const doctorID = GetdoctorID()
const parentID = GetParentID()
    //common logid container
    const [userID,setUserID] = useState(null)
    console.log("logoutuser id state  ",userID)
    const [teacherregisterdata,setteacherRegisterdata] = useState({username:"",classname:"",email:"",password:"", batch:"",status:""})
    const [teacherloginData,setteacherLogindata] = useState({email:"",password:"",batch:""})
    const [Parentregister,setparentRegister] = useState({
      studentname:"",
      parentname:"",
      classteacher:"",
      email:"",
      batch:"",
      health:"",
      password:"",
      parentphone:"",
      status:""
   
     })
     //Loged in Techer Students...
     const [loggedteacherStudents,setLoggedinTeacherStudents]=useState([])
    const [socket,setSocket] = useState(null)
    //not assigned a chat mainly new users
    const [potentialChats,setPotentialChats] = useState([])
    //userchat
    const [currentChat,setCurrentChat] = useState(null)
    const baseURL = "http://localhost:5000"
    const [chat,setChat] = useState([])
    //recipient messages
    const [messages,setMessages] = useState(null)
    //newmessage
    const [newMessage,setNewMessage] = useState(null)
    //online users
    const [onlineUsers,setOnlineUsers] = useState([])
    console.log("Online users",onlineUsers)
    //getting id of log
    useEffect(()=>{
        if(teacherID)
        {
         setUserID(teacherID)
        }
        else if(adminID)
        {
          setUserID(adminID)
        }
        else if(doctorID)
        {
          setUserID(doctorID)
        }
        else if(parentID)
        {
          setUserID(parentID)
        }
      },[adminID,teacherID,doctorID,parentID])
    useEffect(()=>{
        //establishing socket io connection
  const newSocket = io("http://localhost:8080")
  setSocket(newSocket)
  return ()=>{
    newSocket.disconnect()
  }
    },[userID])
    //add online users
    useEffect(()=>{
        //event triggering
        if(socket === null) return
socket.emit("addNewUser",userID)
//getting response from socket io server via emit
socket.on("getOnlineUsers",(res)=>{
  setOnlineUsers(res)
})
return () =>{
    socket.off("getOnlineUsers")
}

    },[socket])
    //send message

  useEffect(()=>{
        //event triggering
        if(socket === null) return
        const recipientId = currentChat?.members?.find((id)=> id !== userID)
   socket.emit("sendMessage",{...newMessage,recipientId})

    },[newMessage]);
    //recieve message to recipient via socket
    useEffect(()=>{
        //event triggering
        if(socket === null) return
  socket.on("getMessage",(res)=>{
  if(currentChat?._id !== res.chatId) return 
  setMessages((prev)=> [...prev,res])
  })
 return ()=>{
    socket.off("getMessage")
 } 

    },[socket,currentChat]);
const contextdata = {
    userID,setUserID,
    teacherregisterdata,setteacherRegisterdata,
    teacherloginData,setteacherLogindata,
    chat,setChat,
    potentialChats,setPotentialChats,
    currentChat,setCurrentChat,
    messages,setMessages,
    newMessage,setNewMessage,
    onlineUsers,setOnlineUsers,
    baseURL,Parentregister,
    setparentRegister,
    loggedteacherStudents,
    setLoggedinTeacherStudents
}
    return (
        <>
          

         <BrowserRouter>
        <mycontext.Provider value={contextdata}>
        <Navbar/>
         <Routes>
         <Route path="/Tlogin" element={<Login/>}/>
            <Route path="/Tregister" element={<Register/>}/>
    
            <Route path="/Home" element={<Home/>}/>
          
            <Route path="/Chat" element={<Chat/>}/>
            <Route path="/Adminlogin" element={<AdminLogin/>}/>
            <Route path="/Dlogin" element={<DoctorLogin/>}/>
            <Route path="/Dregister" element={<DoctorRegister/>}/>
            <Route path="/Pregister" element={<ParentRegistration/>}/>
            <Route path="/Plogin" element={<ParentLogin/>}/>
            <Route path="/AdminHome" element={<AdminHome/>}/>
            <Route path="/Teacherhome" element={<TeacherHome/>}/>
            <Route path="/leaveletter" element={<Leaveletter/>}/>
         </Routes>
         </mycontext.Provider>
         </BrowserRouter> 

       
        </>
    );
}

export default App;
