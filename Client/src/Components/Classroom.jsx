import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../Components/Styles/Home.css";
import { PiStudentLight } from "react-icons/pi";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import mycontext from '../Context/Context';
import { VscClose } from "react-icons/vsc";
export default function Classroom() {
    const { baseURL } = useContext(mycontext);
    const [teachers, setTeachers] = useState([]);
    const [parents, setParents] = useState([]);
    const [toggle, setToggle] = useState(0);
    const [togid, setTogid] = useState("");
    const [batch, setBatch] = useState("");
    const [ptog, setPtog] = useState(0);

    useEffect(() => {
        fetchTeachers();
        fetchParents();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`${baseURL}/Teacher/getallteachers`);
            setTeachers(response.data.teacher);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const fetchParents = async () => {
        try {
            const response = await axios.get(`${baseURL}/Parent/getallparent`);
            setParents(response.data.parent);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleToggle = (id) => {
        setToggle(1);
        setTogid(id);
    };

    const handleptoggle = (bth) => {
        setPtog(1);
        setBatch(bth);
    };

    const Close = () => {
        setPtog(0);
        setToggle(0);
        setTogid("")
        setBatch("")
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View Students
        </Tooltip>
    );

    return (
        <div className='main'>
            {teachers.map((data, index) => (
                <div className='data' key={index}>
                    {(toggle === 1 && data._id === togid) ? (
                        <>
                            <div>Name: {data.username}</div>
                            <div>Stat: {data.status}</div>
                            <div>Batch: {data.batch}</div>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <button onClick={() => handleptoggle(data.batch)} style={{
                                    padding: "8px",
                                    border: "none",
                                    boxShadow: "0px 0px 4px 0px",
                                    margin: "2px",
                                    borderRadius: "5px",
                                    backgroundColor: "transparent"
                                }}>
                                    <PiStudentLight style={{ fontSize: "30px" }} />
                                </button>
                            </OverlayTrigger>
                        </>
                    ) : (
                        <div className='d'>
                            <button style={{
                                padding: "30px",
                                border: "none",
                                boxShadow: "0px 0px 4px 0px",
                                backgroundColor: "transparent",
                                margin: "2px",
                                borderRadius: "5px",
                            }} onClick={() => handleToggle(data._id)}>
                                {data.batch}
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <div className=''>
                {parents.map((data, index) => (
                    <div  key={index}>
                        {(ptog === 1 && data.batch === batch) ? (
                            <div className='details-sub'>
                                <div>Student Name: {data.studentname}</div>
                                <div>Parent Name: {data.parentname}</div>
                                <div>Batch: {data.batch}</div>
                                <div>Email: {data.email}</div>
                                <div>Phone No: {data.parentphone}</div>
                                
                            </div>
                        ) : null}
                      
                    </div>
                ))}
                {ptog===1 &&  <button style={{
                                padding: "6px 10px 8px 10px",
                                border: "none",
                                boxShadow: "0px 0px 4px 0px",
                                backgroundColor: "red",
                                margin: "2px",

                                borderRadius: "5px",
                            }}  onClick={Close}><VscClose style={{ fontSize: "20px",color:"white" }} /></button>}
                 
            </div>
        </div>
    );
}
