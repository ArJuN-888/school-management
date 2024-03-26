import React, { useContext, useEffect, useState } from 'react'
import GetTID from './Hooks/Getteacherid'
import GetTname from './Hooks/Getteachername'
import mycontext from '../Context/Context'
import axios from 'axios'
import { Table} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Tooltip from 'react-bootstrap/Tooltip';
const AttendenceViewing = () => {
    const teacherID=GetTID()
    const teacherName= GetTname()
    const {baseURL,loggedteacherStudents ,setLoggedinTeacherStudents}=useContext(mycontext)
    const [attendence,setAttendence]=useState([])
    const [stname,setStname] = useState("")
    const [stat,setstat] = useState("")
    console.log("attendence",attendence)
console.log("stat",stat)
    useEffect(()=>{
        getStudents()
    },[teacherID])

   // Getting all Students Data
    const getStudents = async () => {
        const response = await axios.get(`${baseURL}/Parent/getallparent`,{
          params:{
            teacherid:teacherID
          }
        });
        console.log("all Students", response.data.parent);
        setLoggedinTeacherStudents(response.data.parent)
      };

      //to access Student attendence 
      const viewAttendence = async (studentid,sname) => {
        try {
          const response = await axios.get(`${baseURL}/attendence/record/${studentid}`);
          console.log("dsjgjhgn",response.data.message);
          console.log("id of student", studentid);
    
          if (response.data.message.length === 0) {
            setstat("No Records Available...");
            setAttendence([])
          } else {
            setStname(sname)
            setAttendence(response.data.message);
            setstat("")
          }
        } catch (error) {
          console.log(error);
        }
      };
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            View Attendence tab
        </Tooltip>
    );
    const Close= () =>{
      setAttendence([])
    }
  return (
    <div className='m-2 ' style={{letterSpacing:"3px"}}>
        <div className='heading'>
           <h2>You Can view Student's Attendence Here</h2>
        </div>
        <div className='table fs-4 '>
        <Table responsive cstriped bordered hover variant="white" className='text-center'>
          {loggedteacherStudents.length !== 0 &&<thead style={{letterSpacing:"4px"}} >
            <tr>
            <th className="bg-primary text-white ">SL no</th>
              <th className='bg-primary text-white ' >ADM no</th>
              <th className='bg-primary text-white' >Student Name</th>
              <th className='bg-primary text-white'>Status</th>
            </tr>
          </thead>}
          <tbody>

          {loggedteacherStudents.length > 0 && (
              loggedteacherStudents.map((student, index) => (
             
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{student.rollno}</td>
                  <td>{student.studentname}</td>
                  <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                  <td onClick={() => viewAttendence(student._id,student.studentname)} style={{cursor:"pointer"}}><FaEye fontSize="24px"/></td>
                  </OverlayTrigger>
                </tr>
              
              ))
            )} 
            
            
          </tbody>
          <div className='text-center'>
               {loggedteacherStudents.length === 0 && <label>No student data available</label>} 
              </div>
          </Table>
          <div className='mt-5 '>
          {attendence.length > 0 ? (
            
            <Table className='mt-6  ' responsive cstriped bordered hover variant="white">
              <thead style={{letterSpacing:"4px"}} >
              <h3 className='mb-4'>{`Attendence History of ${stname}`}</h3>
                <tr>
                  <th className='bg-primary text-white '>SL no</th>
                  <th className='bg-primary text-white '>Date</th>
                  <th className='bg-primary text-white '>status</th>
                </tr>
              </thead>
              <tbody>
                {attendence.map((record, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{record.date}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
          null
          )}
        <h1 className='fs-2' style={{letterSpacing:"3px"}}>{stat}</h1>
        {attendence.length!==0 &&<button className='mt-1 ' style={{border:"none",backgroundColor:"red",
        
        boxShadow:"0px 0px 5px 0px",
        float:"inline-end"
        }} onClick={Close}><IoMdClose style={{fontSize:"40px",backgroundColor:"transparent",color:"white"}}/></button>}
          </div>
            
        </div>

    </div>
  )
}

export default AttendenceViewing