import React, { useContext, useEffect, useState } from 'react';
import mycontext from '../Context/Context';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const DoctorHealthView = () => {
    const { baseURL } = useContext(mycontext);
    const [record, setRecord] = useState([]);
    console.log("record", record);

    useEffect(() => {
        ViewRecord();
    }, []);

    const ViewRecord = async () => {
        try {
            const response = await axios.get(`${baseURL}/Health/View`);
            console.log("response",response.data.message)
            const myStudents= response.data.message.filter((u)=> u.Finalreport==="NEEDS CONSULTATION")
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
                            <th>Age</th>
                            <th>Health Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.length !== 0 ? (
                            record.map((student, index) => (
                                <tr key={index}>
                                    <td>{student._id}</td>
                                    <td>{student.studentname}</td>
                                    <td>{student.batch}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <ul>
                                            <li><strong>Height:</strong> {student.height}</li>
                                            <li><strong>Weight:</strong> {student.weight}</li>
                                            <li><strong>Vision:</strong> {student.Vision}</li>
                                            <li><strong>Mental Health:</strong> {student.MentalHealth}</li>
                                            <li><strong>Immunization:</strong> {student.Immunization}</li>
                                            <li><strong>Hearing:</strong> {student.Hearing}</li>
                                            <li><strong>Nutrition Status:</strong> {student.NutritionStatus}</li>
                                            <li><strong>Physical Examination:</strong> {student.PhysicalExamination}</li>
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
