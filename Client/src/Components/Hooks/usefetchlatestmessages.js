import { useContext,useState,useEffect } from "react";
import axios from "axios";
import React from 'react'
import mycontext from "../../Context/Context";

export const  usefetchlatestmessages = (chat) => {
    const {newMessage,notifications,baseURL} = useContext(mycontext)
    const [latestMessage,setLatestMessage] = useState(null);
    console.log("lastmessagehook",latestMessage)
    console.log("chatid",chat)
    useEffect(()=>{
  const getMessages = async() =>{
    try{
        const response = await axios.get(`${baseURL}/Message/${chat._id}`);
        console.log("hook",response.data)
        const lastMessage = response.data[response.data?.length  -  1]
        setLatestMessage(lastMessage)
    }
  catch(error){
    console.log(error)
  }
   
  }
  getMessages()
    },[newMessage,notifications])
  return {latestMessage}
}
