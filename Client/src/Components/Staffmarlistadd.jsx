import React, { useContext, useState,useEffect  } from 'react'
import axios from 'axios';
import GetSID from './Hooks/GetstaffID';
import GetSname from './Hooks/GetstaffName';
import Getstaffbatch from './Hooks/GetStaffbatch';
import mycontext from '../Context/Context';
import { Table ,Button} from 'react-bootstrap';
import {toast, Flip} from "react-toastify"


const Staffmarlistadd = () => {
    const { baseURL} = useContext(mycontext)
    const [loggedteacherStudents,setLoggedinTeacherStudents]=useState([])
    console.log('loggedin',loggedteacherStudents)
    const [batch,setBatch]=useState([])
    console.log("batches",batch)
    const teacherName = GetSname();
    const teacherID=GetSID()
   const teacherbatch=Getstaffbatch()
    console.log("teacherbatch",teacherbatch)
    console.log("techer",teacherID)
  const [showsub,setShowsub] = useState(false)

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


//    const Staff=async()=>{
//     try {
//         const response= await axios.get(`${baseURL}/Staff/find/getstaff/${teacherID}`)
//         console.log(response.data.staff)


//     } catch (error) {
//         console.log(error)
//     }
//    }

    const getStudents = async () => {
        try {
          const response = await axios.get(`${baseURL}/Parent/getallparent`);
      
          console.log("parentss",response.data.parent);
          setBatch(response.data.parent)
          const roll= batch.filter((u)=>u.batch===teacherbatch)
          console.log('roll',roll)
          setLoggedinTeacherStudents(roll)
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
      setShowsub(true)
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
            toast.success("Added Successfully",{transition:Flip});
            setToggle(0)
            setShowsub(false)
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

const Cancel = ()=>{
  setToggle(0)

}
  return (
    <div className='main fs-4' style={{letterSpacing:"4px"}}>
    <div className='heading'>
        <h3 className='mb-4 mt-4' style={{letterSpacing:"4px"}}>Welcome {teacherName} - You can add your student marklist here...</h3>



        <div className="table fs-4">
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
{loggedteacherStudents.length === 0 && <label style={{letterSpacing:"3px"}}>No student data available</label>} 
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
                   <label  htmlFor={`subject${index}`}>Subject {index + 1}:</label>
                   <input placeholder="Subject..." className='me-2' type="text" id={`subject${index}`} name={`subject${index}`} required value={mark.subject} onChange={(e) => handleMarkChange(index, "subject", e.target.value)} />
                   <input className='me-2' type="number" id={`scoredMark${index}`} name={`scoredMark${index}`} placeholder="Scored Mark..." required value={mark.scoredMark} onChange={(e) => handleMarkChange(index, "scoredMark", e.target.value)} />
                   <input type="number" id={`totalMark${index}`} name={`totalMark${index}`} placeholder="Total Mark..." required value={mark.totalMark} onChange={(e) => handleMarkChange(index, "totalMark", e.target.value)} />
               </div>
           ))}
           <Button type="button" variant='success' className='me-2 mt-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 4px 0px grey",borderRadius:"0.2rem"}} onClick={handleAddMark}>Add Mark</Button>
           {showsub &&<Button variant='primary' className='mt-2 me-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 4px 0px grey",borderRadius:"0.2rem"}}  type="submit">Submit</Button>}
       </form>
       {showsub &&<>
           
          <Button variant='danger' className='mt-2' style={{letterSpacing:"2px",boxShadow:"0px 0px 4px 0px grey",borderRadius:"0.2rem"}} onClick={()=>{Cancel()}} type="submit">Cancel</Button></> 
          } 
       <div id="message"></div>
   </div>} 
    </div>
</div>
  )
}

export default Staffmarlistadd