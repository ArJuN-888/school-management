import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetTclass from "./Hooks/GetTeacherClass";
import './Styles/Timetable.css'

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

  return (
    <div className='main-time'>
      <h2>Add / Edit Timetable</h2>
      <label>Day: <input type="text" value={day} onChange={(e) => setDay(e.target.value)} /></label><br />
      {periods.map((period, index) => (
        <div key={index}>
          <label>{`Period ${index + 1}: `}</label>
          <input type="text" value={period} onChange={(e) => {
            const newPeriods = [...periods];
            newPeriods[index] = e.target.value;
            setPeriods(newPeriods);
          }} /><br />
        </div>
      ))}
      {selectedId ? (
        <button onClick={handleUpdateTimetable}>Update Timetable</button>
      ) : (
        <button onClick={handleAddTimetable}>Add Timetable</button>
      )}
      <h2>Timetables</h2>
      <ul>
        {timetables.map(timetable => (
          <li key={timetable._id}>
            <p>{timetable.day}: {timetable.periods.join(', ')}</p>
            <button onClick={() => handleEditTimetable(timetable)}>Edit</button>
            <button onClick={() => handleDeleteTimetable(timetable._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='overall-time'>
        <h2 className='overall-head'>Your Class Timetable</h2>
        <div className="time-section">
              <table>
                  <tr>
                      <th> DAY </th>
                      <th>  9:00am-9:45am </th>
                      <th>   9:45am-10:30am  </th>
                      <th> 10:30am-11:15am  </th>
                      <th> 11:15am-12:00pm </th>
                      <th> 12:30pm-01:15pm  </th>
                      <th> 01:15pm-02:00pm </th>
                      <th> 02:00pm-02:45pm </th>
                      <th> 02:45pm-03:30pm </th>
                  </tr>
                  {timetables.map((data)=>(
                    <tr>
                        <td>{data.day}</td>
                        <td>{data.periods[0]}</td>
                        <td>{data.periods[1]}</td>
                        <td>{data.periods[2]}</td>
                        <td>{data.periods[3]}</td>
                        <td>{data.periods[4]}</td>
                        <td>{data.periods[5]}</td>
                        <td>{data.periods[6]}</td>
                        <td>{data.periods[7]}</td>
                    </tr>
                  ))}
                 
              </table>
          </div>
      </div>
    </div>
  );
}

export default TimetableForm;
