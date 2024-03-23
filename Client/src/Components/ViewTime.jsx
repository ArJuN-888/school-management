import React, { useState, useEffect } from "react";
import axios from "axios";
import GetParentclass from "./Hooks/GetPclass";
import '../Components/Styles/ViewTime.css'

export default function ViewTime() {
  const Pclass = GetParentclass()
  const [timetables, setTimetables] = useState([]);
useEffect(() => {
  fetchTimetables();
}, []);

const fetchTimetables = async () => {
  try {
    const response = await axios.get('http://localhost:5000/Timetable/gettable', {
      params: { Tclass :Pclass }
    });
    setTimetables(response.data);
  } catch (error) {
    console.error('Error fetching timetables:', error);
  }
};
console.log("tables",timetables);
  return (
    <div>
        <div className="view-section">
          <h2>Your TimeTable</h2>
          <div className="time-section">
              <table>
                  <tr>
                      <th> DAY </th>
                      <th>  Ⅰ  </th>
                      <th>  ⅠⅠ  </th>
                      <th>  ⅠⅠⅠ  </th>
                      <th> ⅠⅤ </th>
                      <th> Ⅴ </th>
                      <th> ⅤⅠ </th>
                      <th> VⅠⅠ </th>
                      <th> ⅤⅠⅠⅠ </th>
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
  )
}
