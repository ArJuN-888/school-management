import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import mycontext from '../Context/Context';
import { useContext } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import {Flip, toast} from "react-toastify"

export default function StaffRegister() {
  const [selectedfile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const { baseURL } = useContext(mycontext);
  const [staffObj, setStaffObj] = useState({
    username: "",
    email: "",
    status: "",
    password: "",
    batch: "",
    specialization: "",
    phone:""
  });

  const handleChange = (key, value) => {
    setStaffObj({ ...staffObj, [key]: value });
  };

  const register = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedfile);

      // Append other form fields to the formData
      Object.keys(staffObj).forEach((key) => {
        formData.append(String(key), staffObj[key]);
      });
      const response = await axios.post(`${baseURL}/Staff/register`, formData);
      setStaffObj({
        username: "",
        email: "",
        status: "",
        password: "",
        batch: "",
        specialization: "",
        phone:""
      })
      formData.delete("file")
      setSelectedFile(null)
      toast.success(response.data.message,{transition:Flip});
    } catch (error) {
      toast.error(error.response.data.message,{transition:Flip});
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
    <div>
      <Form className='fs-5 m-2' style={{letterSpacing:"2px"}}>
        <h2 className='ms-2 fs-4 mb-4 text-center' style={{letterSpacing:"4px",fontFamily:'verdana',color:'brown',textDecoration:'underline'}}>STAFF ACCOUNT CREATION</h2>
        {/* <FormGroup>
          <FormControl
            type='text'
            value={staffObj.username}
            placeholder='Username...'
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Username:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={staffObj.username}
                            placeholder='Username...'
                            onChange={(e)=>handleChange("username",e.target.value)}
                        />
                    </Col>
                </Form.Group>
        {/* <FormGroup>
          <FormControl
            type='text'
            value={staffObj.email}
            placeholder='Email...'
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Email:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={staffObj.email}
                            placeholder='Email...'
                            onChange={(e)=>handleChange("email",e.target.value)}
                        />
                    </Col>
                </Form.Group>
        {/* <FormGroup>
          <FormControl
            type='text'
            value={staffObj.phone}
            placeholder='phone...'
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Phone:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='number'
                            value={staffObj.phone}
                            placeholder='Phone Number...'
                            onChange={(e)=>handleChange("phone",e.target.value)}
                        />
                    </Col>
                </Form.Group>
        {/* <FormGroup>
          <FormControl
            type='password'
            value={staffObj.password}
            placeholder='Password...'
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Password:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={staffObj.password}
                            placeholder='Password...'
                            onChange={(e)=>handleChange("password",e.target.value)}
                        />
                    </Col>
                </Form.Group>
        {/* <FormGroup>
          <FormControl
            type='text'
            value={staffObj.specialization}
            placeholder='Specialized in...'
            onChange={(e) => handleChange("specialization", e.target.value)}
          />
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label  column sm="2"> Specialization:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            style={{letterSpacing:"2px"}}
                            className='fs-5'
                            type='text'
                            value={staffObj.specialization}
                            placeholder='Specialization...'
                            onChange={(e)=>handleChange("specialization",e.target.value)}
                        />
                    </Col>
                </Form.Group>

        {/* <FormGroup>
          <Form.Control as="select" onChange={(e) => handleChange("batch", e.target.value)}>
            <option value="select">Select your Batch</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="10C">10C</option>
            <option value="10D">10D</option>
          </Form.Control>
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label column sm="2" >Your Batch:</Form.Label>
                        <Col sm="10">
                        <Form.Select  value={staffObj.batch}   style={{letterSpacing:"2px"}}
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
        {/* <FormGroup>
          <Form.Select as="select" onChange={(e) => handleChange("status", e.target.value)}>
            <option value="Status">Status</option>
            <option value="Subject teacher">Subject teacher</option>
          </Form.Select>
        </FormGroup> */}
        <Form.Group as={Row} className='mt-2'>
                    <Form.Label column sm="2" >Status:</Form.Label>
                        <Col sm="10">
                        <Form.Select  value={staffObj.status}   style={{letterSpacing:"2px"}}
                                className='fs-5 me-2'  onChange={(e)=>handleChange("status",e.target.value)}>
                            <option value="" >Status</option>
                            <option value="Subject teacher">Subject teacher</option>

                        </Form.Select>
                        </Col>
                </Form.Group >
        <div className='text-center m-3'>
          <Form.Label  sm="2 " className='me-4'>Profile Photo : </Form.Label>
            <label htmlFor="fileUpload"  className='hover'>
              <FaCloudUploadAlt /> Upload File
              <input
                id="fileUpload"
                type='file'
                onChange={HandleFile}
                className='ipt'
              />
            </label>
          </div>
        <div className='text-center'>
        <Button variant="primary"  style={{borderRadius:"0.2rem",boxShadow:"0px 0px 4px 0px grey",letterSpacing:"2px"}}  onClick={register}>Register</Button>
        </div>
        <div>
          <p className='text-center'><Link className='fs-5'  to='/Tregister'>Teacher Register</Link></p>
        </div>
      </Form>
    </div>
  )
}
