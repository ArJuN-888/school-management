import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../Context/Context';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const DoctorHealthView = () => {
    const { baseURL } = useContext(mycontext);
    const [record, setRecord] = useState([]);
    console.log("mystudents",record)

    useEffect(() => {
        ViewRecord();
    }, []);

    const ViewRecord = async () => {
        try {
            const response = await axios.get(`${baseURL}/Health/View`);
            const myStudents = response.data.message.filter((u) => u.Finalreport === "NEDD CONSULTATION");
            setRecord(myStudents);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    return (
        <div>
            <div className='heading'>
                <h3>Health Records of students</h3>
            </div>

            <div className='table'>
                <Table>
                    <thead>
                        <tr>
                            <th>Student-id</th>
                            <th>Student Name</th>
                            <th>Batch</th>
                            <th>Health report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.length !== 0 ? (
                            record.map((data, index) => (
                                <tr key={index}>
                                    <td>{data._id}</td>
                                    <td>{data.studentname}</td>
                                    <td>{data.batch}</td>
                                    <td> vision:{data.Vision}, Mentelhealth:{data.MentalHealth},Immunization:{data.Immunization},Hearing:{data.Hearing},NutritionStatus:{data.NutritionStatus},PhysicalExamination:{data.PhysicalExamination}</td>
                                </tr>
                                
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    <h3>No students available</h3>
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
