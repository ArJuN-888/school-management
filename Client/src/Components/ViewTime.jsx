import React, { useState, useEffect } from "react";
import axios from "axios";
import GetParentclass from "./Hooks/GetPclass";

export default function ViewTime() {
  const Pclass = GetParentclass()
  const [timetables, setTimetables] = useState([]);
console.log("lokok",Pclass);
  useEffect(() => {
    fetchTimetables();
    
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Timetable/gettableP",{params:{ Pclass}});
      setTimetables(response.data);
    } catch (error) {
      console.error("Error fetching timetables: ", error);
    }
  };
  return (
    <div className="show-section">
        <h2>Timetable</h2>
        <table>
            <thead>
                <tr>
                <th>Day</th>
                <th>Subjects</th>
                
                </tr>
            </thead>
            <tbody>
            {timetables.map((timetable) => (
                Object.entries(timetable.timetable).map(([day, subjects]) => (
                <tr key={day}>
                    <td>{day}</td>
                    {Array.isArray(subjects) ? (
                    subjects.map((subject, index) => (
                        <td key={index}>{subject}</td>
                    ))
                    
                    ) : (
                    <td>{subjects}</td>
                    )}
                </tr>
                
                ))
               
            ))}
            </tbody>
        </table>
         
    </div>
  )
}
