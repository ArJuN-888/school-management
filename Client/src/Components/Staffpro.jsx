import React, { useContext, useEffect, useState } from 'react';
import GetSID from './Hooks/GetstaffID';
import axios from 'axios';
import mycontext from '../Context/Context';
import GetStaffprofile from './Hooks/GetStaffproff';

import { FaPlus,FaMinus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import {Flip, toast} from "react-toastify"
const Staffpro = () => {
    const { baseURL } = useContext(mycontext);
    const staffid = GetSID();
    const staffprofile = GetStaffprofile()
    const [tog,setTog] = useState(false)
    const [staff, setStaff] = useState([]);
    const [reqURL,] = useState('http://localhost:5000/uploads');
    useEffect(() => {
        getallStaff();
    }, []);

    const getallStaff = async () => {
        try {
            const response = await axios.get(`${baseURL}/Staff/getstaff`);
            console.log(response.data.staff);
            const logedinStaff = response.data.staff.filter((u) => u._id === staffid);
            setStaff(logedinStaff);
        } catch (error) {
            // Handle error
            console.error('Error fetching staff data:', error);
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
          const response = await axios.put(`${baseURL}/Staff/editpic/${staffid}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Add this header
              },
            }
          );
    
          localStorage.setItem("staffProfile", response.data.staff.filename);
          getallStaff();
          toast.success(response.data.message,{transition:Flip});
        } catch (error) {
          
          toast.error( error.response.data.message,{transition:Flip});
        }
      };

    return (
        <div className="pdiv" >
          
            <div className="img-contain mb-2">
              <img className="image" src={`${reqURL}/${staffprofile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
            
                <div className="">
                    {staff.length === 0 ? (
                        <div className="alert alert-info">No staff available</div>
                    ) : (
                        staff.map((data, index) => (
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

export default Staffpro;
