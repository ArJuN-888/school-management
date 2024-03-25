import React, { useContext, useEffect, useState } from "react";
import GetTname from "./Hooks/Getteachername";
import GetTID from "./Hooks/Getteacherid";
import axios from "axios";
import mycontext from "../Context/Context";
import "./Styles/TP.css"
import { FaPlus, FaMinus} from "react-icons/fa";
import GetTprofile from "./Hooks/GetteacherProfile";
<<<<<<< HEAD
import { Button } from 'react-bootstrap';
=======
import {Flip, toast} from 'react-toastify'
>>>>>>> d0b41b77a7eff6489772504fe0e27d41c3761898
const TeacherProfile = () => {
  const { baseURL } = useContext(mycontext);
  const [teacher, setTeacher] = useState([]);
  const [reqURL,] = useState('http://localhost:5000/uploads');
  console.log("teachers", teacher);
  const [tog,setTog] = useState(false)
 const teacherProfile = GetTprofile()
  const teacherName = GetTname();
  const teacherID = GetTID();
  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    try {
      const response = await axios.get(`${baseURL}/Teacher/getallteachers`);
      console.log(response.data);

      const currentTeacher = response.data.teacher.filter(
        (u) => teacherID === u._id
      );

      setTeacher(currentTeacher);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }


    try {
      const formData = new FormData();
      formData.append("file", file); // Use the correct field name
      console.log("formdata",formData)
      const response = await axios.put(`${baseURL}/Teacher/editpic/${teacherID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Add this header
          },
        }
      );

      localStorage.setItem("teacherProfile", response.data.teacher.filename);
      getTeacher();
      toast.success(response.data.message,{transition:Flip});
    } catch (error) {
      
      toast.error( error.response.data.message,{transition:Flip});
    }
  };
  return (
    <div className="pdiv">
       <div className="img-contain mb-2">
              <img className="image" src={`${reqURL}/${teacherProfile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
      <div className="">
    
      {teacher.length === 0 ? (
                        <div className="alert alert-info">No Teacher available</div>
                    ) : (
                        teacher.map((data, index) => (
                            <div className="card border-0 fs-5" style={{boxShadow:"0px 0px 1px 0px",borderRadius:"0.2rem"}} key={index}>
                                <div className="card-body">
                                    <h3 className="card-title" style={{letterSpacing:"3px"}}>{data.username}</h3>
                                    <p className="card-text">
                                       <div style={{letterSpacing:"4px"}}>{data.email}</div> 
                                       <div className='mt-2'  ><Button style={{boxShadow:"0px 0px 5px 0px grey"}} onClick={()=>setTog(!tog)}>{tog ? <FaMinus/> : <FaPlus/>}</Button></div>
                                   {tog &&<><div style={{letterSpacing:"4px"}}>Batch - <b style={{letterSpacing:"1px"}}>{data.batch}</b></div>   
                                    <div style={{letterSpacing:"3px"}}>Subject - {data.specialization}</div>
                                    <div style={{letterSpacing:"3px"}}>Stat - {data.status}</div>
                                    </> }  
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
    </div>
    </div>
  );
};

export default TeacherProfile;
