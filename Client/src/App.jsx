import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Teacherlogin";
import mycontext from "./Context/Context";
import Register from "./Components/Teacherregister";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./Components/Chat";
import GetTID from "./Components/Hooks/Getteacherid";
import GetadminID from "./Components/Hooks/GetadminID";
import Home from "./Components/Home";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AdminLogin } from "./Components/AdminLogin";
import DoctorLogin from "./Components/DoctorLogin";
import DoctorRegister from "./Components/DoctorRegister";
import GetdoctorID from "./Components/Hooks/GetdoctorID";
import ParentRegistration from "./Components/ParentRegistration";
import ParentLogin from "./Components/ParentLogin";
import GetParentID from "./Components/Hooks/GetParentID";
import AdminHome from "./Components/AdminHome";
import CreateAnnouncements from "./Components/CreateAnnouncements";
import Classroom from "./Components/Classroom";
import Leaveletter from "./Components/Leaveletter";
import Broadcasts from "./Components/Broadcasts";
import Studentattendence from "./Components/Studentattendence";
import AttendenceViewing from "./Components/AttendenceViewing";
import StudentMarklist from "./Components/StudentMarklist";
import ViewMarklist from "./Components/ViewMarklist";
import ExternalOrganizationRegister from "./Components/ExternalOrganizationRegister";
import GetEID from "./Components/Hooks/GetEID";
import { EoLogin } from "./Components/EoLogin";
import Viewletter from "./Components/Viewletter";
import Timetable from "./Components/Timetable";
import TeacherClassroom from "./Components/TeacherClassroom";
function App() {
  const adminID = GetadminID();
  const teacherID = GetTID();
  const doctorID = GetdoctorID();
  const parentID = GetParentID();
  const eoID = GetEID()
  //common logid container
  console.log()
  const [userID, setUserID] = useState(null);
  console.log("logoutuser id state  ", userID);
  const [teacherregisterdata, setteacherRegisterdata] = useState({
    username: "",
    classname: "",
    email: "",
    password: "",
    batch: "",
    status: "",
  });
  const [teacherloginData, setteacherLogindata] = useState({
    email: "",
    password: "",
    batch: "",
  });
useEffect(()=>{
  fetchallUsers()
},[])
  //Loged in Techer Students...
  const [loggedteacherStudents, setLoggedinTeacherStudents] = useState([]);
  const [socket, setSocket] = useState(null);
  //not assigned a chat mainly new users
  const [potentialChats, setPotentialChats] = useState([]);
  //userchat
  const [currentChat, setCurrentChat] = useState(null);
  const baseURL = "http://localhost:5000";
  const [chat, setChat] = useState([]);
  //recipient messages
  const [messages, setMessages] = useState(null);
  //newmessage
  const [newMessage, setNewMessage] = useState(null);
  //online users
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log("Online users", onlineUsers);
  const [notifications,setNotifications] = useState([])
  console.log("notification",notifications)
  const [allUsers,setallUsers] = useState([])
   console.log("alluserssajhghgfhdgf",allUsers)
  const fetchallUsers = async() =>{
    const responseAdmins = await axios.get(`${baseURL}/Admin/getadmin`);
    const responseDoctor = await axios.get(`${baseURL}/Doctor/getalldoctor`);
    const responseTeachers = await axios.get(`${baseURL}/Teacher/getallteachers`)
   const  responseParent = await axios.get(`${baseURL}/Parent/getallparent`);
   const  responseeo = await axios.get(`${baseURL}/Organization/geteo`);
   setallUsers([...allUsers,...responseAdmins.data.admin,...responseDoctor.data.doctor,...responseParent.data.parent,...responseTeachers.data.teacher,...responseeo.data.eo])
  }
  //getting id of log
  useEffect(() => {
    if (teacherID) {
      setUserID(teacherID);
    } else if (adminID) {
      setUserID(adminID);
    } else if (doctorID) {
      setUserID(doctorID);
    } else if (parentID) {
      setUserID(parentID);
    }
    else if(eoID)
    {
      setUserID(eoID);
    }
  }, [adminID, teacherID, doctorID, parentID,eoID]);
  useEffect(() => {
    //establishing socket io connection
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userID]);
  //add online users
  useEffect(() => {
    //event triggering
    if (socket === null) return;
    socket.emit("addNewUser", userID);
    //getting response from socket io server via emit
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  //send message

  useEffect(() => {
    //event triggering
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== userID);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);
  //recieve message to recipient via socket /notifications
  useEffect(() => {
    //event triggering
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification",(res)=>{
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId)
      if(isChatOpen)
      {
        setNotifications((prev) => [{...res,isRead:true},...prev])
      }
      else{
        setNotifications((prev) => [res, ...prev])
      }
    })
    return () => {
      socket.off("getMessage");
      socket.off("getNotification")
    };
  }, [socket, currentChat]);
  const markAllNotificationsAsread = useCallback((notifications)=>{
    const mNotifications = notifications.map((n)=>{
      return {...n, isRead: true}
    })
    setNotifications(mNotifications)
  })
  const markNotificationAsRead = useCallback((n,chat,userID,notifications)=>{
    //find chat to open
  const desiredChat = chat.find(chat=>{
    const chatMembers = [userID,n.senderId]
    const isDesiredChat = chat?.members.every((member)=>{
      return chatMembers.includes(member)
    })
    return isDesiredChat
  })
  //mark notification as read
  const mnotifications = notifications.map(el=>{
    if(n.senderId === el.senderId){
      return {...n,isRead:true}
    }
    else{
      return el
    }

  })
  setCurrentChat(desiredChat)
  setNotifications(mnotifications)
  },[])
  const markthisuserNotificationAsRead = useCallback((thisUserNotifications,notifications)=>{
// mark notification as read
const mNotifications = notifications.map(el=>{
  let notification;
  thisUserNotifications.forEach(n=>{
    if(n.senderId == el.senderId){
      notification = {...n, isRead : true}
    }
    else {
      notification = el
    }
  })
  return notification
})
setNotifications(mNotifications)
  },[])
  const contextdata = {
    userID,
    setUserID,
    teacherregisterdata,
    setteacherRegisterdata,
    teacherloginData,
    setteacherLogindata,
    chat,
    setChat,
    potentialChats,
    setPotentialChats,
    currentChat,
    setCurrentChat,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    onlineUsers,
    setOnlineUsers,
    baseURL,
    loggedteacherStudents,
    setLoggedinTeacherStudents,
    notifications,setNotifications,
    allUsers,
    markAllNotificationsAsread,
    markNotificationAsRead,
    markthisuserNotificationAsRead
  };
  return (
    <>
      <BrowserRouter>
        <mycontext.Provider value={contextdata}>
          <Navbar />
          <Routes>
            <Route path="/Tlogin" element={<Login />} />
            <Route path="/Tregister" element={<Register />} />

            <Route path="/Home" element={<Home />} />

            <Route path="/Chat" element={<Chat />} />
            <Route path="/Adminlogin" element={<AdminLogin />} />
            <Route path="/Dlogin" element={<DoctorLogin />} />
            <Route path="/Dregister" element={<DoctorRegister />} />
            <Route path="/Pregister" element={<ParentRegistration />} />
            <Route path="/Plogin" element={<ParentLogin />} />
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/TeacherClassroom" element={<TeacherClassroom />} />
            <Route path="/createAnnouncements" element={<CreateAnnouncements />} />
            <Route path="/Studentattendence" element={<Studentattendence />} />
            <Route path="/leaveletter" element={<Leaveletter />} />
            <Route path="/Studentattendence" element={<Studentattendence />} />
            <Route path="/viewattendence" element={<AttendenceViewing />} />
            <Route path="/Classroom" element={<Classroom />} />
            <Route path="/Broadcasts" element={<Broadcasts />} />
            <Route path="/marklist" element={<StudentMarklist/>}/>
            <Route path="/viewmarklist" element={<ViewMarklist/>}/>
            <Route path="/Eregister" element={<ExternalOrganizationRegister/>}/>
            <Route path="/Elogin" element={<EoLogin/>}/>
            <Route path="/viewletter" element={<Viewletter/>}/>
            <Route path="/timetable" element={<Timetable/>}/>

          </Routes>
        </mycontext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
