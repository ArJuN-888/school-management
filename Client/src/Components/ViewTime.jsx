import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Row, Col } from 'react-bootstrap';
import GetParentclass from "./Hooks/GetPclass";
import '../Components/Styles/ViewTime.css';

export default function ViewTime() {
  const Pclass = GetParentclass();
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Timetable/gettable', {
        params: { Tclass: Pclass }
      });
      setTimetables(response.data);
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };

  console.log("tables", timetables);

  return (
    <Container>
      <Row>
        <Col>
          <div className="view-section" style={{borderRadius:'15px'}}>
            <h2 className="text-center">Your TimeTable</h2>
            {timetables.length > 0 ?(        
            <div className="time-section" style={{borderRadius:'5px'}}>
              <Table bordered striped hover responsive variant="dark" style={{borderRadius:'5px'}}>
                <thead>
                  <tr>
                    <th>DAY</th>
                    <th>9:00am-9:45am</th>
                    <th>9:45am-10:30am</th>
                    <th>10:30am-11:15am</th>
                    <th>11:15am-12:00pm</th>
                    <th>12:30pm-01:15pm</th>
                    <th>01:15pm-02:00pm</th>
                    <th>02:00pm-02:45pm</th>
                    <th>02:45pm-03:30pm</th>
                  </tr>
                </thead>
                <tbody>
                  {timetables.map((data, index) => (
                    <tr key={index}>
                      <td>{data.day}</td>
                      {data.periods.map((period, index) => (
                        <td key={index}>{period}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            ):( 
              <>
              <p className="text-center">Your Teacher Has Not Yet Provided Your Timetable...</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
