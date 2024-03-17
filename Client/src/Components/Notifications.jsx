import React, { useContext, useState } from 'react'
import { PiNotificationLight } from "react-icons/pi";
import mycontext from '../Context/Context';
import { unreadNotificationsFunc } from './Hooks/unreadNotifications';
import moment from 'moment';
export default function Notification() {
    const {  notifications,setNotifications,chat,userID,allUsers,markAllNotificationsAsread} = useContext(mycontext)
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
        <div style={{cursor:"pointer"}} className="notifications-icon" onClick={()=> setisOpen(!isOpen)}>
        <PiNotificationLight className='fs-4'/>
        {unreadNotifications?.length === 0 ? null : (
 <div className="notification-count">
<span>{unreadNotifications?.length}</span>
 </div>
        )}
       
        </div>
        {isOpen ?  <div className='notification-box position-absolute  '>
            <div className="notifications-header ">
                <h5>Notifications</h5>
                <div className='mark-as-read' style={{cursor:"pointer"}} onClick={()=>markAllNotificationsAsread(notifications)}>
                    Mark all as read
                </div>
                {modifiedNotifications?.length === 0 ? <span className='notifications'>No notifications yet..</span>: null}
                {modifiedNotifications && modifiedNotifications.map((n,index)=>{
                    return <div key = {index} className={n.isRead ? 'notification' : 'notification not-read'}>
                        <span>{`${n.senderName}`} sent you a new message</span>
                        <span className='notification-time'>{moment(n.date).calendar()}</span>
                    </div>
                })}
            </div>
        </div> : null}
       
    </div>
  )
}
