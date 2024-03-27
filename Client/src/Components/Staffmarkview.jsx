
import React, { useContext, useEffect, useState } from 'react'
import GetSname from './Hooks/GetstaffName'
import GetSID from './Hooks/GetstaffID'
import Getstaffbatch from './Hooks/GetStaffbatch'
import mycontext from '../Context/Context'
import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { Button, Table } from 'react-bootstrap'
const Staffmarkview = () => {
    const teacherName=GetSname()
    const teacherID=GetSID()
    const teacherbatch=Getstaffbatch()
    const { baseURL, loggedteacherStudents, setLoggedinTeacherStudents} = useContext(mycontext)
    const [mark,setMark]=useState([])
const [stat,setStat] = useState("")
const [stname,setStname] = useState("")
    useEffect(() => {
        if (teacherID) {
          getStudents();
        }
      }, [teacherID]);

console.log("mark",mark);
const getStudents = async () => {
    try {
      const response = await axios.get(`${baseURL}/Parent/getallparent`);
  
      console.log("parentss",response.data.parent);
      console.log(response.data.parent)
      const roll= response.data.parent.filter((u)=>u.batch === teacherbatch)
      console.log('roll',roll)
      setLoggedinTeacherStudents(roll)
    } catch (error) {
      console.error("Error fetching students:", error);
      // Handle error gracefully, display an error message to the user, or retry fetching.
    }
  };

      const handleview = async (studentid,sname) => {
        try {
          const response = await axios.get(
            `${baseURL}/marksheetadd/list/${studentid}`
          );
          console.log(response.data.message);
          console.log("id of student", studentid);
          if (response.data.message.length === 0) {
            setStname("")
            setStat("No data available...")
            setMark([])
          } else {
            setStname(sname)
            setMark(response.data.message);
            setStat("")
          }
        } catch (error) {
          console.log(error);
        }
      };
      
        const calculatePercentage = (marks) => {
        const totalScoredMarks = marks.reduce((acc, curr) => acc + curr.scoredMark, 0);
        const totalPossibleMarks = marks.reduce((acc, curr) => acc + curr.totalMark, 0);
        const percentage = (totalScoredMarks / totalPossibleMarks) * 100;
        return percentage.toFixed(2); // Round to two decimal places
      };
      const Close= () =>{
        setMark([])
      }
  return (
   <div className='m-2 ' style={{letterSpacing:"3px"}}>
      <div className="heading">
        <h3 className='fs-3'> hello {teacherName}... This is your Students Marklist </h3>
      </div>
      <div className="table fs-4 ">
        <Table className=' text-center' responsive cstriped bordered hover variant="white">
       {loggedteacherStudents.length !==0 && <thead>
            <tr>
              <th className='bg-primary text-white '>Roll no</th>
              <th className='bg-primary text-white '>StudentName</th>
              <th className='bg-primary text-white '>View marksheet</th>
            </tr>
          </thead>}
         
          <tbody>
            {loggedteacherStudents.length > 0 && (
              loggedteacherStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollno}</td>
                  <td>{student.studentname}</td>
                  <td style={{cursor:"pointer"}} onClick={() => handleview(student._id,student.studentname)}><FaEye fontSize="24px"/></td>
                </tr>
              ))
            )} 
               
              
            
          </tbody>
        </Table >
        <div className='text-center'>
        {loggedteacherStudents.length === 0 && <label className='fs-5'>Mark-list is not initiated... </label>} 
        </div>
        <div className="">
        {mark.length!==0 &&<h3 className='mt-4 mb-4' style={{letterSpacing:"3px"}}>{`Marklist history of ${stname} `}...</h3>}
         <Table className='fs-5 ' responsive cstriped bordered hover variant="white">
         {mark.length !==0 &&  <thead>
    
              <tr className='text-center'>
                <th className='bg-primary text-white '>studentid</th>
                <th className='bg-primary text-white '>Examination Name</th>
                <th className='bg-primary text-white '>Mark</th>
                <th className='bg-primary text-white '>persentage</th>
                <th className='bg-primary text-white '>Result</th>
              </tr>
              
            </thead>
            }
            <tbody>
              {mark.length > 0 ? (
                mark.map((data, index) => (
                  <tr key={index}>
                    <td>{data.studentid}</td>
                    <td>{data.examname}</td>
                    <td>
                      <Table className='fs-5'  cstriped bordered hover variant="white">
                        <thead>
                          <tr>
                            <th className='bg-primary text-white '>Subject</th>
                            <th className='bg-primary text-white '>Scored Mark</th>
                            <th className='bg-primary text-white '>Total Mark</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.marks.map((mark, i) => (
                            <tr key={i}>
                              <td>{mark.subject}</td>
                              <td>{mark.scoredMark}</td>
                              <td>{mark.totalMark}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>  
                    </td>
                    <td>{calculatePercentage(data.marks)}%</td> {/* Display percentage */}
                    <td style={{color:calculatePercentage (data.marks) > 20 ?"green":"red"}}> {calculatePercentage (data.marks) > 20 ? (
                      <div>passed</div>
                    ):(
                   <div>fail</div>
                    )}</td>
                  </tr>
                ))
              ) : (
                null
              )}
            </tbody>
          </Table>
          {mark.length!==0 &&<button className='mt-1 ' style={{border:"none",backgroundColor:"red",
        
        boxShadow:"0px 0px 5px 0px",
        float:"inline-end"
        }} onClick={Close}><IoMdClose style={{fontSize:"40px",backgroundColor:"transparent",color:"white"}}/></button>}
          <h3 className='mt-5 fs-2 text-center' style={{letterSpacing:"3px"}}>{stat}</h3>
          </div>
          </div>
          </div>
  )
}

export default Staffmarkview