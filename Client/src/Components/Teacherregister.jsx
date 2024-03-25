import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom';
import mycontext from '../Context/Context';
import { useContext } from 'react';
import StaffRegister from './StaffRegister';
import { FaCloudUploadAlt } from 'react-icons/fa';
export default function Register() {
  const { teacherregisterdata, setteacherRegisterdata } = useContext(mycontext);
  const [selectedfile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const handleChange = (key, value) => {
    setteacherRegisterdata({ ...teacherregisterdata, [key]: value });
  };

  const register = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedfile);

      // Append other form fields to the formData
      Object.keys(teacherregisterdata).forEach((key) => {
        formData.append(String(key), teacherregisterdata[key]);
      });
      const response = await axios.post("http://localhost:5000/Teacher/register", formData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const HandleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilename(file.name);
    }
  };
  return (
    <div className="mt-5">
      <div>
          <div className="mb-4 fs-8"><h1 className='text-center'>Teacher</h1></div>
          <Form>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Username:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={teacherregisterdata.username}
                            placeholder='Username...'
                            onChange={(e)=>handleChange("username",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Email Address:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={teacherregisterdata.email}
                            placeholder='Email...'
                            onChange={(e)=>handleChange("email",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Password:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={teacherregisterdata.password}
                            placeholder='Password...'
                            onChange={(e)=>handleChange("password",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Specialized In:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={teacherregisterdata.specialization}
                            placeholder='Specialization...'
                            onChange={(e)=>handleChange("specialization",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label column sm="2" >Your Batch:</Form.Label>
                        <Col sm="10">
                        <Form.Select    style={{letterSpacing:"2px"}}
                                className='fs-5 me-2'  onChange={(e)=>handleChange("batch",e.target.value)}>
                            <option value="" >Select Your Batch</option>
                            <option value="10A">10A</option>
                            <option value="10B">10B</option>
                            <option value="10C">10C</option>
                            <option value="10D">10D</option>
                            <option value="9A">9A</option>
                            <option value="9B">9B</option>
                            <option value="9C">9C</option>
                            <option value="9D">9D</option>
                            <option value="8A">8A</option>
                            <option value="8B">8B</option>
                            <option value="8C">8C</option>
                            <option value="8D">8D</option>

                        </Form.Select>
                        </Col>
                </Form.Group >
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Class Number:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={teacherregisterdata.batchnumber}
                            placeholder='Batch Number'
                            onChange={(e)=>handleChange("batchnumber",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Phone Number:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='number'
                            value={teacherregisterdata.phone}
                            placeholder='Enter Phone'
                            onChange={(e)=>handleChange("phone",e.target.value)}
                        />
                    </Col>
                </Form.Group>
            <Form.Group as={Row} className='mt-2'>
                    <Form.Label column sm="2" >Status:</Form.Label>
                        <Col sm="10">
                        <Form.Select    style={{letterSpacing:"2px"}}
                                className='fs-5 me-2'  onChange={(e)=>handleChange("status",e.target.value)}>
                            <option value="" >Status</option>
                            <option value="TEACHER">Class teacher</option>

                        </Form.Select>
                        </Col>
                </Form.Group >
            <div className='hover-grp'>
          <div className='text-center m-3' >
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
    
            </div>
            <div className="text-center">
              <Button variant="primary" onClick={register}>Register</Button>
            </div>
          </Form>
        <div className='text-center'>
          <h6><Link to='/SReg'>Staff Register</Link></h6>
        </div>
      </div>
    </div>
  )
}
