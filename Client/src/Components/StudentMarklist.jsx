import React, { useState, useContext, useEffect } from 'react';
import GetTname from './Hooks/Getteachername';
import GetTID from './Hooks/Getteacherid';
import mycontext from '../Context/Context';
import axios from "axios";

import { Table ,Button} from 'react-bootstrap';


const StudentMarklist = () => {
    const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents } = useContext(mycontext);
    console.log("students",loggedteacherStudents)
    const teacherName = GetTname();
    const teacherID=GetTID()
  

    const [toggle,setToggle]=useState(0)
    const [studentroll,setStudentRoll]=useState("")
    console.log("studentid",studentroll)
    const [data, setData] = useState({
        studentid: studentroll,
        examname: "",
        marks: [] // Initialize marks as an empty array
    });

  useEffect(()=>{
    getStudents()
  },[teacherID])


    const getStudents = async () => {
        try {
          const response = await axios.get(`${baseURL}/Parent/getallparent`, {
            params: {
              teacherid: teacherID,
            },
          });
        //   const studentwithStatus = response.data.parent.map((student) => ({
        //     ...student,
        //     status: "",
        //   }));
          setLoggedinTeacherStudents(response.data.parent);
        } catch (error) {
          console.error("Error fetching students:", error);
          // Handle error gracefully, display an error message to the user, or retry fetching.
        }
      };



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

     
    const handletoggle=(students)=>{
       setToggle(1)
       setData({
        studentid: students._id,
        examname: "",
        marks: [] // Initialize marks as an empty array
    })
    }


    return (
        <div className='main'>
            <div className='heading'>
                <h3>Welcome {teacherName} - Add Marklist of Each Student</h3>



                <div className="table fs-5">
        <Table responsive striped hover variant="white">
         {loggedteacherStudents.length !==0 && <thead style={{ letterSpacing: "4px" }}>
            <tr>
              <th className="bg-primary text-white ">Roll no</th>
              <th className="bg-primary text-white ">Student Name</th>
              <th className="bg-primary text-white ">Action</th>
            </tr>
          </thead>}
          <tbody>
            {loggedteacherStudents.length > 0 && (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollno}</td>
                  <td>{student.studentname}</td>
                  <td>
                    <Button
                      style={{
                        borderRadius: "0.2rem",
                        boxShadow: "0px 0px 5px 0px grey",
                        letterSpacing: "2px",
                      }}
                    onClick={()=>handletoggle(student)} >
                      Add Mark
                    </Button>
                  </td>
                </tr>
              ))
            )} 
           
            
          </tbody>
        </Table>
        {loggedteacherStudents.length === 0 && <label>No student data available</label>} 
      </div>

               {toggle===1  && 
               <div className="container">
               {/* <h2>Add Student Marks</h2> */}
               <form id="markForm" onSubmit={addmarklist}>
                   {/* <div className="form-group">
                       <label htmlFor="studentid">Student ID:</label>
                       <input type="text" id="studentid" name="studentid" required onChange={handleonChange} />
                   </div> */}
                   {/* <div className="form-group">
                       <label htmlFor="name">Name:</label>
                       <input type="text" id="name" name="name" required onChange={handleonChange} />
                   </div> */}
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
           </div>} 
            </div>
        </div>
    );
}

export default StudentMarklist;
