import React, { useContext, useState } from 'react'
import { PiNotificationLight } from "react-icons/pi";
import mycontext from '../Context/Context';
import { FaCheck } from "react-icons/fa";
import { unreadNotificationsFunc } from './Hooks/unreadNotifications';
import { FaCheckDouble } from "react-icons/fa";
import moment from 'moment';
export default function Notification() {
    const {  notifications,setNotifications,chat,userID,allUsers,markAllNotificationsAsread,markNotificationAsRead} = useContext(mycontext)
    const [isOpen,setisOpen] = useState(false)
   const unreadNotifications = unreadNotificationsFunc(notifications)
   const modifiedNotifications = notifications.map((n)=>{
    const sender = allUsers.find(user => user._id === n.senderId)
return {
    ...n,
    senderName: sender?.username || sender?.parentname ,
};
   })
   console.log("un",unreadNotifications)
   console.log("mn",modifiedNotifications)
  return (
    <div className='notifications'>
        <div  className="notifications-icon position-relative" >
        <PiNotificationLight style={{cursor:"pointer"}} className='fs-4' onClick={()=> setisOpen(!isOpen)}/>
        {unreadNotifications?.length === 0 ? null : (
 <div className="notification-count">
<span style={{
    padding:"0px 7px 0px 7px",
    position:"absolute",
    top:"13%",
    borderRadius:"20px"
}} className='bg-primary text-white fs-6'>{unreadNotifications?.length}</span>
 </div>
        )}
       
        </div>
        {isOpen ?  <div className='notification-box position-absolute  '>
            <div  style={{backgroundColor:"white",borderRadius:"10px",border:"1px solid grey"}} className="notifications-header p-3  ">
                <h5 className='fs-6 text-white bg-primary p-2  ' style={{letterSpacing:"2px",
            boxShadow:"0px 0px 5px 0px grey"}}>Notifications</h5>
              
                <div className='mark-as-read' style={{cursor:"pointer"}} onClick={()=>markAllNotificationsAsread(notifications)}>
                    Mark all as read
                </div>
                <hr></hr>
                {modifiedNotifications?.length === 0 ? <span className='notifications'>No notifications yet..</span>: null}
                {modifiedNotifications && modifiedNotifications.map((n,index)=>{
                    return <div key = {index} onClick={()=>{
                        markNotificationAsRead(n,chat,userID,notifications)
                        setisOpen(false)
                    }}>
                        <span >{`${n.senderName}`} sent you a new message</span>
                        <span  className='notification-time me-2'>{moment(n.date).calendar()}</span>
                        {n.isRead ? <FaCheckDouble /> : <FaCheck />}
                        
                    </div>
                })}
            </div>
        </div> : null}
       
    </div>
  )
}
