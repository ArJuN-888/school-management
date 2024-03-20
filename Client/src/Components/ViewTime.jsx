import React, { useState, useEffect } from "react";
import axios from "axios";
import GetParentclass from "./Hooks/GetPclass";
import '../Components/Styles/ViewTime.css'

export default function ViewTime() {
  const Pclass = GetParentclass()
  const [timetables, setTimetables] = useState([]);
  const[logonn,setLogonn]=useState("")
console.log("lokok",Pclass);
  useEffect(() => {
    fetchTimetables();
    
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Timetable/gettableP",{params:{ Pclass}});
      setTimetables(response.data);
      // const logonn = timetables.length
      setLogonn(timetables.length)
    } catch (error) {
      console.error("Error fetching timetables: ", error);
    }
  };
  return (
    <div className="show-section-view">
      {!logonn ?(  
        <>
        <div className="head-section">
        <h2 className="view-head">Timetable</h2>
        </div>
        <table>
            <thead>
                <tr>
                <th className="t-head-v">Day</th>
                <th className="t-head-v">Subjects</th>
                
                </tr>
            </thead>
            <tbody>
            {timetables.map((timetable) => (
                Object.entries(timetable.timetable).map(([day, subjects]) => (
                <tr key={day}>
                    <td className="t-r-v">{day}</td>
                    {Array.isArray(subjects) ? (
                    subjects.map((subject, index) => (
                        <td key={index}>{subject}</td>
                    ))
                    
                    ) : (
                    <td className="t-r-v">{subjects}</td>
                    )}
                </tr>
                
                ))
               
            ))}
            </tbody>
        </table>
        </>
      ):(   
        <div className="no-mans-land">
          <img src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" className="no-m-img" alt="img"/>
        </div>
      )}
    </div>
  )
}
