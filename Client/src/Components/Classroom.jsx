import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Table } from 'react-bootstrap';
import mycontext from '../Context/Context';
import { VscClose } from "react-icons/vsc";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaBookBookmark } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa6";
import {toast} from "react-toastify"

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
            toast.error(error.response.data.message,{transition:Flip})
        }
    };

    const fetchParents = async () => {
        try {
            const response = await axios.get(`${baseURL}/Parent/getallparent`);
            setParents(response.data.parent);
        } catch (error) {
            toast.error(error.response.data.message,{transition:Flip})
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
        <>
            <h3 className='' style={{ letterSpacing: "3px" ,textAlign:"center"}}>Registered Classrooms...</h3>

            <div className='d-flex justify-content-center'>
             {teachers.map((data, index) => (
           <div key={index}>
                    <Button variant='danger'  style={{
                        border: "none",
                        letterSpacing: "2px",
                        boxShadow: "0px 0px 5px 0px grey",
                        color: "white",
                        margin: "2px",
                        borderRadius: "0.2rem",
                    }} onClick={() => handleToggle(data._id)}>
                        {data.batch}
                    </Button>
                    </div>
             ))}
            
            </div>
            <div className='d-flex justify-content-center mt-2 flex-wrap'>
            {teachers.map((data, index) => (
    <div  key={index}>
        {(toggle === 1 && data._id === togid) && (
            <div className=' fs-5' style={{ letterSpacing: "3px" ,textAlign:"center"}}>
              <div className='t-con'>
                <div>Class Teacher : {data.username}</div>
                <div>Batch : {data.batch}</div>
                </div>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <Button className='fs-6 mt-2' onClick={() => handleptoggle(data.batch)} style={{
                        padding: "8px 12px 10px 12px",
                        border: "none",
                        boxShadow: "0px 0px 4px 0px grey",
                        margin: "2px",
                        borderRadius: "0.2rem",
                        letterSpacing: "2px"
                    }}>
                   <FaUserGraduate className='fs-5' />
                    </Button>
                </OverlayTrigger>
             
            </div>
        
        )} 
        </div>
            ))}
            </div>

                <div className=''>
                    {ptog === 1 && <h3 className='ms-2 mt-3 mb-4 justify-content-center' style={{ letterSpacing: "3px" }}>{`Registered Students in ${batch}`}</h3>}
                   
                    

                      
                        {!parents.some((element) => element.batch === batch) && ptog === 1 && <h3 className='mt-3 mb-3' style={{letterSpacing:"3px"}}>No students registered...</h3>}
                            {parents.map((data, index) => (
                                <div key={index}>
                                    {(ptog === 1 && data.batch === batch) && (
                                        <>
                                            <>{data.studentname}</>
                                            <>{data.parentname}</>
                                            <>{data.batch}</>
                                            <>{data.email}</>
                                            <>{data.parentphone}</>
                                        </>
                                    )}
                                </div>
                            ))}
                       
                 
                    {ptog === 1 && <Button className='mt-2' style={{
                        padding: "6px 10px 8px 10px",
                        border: "none",
                        letterSpacing: "2px",
                        boxShadow: "0px 0px 4px 0px grey",
                        backgroundColor: "red",
                        margin: "2px",
                        borderRadius: "5px",
                    }} onClick={Close}>Close</Button>}
                </div>
          </>
       
       
    );
}
