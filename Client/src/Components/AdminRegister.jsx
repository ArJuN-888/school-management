import React, { useContext, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { toast, Flip } from 'react-toastify';
import axios from "axios";
import mycontext from '../Context/Context';

export default function AdminRegister() {
  const { baseURL } = useContext(mycontext);
  const [adminobj, setAdminobj] = useState({
    username: "",
    email: "",
    status: "",
    password: ""
  });
  const [selectedfile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [showpass, setShowpass] = useState(false);

  const handleChange = (key, value) => {
    setAdminobj({ ...adminobj, [key]: value });
  };

  const HandleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilename(file.name);
    }
  };

  const HandleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedfile);

      // Append other form fields to the formData
      Object.keys(adminobj).forEach((key) => {
        formData.append(String(key), adminobj[key]);
      });

      const response = await axios.post(`${baseURL}/Admin/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setFilename("");
      toast(response.data.message, { transition: Flip });
      setAdminobj({
        username: "",
        email: "",
        status: "",
        password: ""
      });
    } catch (error) {
      toast(error.response.data.message, { transition: Flip });
      console.log("error", error);
    }
  };

  return (
    <div className='login-parent'>
      <div className='login-frm'>
        <label className='login-title'>Admin Registration</label>
        <input
          value={adminobj.username}
          placeholder='Username...'
          type='text'
          className='ip1'
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          value={adminobj.email}
          placeholder='Email...'
          type='text'
          className='ip1'
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          value={adminobj.password}
          placeholder='Password...'
          type={showpass ? "text" : "password"}
          className='ip1'
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <div className='check-parent'>
          <label htmlFor="showPassword" style={{ color: "white" }}>Show Password</label>
          <input
            id="showPassword"
            className='checks'
            type='checkbox'
            onChange={() => setShowpass(!showpass)}
          />
        </div>
        <input
          value={adminobj.status}
          placeholder='Status...'
          className='ip1'
          onChange={(e) => handleChange("status", e.target.value)}
        />
        <div className='hover-grp'>
          <div>
            <label htmlFor="fileUpload" className='hover'>
              <FaCloudUploadAlt /> Upload File
              <input
                id="fileUpload"
                type='file'
                onChange={HandleFile}
                className='ipt'
              />
            </label>
          </div>
          <p className='nm'>{filename ? filename : "No file chosen..."}</p>
        </div>
        <button className='login-bt' onClick={HandleRegister}>Register</button>
      </div>
    </div>
  );
}
