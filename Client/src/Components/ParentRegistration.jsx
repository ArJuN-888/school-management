import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import mycontext from '../Context/Context';
import GetTID from './Hooks/Getteacherid';
import GetTname from './Hooks/Getteachername';

export default function ParentRegistration() {
  const { baseURL } = useContext(mycontext);
  const [batchnumber, setBatchNumber] = useState("");
  const teacherID = GetTID();
  const teacherName = GetTname();
  const [Parentregister, setparentRegister] = useState({
    studentname: "",
    parentname: "",
    email: "",
    batch: "",
    password: "",
    parentphone: "",
    address: "",
    status: "",
    rollno: "",
  });

  console.log("field",ParentRegistration)

  const handleChange = (key, value) => {
    setparentRegister({ ...Parentregister, [key]: value });
  };

  useEffect(() => {
    getteachers();
  }, [teacherID]);

  const getteachers = async () => {
    try {
      const response = await axios.get(`${baseURL}/Teacher/find/${teacherID}`);
      setBatchNumber(response.data.user.batchnumber);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseURL}/Parent/register`, Parentregister, {
        params: {
          teacherid: teacherID,
          batchn: batchnumber
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <input
            value={Parentregister.rollno}
            className="form-control"
            placeholder='Rollno...'
            onChange={(e) => handleChange("rollno", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={Parentregister.studentname}
            className="form-control"
            placeholder='Student Name...'
            onChange={(e) => handleChange("studentname", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={Parentregister.parentname}
            className="form-control"
            placeholder='Parent Name...'
            onChange={(e) => handleChange("parentname", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={Parentregister.email}
            className="form-control"
            placeholder='Email...'
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={(e) => handleChange("batch", e.target.value)}>
            <option value="Select a Batch">Select a Batch</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="10C">10C</option>
            <option value="10D">10D</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
            <option value="9C">9C</option>
            <option value="9D">9D</option>
            <option value="8A">8A</option>
          </select>
        </div>
        <div className="form-group">
          <input
            value={Parentregister.password}
            className="form-control"
            placeholder='Password...'
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={Parentregister.parentphone}
            className="form-control"
            placeholder='Parent Phone...'
            type='number'
            onChange={(e) => handleChange("parentphone", e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            value={Parentregister.address}
            className="form-control"
            placeholder='Student Address...'
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div className="form-group">
          <select className="form-control" onChange={(e) => handleChange("status", e.target.value)}>
            <option value="status">Status</option>
            <option value="MOTHER">Mother</option>
            <option value="FATHER">Father</option>
            <option value="BROTHER">Brother</option>
            <option value="SISTER">Sister</option>
            <option value="GRANDFATHER">Grandfather</option>
            <option value="GRANDMOTHER">Grandmother</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}
