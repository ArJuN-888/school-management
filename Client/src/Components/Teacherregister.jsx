import React, { useState } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import mycontext from '../Context/Context';
import { useContext } from 'react';
import StaffRegister from './StaffRegister';

export default function Register() {
  const { teacherregisterdata, setteacherRegisterdata } = useContext(mycontext);

  const handleChange = (key, value) => {
    setteacherRegisterdata({ ...teacherregisterdata, [key]: value });
  };

  const register = async () => {
    try {
      const response = await axios.post("http://localhost:5000/Teacher/register", teacherregisterdata);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <div className="mb-4 fs-5">Teacher</div>
          <Form>
            <FormGroup controlId="formBasicUsername">
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                value={teacherregisterdata.username}
                placeholder="Enter username"
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormControl
                type="email"
                value={teacherregisterdata.email}
                placeholder="Enter email"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={teacherregisterdata.password}
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicSpecialization">
              <FormLabel>Specialized in</FormLabel>
              <FormControl
                type="text"
                value={teacherregisterdata.specialization}
                placeholder="Specialized in"
                onChange={(e) => handleChange("specialization", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicBatch">
              <FormLabel>Select your Batch</FormLabel>
              <Form.Select as="select" onChange={(e) => handleChange("batch", e.target.value)}>
                <option value="select">Select your Batch</option>
                <option value="10A">10A</option>
                <option value="10B">10B</option>
                <option value="10C">10C</option>
              </Form.Select>
            </FormGroup>
            <FormGroup controlId="formBasicBatchNumber">
              <FormLabel>Class Number</FormLabel>
              <FormControl
                type="text"
                value={teacherregisterdata.batchnumber}
                placeholder="Batch Number"
                onChange={(e) => handleChange("batchnumber", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicPhone">
              <FormLabel>Phone</FormLabel>
              <FormControl
                type="number"
                value={teacherregisterdata.phone}
                placeholder="Enter phone"
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="formBasicStatus">
              <FormLabel>Status</FormLabel>
              <Form.Select as="select" onChange={(e) => handleChange("status", e.target.value)}>
                <option value="Status">Status</option>
                <option value="Class teacher">Class teacher</option>
              </Form.Select>
            </FormGroup>
            <div className="text-center">
              <Button variant="primary" onClick={register}>Register</Button>
            </div>
          </Form>
        </Col>
        <Col md={6}>
          <div className="mb-4 fs-5">Staff</div>
          <StaffRegister />
        </Col>
      </Row>
    </Container>
  )
}
