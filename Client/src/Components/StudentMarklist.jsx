import React, { useState, useContext } from 'react';
import GetTname from './Hooks/Getteachername';
import mycontext from '../Context/Context';
import axios from "axios";
const StudentMarklist = () => {
    const { baseURL } = useContext(mycontext);
    const teacherName = GetTname();

    const [data, setData] = useState({
        studentid: "",
        name: "",
        examname: "",
        marks: [] // Initialize marks as an empty array
    });

    const handleonChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleAddMark = () => {
        setData({
            ...data,
            marks: [
                ...data.marks,
                { subject: "", scoredMark: "", totalMark: "" }
            ]
        });
    };

    const handleMarkChange = (index, field, value) => {
        const updatedMarks = [...data.marks];
        updatedMarks[index][field] = value;
        setData({ ...data, marks: updatedMarks });
    };

    const addmarklist = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/marksheetadd`, data);
            console.log(response.data);
            alert("Added Successfully");
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
        <div className='main'>
            <div className='heading'>
                <h3>Welcome {teacherName} - Add Marklist of Each Student</h3>

                <div className="container">
                    <h2>Add Student Marks</h2>
                    <form id="markForm" onSubmit={addmarklist}>
                        <div className="form-group">
                            <label htmlFor="studentid">Student ID:</label>
                            <input type="text" id="studentid" name="studentid" required onChange={handleonChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required onChange={handleonChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Examname:</label>
                            <input type="text" id="examname" name="examname" required onChange={handleonChange} />
                        </div>
                        {data.marks.map((mark, index) => (
                            <div className="subject-group" key={index}>
                                <label htmlFor={`subject${index}`}>Subject {index + 1}:</label>
                                <input type="text" id={`subject${index}`} name={`subject${index}`} required value={mark.subject} onChange={(e) => handleMarkChange(index, "subject", e.target.value)} />
                                <input type="number" id={`scoredMark${index}`} name={`scoredMark${index}`} placeholder="Scored Mark" required value={mark.scoredMark} onChange={(e) => handleMarkChange(index, "scoredMark", e.target.value)} />
                                <input type="number" id={`totalMark${index}`} name={`totalMark${index}`} placeholder="Total Mark" required value={mark.totalMark} onChange={(e) => handleMarkChange(index, "totalMark", e.target.value)} />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddMark}>Add Mark</button>
                        <button type="submit">Submit</button>
                 
                    </form>
                    <div id="message"></div>
                </div>
            </div>
        </div>
    );
}

export default StudentMarklist;
