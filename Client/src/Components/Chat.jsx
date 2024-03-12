import React, { useEffect, useState,useContext } from 'react'
import axios, { all } from 'axios'
import UserChat from "./Chat/UserChat"
import Chatbox from './Chat/Chatbox'
import "./Styles/Chat.css"
import { TbMessage2Search } from "react-icons/tb";
import mycontext from '../Context/Context'
import GetTID from './Hooks/Getteacherid'
import Spinner from 'react-bootstrap/Spinner';
import PotentialChats from './Chat/PotentialChats'
import GetadminID from './Hooks/GetadminID'
import GetdoctorID from './Hooks/GetdoctorID'
export default function Chat() {
  const teacherID = GetTID()
  const doctorID = GetdoctorID()
   const adminID = GetadminID()
   const {baseURL,setPotentialChats,chat,setChat,currentChat,setCurrentChat,messages,setMessages,userID} = useContext(mycontext)
    
  //  const [allusers,setAllusers] = useState([])
    console.log("currentchat",currentChat)
    console.log("messagesofuser",messages)
    const [loading,setLoading] = useState(true)
   console.log("chatofusercurrently logged in",chat)
    console.log("currentid",userID)
    // console.log("allusers",allusers)

useEffect(()=>{
  if(teacherID === userID)
  {
    fetchuserchat()
  
  }
  else if(adminID === userID)
  {
    fetchadminchat()
  }
  else if(doctorID === userID)
  {
    fetchdoctorchat()
  }
},[userID,doctorID])
    useEffect(()=>{
      fetchMessages()
    },[currentChat])
    useEffect(()=>{
      getUsers()
      
       },[chat])
  //teacher chat 
    const fetchuserchat = async() =>{
        try{
            
            const response = await axios.get(`${baseURL}/Chat/${teacherID}`)
            setChat(response.data)
            setLoading(false)
        }
      catch(error)
      {
        alert(error.response.data.message)
      }
    }
    //admin chat
    const fetchadminchat = async() =>{
      try{
          
          const response = await axios.get(`${baseURL}/Chat/${adminID}`)
          setChat(response.data)
          setLoading(false)
      }
    catch(error)
    {
      alert(error.response.data.message)
    }
  }
  //doctor chat 
  const fetchdoctorchat = async() =>{
    try{
        
        const response = await axios.get(`${baseURL}/Chat/${doctorID}`)
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        setChat(response.data)
        setLoading(false)
    }
  catch(error)
  {
    alert(error.response.data.message)
  }
}
    //user current chat
    const fetchMessages = async() =>{
      try{
          
          const response = await axios.get(`${baseURL}/Message/${currentChat?._id}`)
          setMessages(response.data)
          setLoading(false)
      }
    catch(error)
    {
      alert(error.response.data.message)
    }
  }
  const getUsers = async () => {
  
    try {
   
      
         const responseTeachers = await axios.get(`${baseURL}/Teacher/getallteachers`);
  
      const responseAdmins = await axios.get(`${baseURL}/Admin/getadmin`);
      const responseDoctor = await axios.get(`${baseURL}/Doctor/getalldoctor`);
      // Extract users from the responses
      let newTeachers =[];
      const newDoctors = responseDoctor.data.doctor
      if(!teacherID)
      {
         newTeachers = responseTeachers.data.teacher;
      }
     
      const newAdmins = responseAdmins.data.admin;
  
      // Check for existing users in allusers and avoid duplication
      // setAllusers((prevUsers) => {
      //   const existingUserIds = new Set(prevUsers.map((user) => user._id));
      //   const filteredDoctors = newDoctors.filter((doctor)=>!existingUserIds.has(doctor._id))
      //   const filteredTeachers = newTeachers.filter((teacher) => !existingUserIds.has(teacher._id));
      //   const filteredAdmins = newAdmins.filter((admin) => !existingUserIds.has(admin._id));
      //   return [...prevUsers, ...filteredTeachers, ...filteredAdmins,...filteredDoctors];
      // });
  
      const pchats = [...newTeachers, ...newAdmins,...newDoctors].filter((u) => {
        let isChatCreated = false;
        if (userID === u._id) return false;
        if (chat) {
          isChatCreated = chat.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pchats);
    
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className='main-parent '>
    <div className='mn' style={{ fontFamily:"monospace",fontSize:"20px",display:"flex",gap:"10px"}}>
      <PotentialChats/>
        {chat.length<1  ? null : 
       
           <div className='message-box   d-flex flex-column  ' >
               <label className='chatlb ms-2 fs-5 ' style={{textAlign:"center",margin:"6px 0px 0px 0px",letterSpacing:"2px"}}>Previous Chats <TbMessage2Search /></label>
            {loading===true && <Spinner animation="border" variant="danger" />}
            {chat&&chat.map((chat,index)=>{
                return(
                    <div key={index} onClick={()=>setCurrentChat(chat)}>
                    
  <UserChat  chat={chat} userID = {userID}/>

                    </div>
                )
                                
})}
        
           
            </div>
          
        }
          <div className='chat-box-container ms-2'><Chatbox/></div>
    </div>
    </div>
  )
}
