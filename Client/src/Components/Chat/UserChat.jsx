import React, { useContext } from 'react'
import { useFetchRecipient } from '../Hooks/FetchRecipient'
import { BiSolidChat } from "react-icons/bi";

import { HiOutlineStatusOnline } from "react-icons/hi";
import mycontext from '../../Context/Context';
import { unreadNotificationsFunc } from '../Hooks/unreadNotifications';
import { usefetchlatestmessages } from '../Hooks/usefetchlatestmessages';
import moment from 'moment';
const UserChat = ({chat,userID}) => {
const {onlineUsers,notifications,markthisuserNotificationAsRead} = useContext(mycontext)
 const {recipientUser} = useFetchRecipient(chat,userID)
 const {latestMessage} = usefetchlatestmessages(chat)
 console.log("latestmessage",latestMessage)
 const unReadNotifications = unreadNotificationsFunc(notifications)
 const thisUsernotifications = unReadNotifications?.filter(
  n => n.senderId === recipientUser?._id
 )
 const isOnline = onlineUsers.some((user)=>user?.userID === recipientUser?._id) 
 console.log("rgth", recipientUser)
const truncateText = (text) =>{
  let shortText = text.substring(0,20)
  if(text.length >  20){
    shortText = shortText = "..."
  }
  return shortText
}
  return (
    <>
    <div style={{
        display:"flex",
        cursor:"pointer",
        color:"black",
        fontSize:"15px",
        boxShadow:"0px 0px 6px 0px grey",
        borderRadius:"10px"
    }} className='user-card  align-items-center p-2  justify-content-between fs-6'>
 <div className='d-flex'
 onClick={()=>{
  if(thisUsernotifications?.length !== 0 ){
    markthisuserNotificationAsRead(
      thisUsernotifications,
      notifications
    )
  }
 }}
 >
   
<div className='me-2'>
<BiSolidChat  style={{
  fontSize:"30px",
  color:"#4e72f7",
  
}} />
</div>
<div className='text-content ' >
{recipientUser && recipientUser.username && (
  <div className='name ' style={{letterSpacing:"2px",fontSize:"18px"}}>{recipientUser.username}</div>
)}
{recipientUser && recipientUser.parentname && (
  <div className='name fs-5 '>{recipientUser.parentname}</div>
)}
{recipientUser && recipientUser.classname && (
  <div className='name fs-5 '>class : {recipientUser.classname}</div>
)}
  {recipientUser && recipientUser.qualification && (
  <div className='name d-flex '>qualification : {recipientUser.qualification}</div>
)}
 {recipientUser && recipientUser.batch && (
  <div className='name d-flex '>class : {recipientUser.batch}</div>
)}
  {recipientUser && recipientUser.organization && (
  <div className='name  p-1   d-flex '>Associate :  {recipientUser.organization}</div>
)}
  {recipientUser && recipientUser.status && recipientUser.parentname && recipientUser.studentname && (
  <div className='name  p-1   d-flex '>{recipientUser.status} {` of ${recipientUser.studentname}`}</div>
)}
  {recipientUser && recipientUser.status && (
  <div className='name  p-1   d-flex '>stat : {recipientUser.status}</div>
)}
<div className='text'>{
latestMessage?.text && (
  <span>{truncateText(latestMessage?.text)}</span>
)
}</div>
</div>
 </div>
 <div className="d-flex flex-column align-items-end">
    <div className='date'>{moment(latestMessage?.createdAt).calendar()}</div>
    <div className={thisUsernotifications?.length > 0 ? 'this-user-notifications' : "" }>
      {thisUsernotifications?.length>0 ? thisUsernotifications?.length : ""}
    </div>
    <span className="user-online">{isOnline ? <HiOutlineStatusOnline  style={{fontSize:"30ypx",color:"green"}} /> : "" }</span>
 </div>
    </div>
    </>
  )
}
export default UserChat
