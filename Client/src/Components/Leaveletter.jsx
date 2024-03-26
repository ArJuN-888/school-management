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
        <Container className='leave-container'>
            <div className='leave-section'>
                <h1 className='leave-head'>Leave Letter</h1>
                <div className='leave-input-section'>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='text'
                                placeholder='Student Name'
                                value={sname}
                                onChange={(e) => setSname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='number'
                                placeholder='Student Rollno.'
                                value={rollno}
                                onChange={(e) => setRollno(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='number'
                                placeholder='Days'
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='date'
                                placeholder='Starting Date'
                                value={sdate}
                                onChange={(e) => setSdate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='text'
                                placeholder='Reason'
                                value={reason}
                                onChange={(e) => SetReason(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                className='leave-input'
                                type='text'
                                placeholder='Batch'
                                value={sclass}
                                onChange={(e) => setSclass(e.target.value)}
                            />
                        </Form.Group>
                        <div className='text-center'>
                        <Button className='leave-button text-center' onClick={leaveSubmit}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='map-container mt-5'>
                {letters.length > 0 ? (
                    <div className='map-section'>
                        <Table striped bordered>
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
                                        <td>{a.startdate}</td>
                                        <td>{a.days}</td>
                                        <td>{a.reason}</td>
                                        <td>{a.grant ? "Approved" : "Pending"}</td>
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
