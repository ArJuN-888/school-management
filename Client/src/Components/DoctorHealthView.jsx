import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../Context/Context';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const DoctorHealthView = () => {
    const { baseURL } = useContext(mycontext);
    const [record, setRecord] = useState([]);

    useEffect(() => {
        ViewRecord();
    }, []);

    const ViewRecord = async () => {
        try {
            const response = await axios.get(`${baseURL}/Health/View`);
            const myStudents = response.data.message.filter((u) => u.Finalreport === "NEED CONSULTATION");
            setRecord(myStudents);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    return (
        <div>
            <div className='heading'>
                <h3>Health Records of Students</h3>
            </div>

            <div className='table'>
                <Table striped bordered hover variant="blue">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Batch</th>
                            <th>Health Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.length !== 0 ? (
                            record.map((data, index) => (
                                <tr key={index}>
                                    <td>{data._id}</td>
                                    <td>{data.studentname}</td>
                                    <td>{data.batch}</td>
                                    <td> 
                                        <ul>
                                            <li><strong>Vision:</strong> {data.Vision}</li>
                                            <li><strong>Mental Health:</strong> {data.MentalHealth}</li>
                                            <li><strong>Immunization:</strong> {data.Immunization}</li>
                                            <li><strong>Hearing:</strong> {data.Hearing}</li>
                                            <li><strong>Nutrition Status:</strong> {data.NutritionStatus}</li>
                                            <li><strong>Physical Examination:</strong> {data.PhysicalExamination}</li>
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    <h3>No Students Available</h3>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default DoctorHealthView;
