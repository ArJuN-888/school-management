import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Table } from 'react-bootstrap';
import mycontext from '../Context/Context';
import { VscClose } from "react-icons/vsc";
import { PiChalkboardTeacherFill } from "react-icons/pi";
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
    const [stafftog,setStafftog] = useState(0)
const [staff,setStaff] = useState([])
    useEffect(() => {
        fetchTeachers();
        fetchParents();
        fetchStaff();
    }, []);
    console.log("staff",staff)
    const fetchStaff = async() =>{
        try{
          const response  = await axios.get(`${baseURL}/Staff/getstaff`)
      setStaff(response.data.staff)
        }
      catch(error)
      {
        toast.error(error.response.data.message,{transition:Flip})
      }
      }
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
const handleStafftoggle = (sbatch)=>{
    setStafftog(1)
    setBatch(sbatch)
}
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View Students
        </Tooltip>
    );

    const renderstaff = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View Staff
        </Tooltip>
    );
    return (
        <div className='' style={{padding:"20px"}}>
            <h3 className=' fs-4' style={{ letterSpacing: "3px" ,textAlign:"center"}}>Registered Classrooms...</h3>

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
              <div className='t-con' style={{backgroundColor:"",border:"3px solid black"}}>
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
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderstaff}
                >
                <Button className='fs-6 mt-2' onClick={() => handleStafftoggle(data.batch)} style={{
                        padding: "8px 12px 10px 12px",
                        border: "none",
                        boxShadow: "0px 0px 4px 0px grey",
                        margin: "2px",
                        borderRadius: "0.2rem",
                        letterSpacing: "2px"
                    }}>
                   <PiChalkboardTeacherFill className='fs-5' />
                    </Button>
                    </OverlayTrigger>
            </div>
        
        )} 
        </div>
            ))}
            </div>
<div className='Staff' style={{backgroundColor:"red"}}>
    {staff.map((data,index)=>(
        <div key={index}>
            {(stafftog ===1 && data.batch === batch) && (
                <>
                <div>{data.username}</div>
                <div>{data.batch}</div>
                <div>{data.phone}</div>
                </>
            )} 
            </div>
    ))}
 
</div>
                <div className=''>
                   <div className='d-flex justify-content-center align-items-center '>{ptog === 1 && <h3 className='ms-2 mt-3 d-flex mb-4 fs-4 justify-content-center' style={{ letterSpacing: "3px" }}>{`Classroom - ${batch}`}...</h3>}   {ptog === 1 && <Button className='mb-3mt-2' style={{
                        padding: "6px 10px 8px 10px",
                        border: "none",
                        letterSpacing: "2px",
                        boxShadow: "0px 0px 4px 0px grey",
                        backgroundColor: "red",
                        margin: "2px",
                        borderRadius: "5px",
                    }} onClick={Close}><VscClose className='fs-4'/></Button>}</div> 
                   
                    

                      
                        {!parents.some((element) => element.batch === batch) && ptog === 1 && <h3 className='mt-3 mb-3' style={{letterSpacing:"3px"}}>No students registered...</h3>}
                            {parents.map((data, index) => (
                                <div key={index} className='d-inline-flex '  >
                                    {(ptog === 1 && data.batch === batch) && (
                                        <div className='d-block me-3 justify-content-center classchild fs-5'   style={{backgroundColor:"yellow",boxShadow:"0px 0px 5px 0px grey",borderRadius:"0.2rem",letterSpacing:"2px"}}>
                                       
                                            <div>Student : {data.studentname}</div>
                                            <div>Guardian: {data.parentname}</div>
                                            <div>Batch : {data.batch}</div>
                                            <div>Email : {data.email}</div>
                                            <div>Phone no : {data.parentphone}</div>
                                          
                                        </div>
                                    )}
                                </div>
                            ))}
                       
                 
                 
                </div>
          </div>
       
       
    );
}
