import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../../Context/Context';
import axios from "axios";
import { TbMessage2Plus } from "react-icons/tb";
import { HiOutlineStatusOnline } from "react-icons/hi";
import GetdoctorID from '../Hooks/GetdoctorID';
import GetadminID from '../Hooks/GetadminID';
import GetEID from '../Hooks/GetEID';
export default function PotentialChats() {
    const { potentialChats, baseURL, setChat, onlineUsers, userID } = useContext(mycontext);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const adminID = GetadminID()
    const doctorID = GetdoctorID()
    const eoID = GetEID()
    console.log("Potentialchat", potentialChats);

    const Createchat = async (firstId, secondId) => {
        try {
            const response = await axios.post(`${baseURL}/Chat`, { firstId, secondId });
            setChat((prev) => [...prev, response.data]);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // Function to handle batch selection
    const handleBatchSelect = (batch) => {
        setSelectedBatch(batch);
    };

    // Extract unique batch values
    const uniqueBatchValues = Array.from(new Set(potentialChats.map(u => u.batch)));

    return (
        <>
            {potentialChats.length !== 0 ? (
                <div className="all-users">
                    <div><label style={{ margin: "10px 0px 11.6px 0px" }} className=' fs-5'>Start a new chat...  <TbMessage2Plus /></label></div>
                    <div className="batch-filter">
                       
                       {(adminID || doctorID || eoID) && (<> <span className=' fs-6'>Sort users from batch </span><select className='mb-3 fs-5' style={{border:"none",backgroundColor:"transparent",
                    outline:"none"}} value={selectedBatch} onChange={(e) => handleBatchSelect(e.target.value)}>
                            <option  value="">All</option>
                            {/* Render unique batch values */}
                            {uniqueBatchValues.map((batch, index) => (
                                <option key={index} value={batch}>{batch}</option>
                            ))}
                        </select></>) } 
                    </div>
                    {potentialChats && potentialChats
                        .filter(u => selectedBatch ? u.batch === selectedBatch : true)
                        .map((u, index) => {
                            return (
                                <div className="single-user" key={index} onClick={() => { Createchat(userID, u._id) }}>
                                    <div > {u.username} {u.parentname && u.parentname}</div>
                                    <div> {[u.batch] && [u.batch]}</div>
                                    <div>{u.status}  {u.studentname && `of ${u.studentname} `}</div>
                                    <div>{onlineUsers.some((user) => user?.userID === u._id) ? <HiOutlineStatusOnline style={{ fontSize: "20px", color: "yellow" }} /> : ""}</div>
                                </div>
                            )
                        })}
                </div>
            ) : ""}
        </>
    );
}
