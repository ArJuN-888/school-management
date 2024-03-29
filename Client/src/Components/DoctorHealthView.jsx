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
        <div className='m-2'>
            <div className='heading'>
                <h2 style={{letterSpacing:"2px", fontFamily:'verdana' ,color:"brown" ,textDecoration:'underline'}}>Health Records of Students</h2>
            </div>

            <div className='table '>
                <Table striped bordered hover variant="blue" className='doc-map-ta fs-5' style={{letterSpacing:"2px"}}>
                    <thead>
                        <tr>
                            <th className='doc-map-head text-white bg-primary'>Health ID</th>
                            <th className='doc-map-head text-white bg-primary'>Student Name</th>
                            <th className='doc-map-head text-white bg-primary'>Batch</th>
                            <th className='doc-map-head text-white bg-primary'>Age</th>
                            <th className='doc-map-head text-white bg-primary'>Health Report</th>
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
                                            <li><strong>Height:</strong> {student.height} cm</li>
                                            <li><strong>Weight:</strong> {student.weight} kg</li>
                                            <li><strong>Vision:</strong> {student.Vision}</li>
                                            <li><strong>Mental Health:</strong> {student.MentalHealth}</li>
                                            <li><strong>Immunization:</strong> {student.Immunization}</li>
                                            <li><strong>Hearing:</strong> {student.Hearing}</li>
                                            <li><strong>Nutrition Status:</strong> {student.NutritionStatus}</li>
                                            <li><strong>Physical Examination:</strong> {student.PhysicalExamination}</li>
                                            {student.teacherreport &&<li><strong>Teacher Report</strong>   {student.teacherreport}</li>}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    <h3 className='text-center'>No Students Available</h3>
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
