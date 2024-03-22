import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Button, Table } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import mycontext from '../Context/Context';
import { VscClose } from "react-icons/vsc";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaBookBookmark } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa6";

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
        <div className='' >
            <h3 className='ms-2 mt-4 mb-4 ' style={{ letterSpacing: "3px" ,textAlign:"center"}}>Registered Classrooms...</h3>
            <div className='main d-block flex-wrap'>
                {teachers.map((data, index) => (
                    <div className='data  ' style={{ letterSpacing: "2px" }} key={index}>
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
                                    <Button onClick={() => handleptoggle(data.batch)} style={{
                                        padding: "8px",
                                        border: "none",
                                        boxShadow: "0px 0px 4px 0px grey",
                                        margin: "2px",
                                        borderRadius: "5px",
                                        backgroundColor: "#00A36C"
                                    }}>
                                        <FaUserGraduate style={{ fontSize: "24px", color: "white" }} />
                                    </Button>
                                </OverlayTrigger>
                            </>
                        ) : (
                       
                                <div className='allbt mt-1' >
                                <Button variant='primary'  style={{
                                    padding: "10px 50px 10px 50px",
                                    position: "relative",
                                    border: "none",
                                    letterSpacing: "2px",
                                    boxShadow: "0px 0px 4px 0px grey",
                                    color: "white",
                                    margin: "2px",
                                    borderRadius: "5px",
                                }} onClick={() => handleToggle(data._id)}>
                                    {data.batch}
                                    
                                     <FaBookBookmark />
                                </Button>
                              
                                </div>
                           
                        )}
                    </div>
                ))}
                <div className=''>
                    {ptog === 1 && <h3 className='ms-2 mt-3 mb-4 justify-content-center' style={{ letterSpacing: "3px" }}>{`Registered Students in ${batch}`}</h3>}
                   
                    <Table responsive striped hover bordered >
                        {ptog === 1 && <thead>
                            <tr>
                                <th className='fs-5 bg-primary text-white' style={{ letterSpacing: "2px" }}>Student Name</th>
                                <th className='fs-5 bg-primary text-white' style={{ letterSpacing: "2px" }}>Parent Name</th>
                                <th className='fs-5 bg-primary text-white' style={{ letterSpacing: "2px" }}>Batch</th>
                                <th className='fs-5 bg-primary text-white' style={{ letterSpacing: "2px" }}>Email</th>
                                <th className='fs-5 bg-primary text-white' style={{ letterSpacing: "2px" }}>Ph no</th>
                            </tr>
                        </thead>}

                        <tbody>
                        {!parents.some((element) => element.batch === batch) && ptog === 1 && <h3 className='mt-3 mb-3' style={{letterSpacing:"3px"}}>No students registered...</h3>}
                            {parents.map((data, index) => (
                                <tr key={index}>
                                    {(ptog === 1 && data.batch === batch) && (
                                        <>
                                            <td className='fs-5' style={{ letterSpacing: "2px" }}>{data.studentname}</td>
                                            <td className='fs-5' style={{ letterSpacing: "2px" }}>{data.parentname}</td>
                                            <td className='fs-5' style={{ letterSpacing: "2px" }}>{data.batch}</td>
                                            <td className='fs-5' style={{ letterSpacing: "2px" }}>{data.email}</td>
                                            <td className='fs-5' style={{ letterSpacing: "2px" }}>{data.parentphone}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
            </div>
        </div>
    );
}
