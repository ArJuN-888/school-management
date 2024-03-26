import React, { useContext, useEffect, useState } from 'react';
import GetParentID from './Hooks/GetParentID';
import GetParentclass from './Hooks/GetPclass';
import { Container, Form, Button, Table } from 'react-bootstrap';
import './Styles/Leaveletter.css';
import axios from 'axios';
import mycontext from '../Context/Context';
import {Flip, toast} from "react-toastify"

export default function LeaveLetter() {
    const [letters, setLetters] = useState([]);
    const [sname, setSname] = useState("");
    const [rollno, setRollno] = useState("");
    const [days, setDays] = useState("");
    const [sdate, setSdate] = useState("");
    const [reason, SetReason] = useState("");
    const [sclass, setSclass] = useState("");
    const parentID = GetParentID();
    const pClass = GetParentclass()
    const { baseURL } = useContext(mycontext);

    useEffect(() => {
        getMyletter();
    }, []);

    const leaveSubmit = async () => {
        if(sclass === pClass)
        {
        try {
            const response = await axios.post(`${baseURL}/Leave/add`, {
                studentname: sname,
                rollno,
                days,
                startdate: sdate,
                reason,
                studentclass: sclass,
                parentid: parentID,
                grant: false
            });
            console.log("res", response);
            toast.success(response.data.message,{transition :Flip});
            setSname("");
            setRollno("");
            setDays("");
            setSdate("");
            SetReason("");
            setSclass("");
            getMyletter()
        } catch (error) {
            console.log(error);
        }
        }
        else
        {
            toast.error("Specify Your Classname Correctly",{transition:Flip})
        }
    };

    const getMyletter = async () => {
        try {
            const response = await axios.get(`${baseURL}/Leave/getletter/${parentID}`);
            setLetters(response.data);
        } catch (err) {
            toast.error(err,{transition:Flip});
        }
    };

    return (
        <Container className='leave-container fs-4' style={{letterSpacing:'3px'}}>
            <div className='leave-section'>
                <h1 className='leave-head' style={{fontFamily:'verdana'}}>Leave Letter</h1>
                <div className='leave-input-section fs-4'>
                    <Form className='fs-4'>
                        <Form.Group>
                            <Form.Control
                                className='leave-input fs-4'
                                style={{letterSpacing:"3px"}}
                                type='text'
                                placeholder='Student Name'
                                value={sname}
                                onChange={(e) => setSname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input fs-4'
                                type='number'
                                style={{letterSpacing:"3px"}}
                                placeholder='Student Rollno.'
                                value={rollno}
                                onChange={(e) => setRollno(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input fs-4'
                                type='number'
                                style={{letterSpacing:"3px"}}
                                placeholder='Days'
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input fs-4'
                                type='date'
                                style={{letterSpacing:"3px"}}
                                placeholder='Starting Date'
                                value={sdate}
                                onChange={(e) => setSdate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input fs-4'
                                type='text'
                                style={{letterSpacing:"3px"}}
                                placeholder='Reason'
                                value={reason}
                                onChange={(e) => SetReason(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Select
                                className='leave-input fs-4'
                                type='text'
                                style={{letterSpacing:"3px"}}
                                placeholder='Batch'
                                value={sclass}
                                onChange={(e) => setSclass(e.target.value)}
                            >
                                <option value="10A">10A</option>
                                <option value="10B">10B</option>
                                <option value="10C">10C</option>
                                <option value="10D">10D</option>
                                <option value="9A">9A</option>
                                <option value="9B">9B</option>
                                <option value="9C">9C</option>
                            </Form.Select>
                        </Form.Group>
                        <div className='text-center'>
                        <Button variant="primary"  style={{borderRadius:"0.2rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"2px"}}  className='leave-button text-center' onClick={leaveSubmit}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='map-container mt-5'>
                {letters.length > 0 ? (
                    <div className='map-section'>
                        <Table striped bordered variant='warning'>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Date</th>
                                    <th>Days Applied</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {letters.map((a, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(a.startdate).toLocaleDateString('en-GB')}</td>
                                        <td>{a.days}</td>
                                        <td>{a.reason}</td>
                                        <td style={{color:a.grant? 'green' : 'orange'}}>{a.grant ? "Approved" : "Pending"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center">You Haven't Submitted Any Leaveletters Yet..</p>
                )}
            </div>
        </Container>
    );
}
