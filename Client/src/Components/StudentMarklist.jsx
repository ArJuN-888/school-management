import React, { useState, useContext } from 'react'
import GetTname from './Hooks/Getteachername'
import mycontext from '../Context/Context';
import axios from "axios"
const StudentMarklist = () => {
    const { baseURL} = useContext(mycontext);
    const teacherName=GetTname()
    const [data, setData] = useState({
        studentid: "",
        name: "",
        examname:"",
        subject1: "",
        scoredMark1: "",
        totalMark1: "",
        subject2: "",
        scoredMark2: "",
        totalMark2: "",
        subject3: "",
        scoredMark3: "",
        totalMark3: "",
        subject4: "",
        scoredMark4: "",
        totalMark4: "",
        subject5: "",
        scoredmark5: "",
        totalMark5: "",
        subject6: "",
        scoredMark6: "",
        totalMark6: "",
        subject7: "",
        scoredMark7: "",
        totalMark7: "",
        subject8: "",
        scoredMark8: "",
        totalMark8: "",
        subject9: "",
        scoredMark9: "",
        totalMark9: "",
        subject10: "",
        scoredMark10: "",
        totalMark10: ""
    });

    const handleonChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const addmarklist = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(`${baseURL}/marksheetadd`, {
                studentid: data.studentid,
                name: data.name,
                examname:data.examname,
                marks: [
                    { subject: data.subject1, scoredMark: data.scoredMark1, totalMark: data.totalMark1 },
                    { subject: data.subject2, scoredMark: data.scoredMark2, totalMark: data.totalMark2 },
                    { subject: data.subject3, scoredMark: data.scoredMark3, totalMark: data.totalMark3 },
                    { subject: data.subject4, scoredMark: data.scoredMark4, totalMark: data.totalMark4 },
                    { subject: data.subject5, scoredMark: data.scoredMark5, totalMark: data.totalMark5 },
                    { subject: data.subject6, scoredMark: data.scoredMark6, totalMark: data.totalMark6 },
                    { subject: data.subject7, scoredMark: data.scoredMark7, totalMark: data.totalMark7 },
                    { subject: data.subject8, scoredMark: data.scoredMark8, totalMark: data.totalMark8 },
                    { subject: data.subject9, scoredMark: data.scoredMark9, totalMark: data.totalMark9 },
                    { subject: data.subject10, scoredMark: data.scoredMark10, totalMark: data.totalMark10 },
                    
                ],
            });
            console.log(response.data);
            alert("Added SucessFully")
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
                    <input type="text" id="studentid" name="studentid" required onChange={handleonChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required onChange={handleonChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Examname:</label>
                    <input type="text" id="examname" name="examname" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject1">Subject 1:</label>
                    <input type="text" id="subject1" name="subject1" required onChange={handleonChange}/>
                    <input type="number" id="scoredMark1" name="scoredMark1" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark1" name="totalMark1" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject2">Subject 2:</label>
                    <input type="text" id="subject2" name="subject2"   onChange={handleonChange}/>
                    <input type="number" id="scoredMark2" name="scoredMark2" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark2" name="totalMark2" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject3">Subject 3:</label>
                    <input type="text" id="subject3" name="subject3"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark3" name="scoredMark3" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark3" name="totalMark3" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject4">Subject 4:</label>
                    <input type="text" id="subject4" name="subject4"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark4" name="scoredMark4" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark4" name="totalMark4" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject5">Subject 5:</label>
                    <input type="text" id="subject5" name="subject5"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark5" name="scoredMark5" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark5" name="totalMark5" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject6">Subject 6:</label>
                    <input type="text" id="subject6" name="subject6"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark6" name="scoredMark6" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark6" name="totalMark6" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject7">Subject 7:</label>
                    <input type="text" id="subject7" name="subject7"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark7" name="scoredMark7" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark7" name="totalMark7" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject8">Subject 8:</label>
                    <input type="text" id="subject8" name="subject8"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark8" name="scoredMark8" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark8" name="totalMark8" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject9">Subject 9:</label>
                    <input type="text" id="subject9" name="subject9"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark9" name="scoredMark9" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark9" name="totalMark9" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <div className="subject-group">
                    <label htmlFor="subject10">Subject 10:</label>
                    <input type="text" id="subject10" name="subject10"  onChange={handleonChange}/>
                    <input type="number" id="scoredMark10" name="scoredMark10" placeholder="Scored Mark" required onChange={handleonChange}/>
                    <input type="number" id="totalMark10" name="totalMark10" placeholder="Total Mark" required onChange={handleonChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div id="message"></div>
        </div>
    </div>
</div>

  )
}

export default StudentMarklist