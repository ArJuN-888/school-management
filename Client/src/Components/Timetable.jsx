import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetTclass from "./Hooks/GetTeacherClass";
import './Styles/Timetable.css'
import { Form, Button, Table ,Col, Row } from 'react-bootstrap';

function TimetableForm() {
  const [day, setDay] = useState('');
  const Tclass = GetTclass()
  const [periods, setPeriods] = useState(Array(8).fill(''));
  const [timetables, setTimetables] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Timetable/gettable', {
        params: { Tclass }
      });
      setTimetables(response.data);
      setSelectedId(response.data._id)
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };
console.log("time...",selectedId);
  const handleAddTimetable = async () => {
    try {
      const response = await axios.post('http://localhost:5000/Timetable/addtable', { day, classN:Tclass, periods });
      alert(response.data.message)
      fetchTimetables();
      setDay('');
      setPeriods(Array(8).fill(''));
    } catch (error) {
      console.error('Error adding timetable:', error);
    }
  };

  const handleDeleteTimetable = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Timetable/delete/${id}`);
      alert(response.data.message)
      fetchTimetables();
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  };

  const handleEditTimetable = (timetable) => {
    setDay(timetable.day);
    setPeriods(timetable.periods);
    setSelectedId(timetable._id);
  };

  const handleUpdateTimetable = async () => {
    try {
      const response=await axios.put(`http://localhost:5000/Timetable/updatetable/${selectedId}`, { day, periods});
      alert(response.data.message)
      fetchTimetables();
      setDay('');
      setPeriods(Array(8).fill(''));
      setSelectedId(null);
    } catch (error) {
      console.error('Error updating timetable:', error);
    }
  };
console.log("time",timetables);
  return (
    <div className="text-center main-time">
      <h2 className='overall-head text-center styled-heading'>Add / Edit Timetable</h2>
      <Row className="justify-content-center">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control type="text" value={day} onChange={(e) => setDay(e.target.value)} />
            </Form.Group>
            {periods.map((period, index) => (
              <div key={index}>
                <Form.Group >
                  <Form.Label>{`Period ${index + 1}:`}</Form.Label>
                  <Form.Control type="text" value={period} onChange={(e) => {
                    const newPeriods = [...periods];
                    newPeriods[index] = e.target.value;
                    setPeriods(newPeriods);
                  }} />
                </Form.Group>
              </div>
            ))}
            {selectedId ? (
              <Button variant='info' className='butto' onClick={handleUpdateTimetable}>Update Timetable</Button>
            ) : (
              <Button className='butto ' onClick={handleAddTimetable}>Add Timetable</Button>
            )}
          </Form>
        </Col>
      </Row>
      <h2>Timetables</h2>
      <ul>
        {timetables.map(timetable => (
          <li key={timetable._id}>
            <p>{timetable.day}: {timetable.periods.join(', ')}</p>
            <Button onClick={() => handleEditTimetable(timetable)}>Edit</Button>
            <Button variant='danger' onClick={() => handleDeleteTimetable(timetable._id)}>Delete</Button>
          </li>
        ))}
      </ul>
      <div className='overall-time'>
        <h2 className='overall-head text-center'>Your Class Timetable</h2>
        {timetables.length > 0 ?(     
        <div className="time-section">
          <Table striped bordered variant='dark'>
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
          <p className="text-center">You Haven't Provided Any Timetable Yet..</p>
        </>
         )}
      </div>
    </div>
  );
}

export default TimetableForm;
