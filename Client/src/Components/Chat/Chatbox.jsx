import React, { useContext,useEffect,useState } from 'react'
import { BiSolidSend } from "react-icons/bi";
import moment from "moment"
import "../Styles/Chat.css"
import { useRef } from 'react';
import { BiChat } from "react-icons/bi";
import Spinner from 'react-bootstrap/Spinner';
import { RiChatQuoteLine } from "react-icons/ri";
import axios from 'axios';
import {Stack} from "react-bootstrap"
import { useFetchRecipient } from '../Hooks/FetchRecipient'
import mycontext from '../../Context/Context'
import InputEmoji from "react-input-emoji"
import {Flip, toast} from 'react-toastify'
export default function Chatbox() {
    const {currentChat,messages,setMessages,baseURL,newMessage,setNewMessage, userID} = useContext(mycontext)
    const [textMessage,setTextMessage] = useState("")
   const {recipientUser} = useFetchRecipient(currentChat,userID)
  const scrollRef = useRef()
  useEffect(()=>{
scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  useEffect(()=>{
    if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
  },[messages,newMessage])
   if(!recipientUser) return (<div className='d-flex' style={{justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}><label className='me-2 text-black fs-5'>No Conversations Yet...</label> <Spinner animation="border" size='md' variant="black" /></div>)

   const SendTextMessage = async(textMessage,currentchatid) =>{
     
      try{
        if(!textMessage) return alert("You must type something....")
        const response = await axios.post(`${baseURL}/Message`,{
            chatId:currentchatid,
            senderId:userID,
            text:textMessage
            })
            setNewMessage(response.data)
            setMessages((prev)=>[...prev,response.data])
            setTextMessage("")
    }
    catch(error)
    {
        toast.error(error.response.data.message,{transition:Flip})
    }
  
   }
  return (
  <Stack gap={4} className='chat-box'>
   <div className='chat-header '>
    <label style={
        {
            color:"black"
        }
    }>{recipientUser?.username} {recipientUser?.teachername} {recipientUser?.parentname}</label> <BiChat style={{color:"black"}} />  
   </div>
   <Stack gap={3} className='messages' >
  {messages && messages.map((message,index)=><Stack   key={index} className={`${message?.senderId === userID ? "message-s  p-2 me-3 mb-1 self align-self-end  flex-grow-0" : 
   "message-r  p-2 ms-3 self align-self-start flex-grow-0" }` }
   ref={scrollRef}
   >
    <span style={{fontSize:"18px",display:"flex",flexWrap:"wrap"}}>{message.text} <RiChatQuoteLine /> </span>
    <span style={{fontSize:"12px"}}>{moment(message.createdAt).calendar()}</span>
  </Stack>)}
   </Stack>
   <Stack direction="horizontal"  className='chat-input flex-grow-0'>
   <InputEmoji    value={textMessage} onChange={setTextMessage} fontFamily="monospace"   borderColor='rgb(0,0,0,0.3)'  />
   <button style={{borderRadius:"50%",padding:"5px 7px 8px 10px"}} className='send-btn me-3 border-0 ' onClick={()=>{SendTextMessage(textMessage,currentChat._id)}} ><BiSolidSend 
   style={{
    fontSize:"25px",
    
}} /></button>
   </Stack>
  </Stack>
  )
}
