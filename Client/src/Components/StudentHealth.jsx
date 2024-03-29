import React, { useContext, useState } from "react";
import mycontext from "../Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import {Flip, toast} from "react-toastify"

const StudentHealth = () => {
  const { baseURL } = useContext(mycontext);
  const [health, setHealth] = useState([]);
  console.log("health", health);
  const [data, setData] = useState({
    studentid: "",
    studentname: "",
    batch: "",
    age: "",
    height: "",
    weight: "",
    Immunization: "",
    Vision: "",
    Hearing: "",
    PhysicalExamination: "",
    NutritionStatus: "",
    MentalHealth: "",
    teacherreport:"",
    Finalreport: "",
  });

  console.log("data", data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/Health/Add`, data);
      setHealth(response.data.message);
      toast.success(response.data.message,{transition:Flip});
    } catch (error) {
      toast.error(error.response.data.message,{transition:Flip});
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{fontFamily:"verdana",textDecoration:'underline'}}>Record Health of Students</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="studentid">
              <Form.Label> Health ID</Form.Label>
              <Form.Control
                type="text"
                name="studentid"
                placeholder="Enter Health ID"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="studentname">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="studentname"
                placeholder="Enter Student Name"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="batch">
              <Form.Label>Student Batch</Form.Label>
              <Form.Select name="batch" onChange={handleChange}>
                <option value="">Select Batch</option>
                <option value="10A">10A</option>
                <option value="10B">10B</option>
                <option value="10C">10C</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter Student Age"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="height">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                name="height"
                placeholder="Enter Height"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                placeholder="Enter Weight"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="Immunization">
              <Form.Label>Immunization (Latest)</Form.Label>
              <Form.Select
                type="text"
                name="Immunization"
                placeholder="Enter Immunization Status"
                onChange={handleChange}
              >
                <option value="">Status</option>
                <option value="TD(10 yrs)">TD(10 yrs)</option>
                <option value="TD(16 yrs)">TD(16 yrs)</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="Vision">
              <Form.Label>Vision</Form.Label>
              <Form.Control
                type="text"
                name="Vision"
                placeholder="Enter Vision Status"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="Hearing">
              <Form.Label>Hearing</Form.Label>
              <Form.Control
                type="text"
                name="Hearing"
                placeholder="Enter Hearing Status"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="PhysicalExamination">
              <Form.Label>Physical Examination</Form.Label>
              <Form.Control
                type="text"
                name="PhysicalExamination"
                placeholder="Enter Physical Examination Status"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="NutritionStatus">
              <Form.Label>Nutrition Status</Form.Label>
              <Form.Control
                type="text"
                name="NutritionStatus"
                placeholder="Enter Nutrition Status"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="MentalHealth">
              <Form.Label>Mental Health</Form.Label>
              <Form.Control
                type="text"
                name="MentalHealth"
                placeholder="Enter Mental Health Status"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="teacherreport">
              <Form.Label>Teacherreport</Form.Label>
              <Form.Control
                type="text"
                name="teacherreport"
                placeholder="Teacherreport"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Finalreport">
              <Form.Label>Final Report</Form.Label>
              <Form.Select name="Finalreport" onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="HEALTHY">Healthy</option>
                <option value="NEEDS CONSULTATION">Needs Consultation</option>
              </Form.Select>
            </Form.Group>
          </Col>
          </Row>
                <div className="text-center mt-3">
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            </Form>
        </Container>
    );
}


export default StudentHealth;
