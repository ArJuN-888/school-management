import React, { useContext, useState } from 'react';
import mycontext from '../Context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios"

const StudentHealth = () => {
    const { baseURL } = useContext(mycontext);
    const [health,setHealth]=useState([])
    console.log("health",health)
    const [data, setData] = useState({
        studentid: '',
        studentname: '',
        Immunization: '',
        Vision: '',
        Hearing: '',
        PhysicalExamination: '',
        NutritionStatus: '',
        MentalHealth: '',
        Finalreport:""
    });
    console.log("inputs",data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
       try {
        const response=  await axios.post(`${baseURL}/Health/Add`,data)
        console.log(response.data)
        setHealth(response.data.message)
        alert(response.data.message)
       } catch (error) {
        console.log(error)
        alert(error.response.data.message)
       }
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4"> Record Health of Students</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="studentid">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control type="text" name="studentid" placeholder="Enter Student ID" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="studentname">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name="studentname" placeholder="Enter Student Name" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} controlId="batch">
                        <Form.Label>Student batch</Form.Label>
                        <Form.Select type="text" name="batch" placeholder="Finalreport" onChange={handleChange}>
                          <option value="">batch</option>
                            <option value="10A">10A</option>
                            <option value="10B">10B</option>
                            <option value="10C">10C</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="Immunization">
                        <Form.Label>Immunization</Form.Label>
                        <Form.Control type="text" name="Immunization" placeholder="Immunization" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="Vision">
                        <Form.Label>Vision</Form.Label>
                        <Form.Control type="text" name="Vision" placeholder="Vision" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="Hearing">
                        <Form.Label>Hearing</Form.Label>
                        <Form.Control type="text" name="Hearing" placeholder="Hearing" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="PhysicalExamination">
                        <Form.Label>Physical Examination</Form.Label>
                        <Form.Control type="text" name="PhysicalExamination" placeholder="Physical Examination" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="NutritionStatus">
                        <Form.Label>Nutrition Status</Form.Label>
                        <Form.Control type="text" name="NutritionStatus" placeholder="Nutrition Status" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="MentalHealth">
                        <Form.Label>Mental Health</Form.Label>
                        <Form.Control type="text" name="MentalHealth" placeholder="Mental Health" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} controlId="Finalreport">
                        <Form.Label>Finalreport</Form.Label>
<<<<<<< HEAD

                       
  <Form.Select type="text" name="Finalreport" placeholder="Finalreport" onChange={handleChange}>
    <option value="">Status</option>
    <option value="HEALTHY">HEALTHY</option>
    <option value="NEED CONSULTATION">NEED CONSULTATION</option> {/* Fixed duplicate value */}
    
  </Form.Select>


=======
                        <Form.Select type="text" name="Finalreport" placeholder="Finalreport" onChange={handleChange}>
                          <option value="">Status</option>
                            <option value="HEALTHY">HEALTHY</option>
                            <option value="NEDD CONSULTATION">NEED CONSULTATION</option>
                        </Form.Select>
>>>>>>> b7f47e0f3df8bf5ea89c6ba3d8cae97c5ab865d6
                    </Form.Group>
                </Row>
                <div className="text-center">
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            </Form>
        </Container>
    );
}

export default StudentHealth;
