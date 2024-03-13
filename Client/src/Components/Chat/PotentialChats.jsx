import React, { useContext, useEffect } from 'react'
import mycontext from '../../Context/Context'
import axios from "axios"
import { TbMessage2Plus } from "react-icons/tb";
import { RiMessage2Fill } from "react-icons/ri";
import { HiOutlineStatusOnline } from "react-icons/hi";
export default function PotentialChats() {
    const {potentialChats,baseURL,chat,setChat,onlineUsers,setOnlineUsers,userID} = useContext(mycontext)
    console.log("Potentialchat",potentialChats)

 
    const Createchat = async(firstId,secondId) =>{
        try{
            const response = await axios.post(`${baseURL}/Chat`,{firstId,secondId})
            setChat((prev)=> [...prev,response.data])
           
        }
catch(error)
{
    alert(error.response.data.message)
}
      
    }
  return (
  <>
       {potentialChats.length !== 0 ? <div className="all-users">
           <div> <label style={{margin:"10px 0px 11.6px 0px"}} className=' fs-5'>Start a new chat...  <TbMessage2Plus /></label></div>
            {potentialChats && potentialChats.map((u,index)=>{
                return(
<div className="single-user" key={index} onClick={()=>{Createchat(userID,u._id)}}>
     <div><RiMessage2Fill fontSize="20px" style={{ color:"white"}}/> {u.username}</div>
     <div>{[u.classname] && [u.classname]}</div>
     <div>{u.status}  {u.studentname &&`of ${u.studentname} `}</div>
   <div>{onlineUsers.some((user)=>user?.userID === u._id) ? <HiOutlineStatusOnline style={{fontSize:"20px",color:"yellow"}} /> : ""}</div>
</div>
            )})}

        </div> : ""} 
        </>
  )
}
