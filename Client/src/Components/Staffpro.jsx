import React, { useContext, useEffect, useState } from 'react';
import GetSID from './Hooks/GetstaffID';
import axios from 'axios';
import mycontext from '../Context/Context';
import GetStaffprofile from './Hooks/GetStaffproff';
import { FaPlus } from "react-icons/fa";
const Staffpro = () => {
    const { baseURL } = useContext(mycontext);
    const staffid = GetSID();
    const staffprofile = GetStaffprofile()
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
          alert(response.data.message);
        } catch (error) {
          
          alert( error.response.data.message);
        }
      };

    return (
        <div className="container">
            <h2>Profile</h2>
            <div className="img-contain">
              <img className="image" src={`${reqURL}/${staffprofile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {staff.length === 0 ? (
                        <div className="alert alert-info">No staff available</div>
                    ) : (
                        staff.map((data, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-body">
                                    <h3 className="card-title">{data.username}</h3>
                                    <p className="card-text">
                                        <strong>ID:</strong> {data._id}<br />
                                        <strong>Email:</strong> {data.email}<br />
                                        <strong>Batch:</strong> {data.batch}<br />
                                        <strong>Specialization:</strong> {data.specialization}<br />
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Staffpro;
