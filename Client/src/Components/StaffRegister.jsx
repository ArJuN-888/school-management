import React, { useState } from 'react';
import axios from "axios";
import mycontext from '../Context/Context';
import { useContext } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

export default function StaffRegister() {
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
      const response = await axios.post(`${baseURL}/Staff/register`, staffObj);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Form>
        <FormLabel>Staff Account Creation</FormLabel>
        <FormGroup>
          <FormControl
            type='text'
            value={staffObj.username}
            placeholder='Username...'
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='text'
            value={staffObj.email}
            placeholder='Email...'
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='text'
            value={staffObj.phone}
            placeholder='phone...'
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='password'
            value={staffObj.password}
            placeholder='Password...'
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type='text'
            value={staffObj.specialization}
            placeholder='Specialized in...'
            onChange={(e) => handleChange("specialization", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control as="select" onChange={(e) => handleChange("batch", e.target.value)}>
            <option value="select">Select your Batch</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="10C">10C</option>
            <option value="10D">10D</option>
          </Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Select as="select" onChange={(e) => handleChange("status", e.target.value)}>
            <option value="Status">Status</option>
            <option value="Subject teacher">Subject teacher</option>
          </Form.Select>
        </FormGroup>
        <Button variant="primary" onClick={register}>Register</Button>
      </Form>
    </div>
  )
}
