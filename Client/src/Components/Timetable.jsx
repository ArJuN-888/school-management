import React, { useState, useEffect } from "react";
import axios from "axios";
import GetTname from "./Hooks/Getteachername";

const Timetable = () => {
  
  const [timetable, setTimetable] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
  });
  const Tname = GetTname()
  const [timetables, setTimetables] = useState([]);
  const[tableID,setTableID]=useState("")
  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Timetable/gettable",{params:{Tname}});
      setTimetables(response.data);
      setTableID(response.data[0]._id)
    } catch (error) {
      console.error("Error fetching timetables: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/Timetable/addtable", { Tname, timetable });
      setTimetable({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      });
      fetchTimetables();
    } catch (error) {
      console.error("Error adding timetable: ", error);
    }
  };
  
  const deleteButton = async(id) => {
    try
    {
       const response = await axios.delete(`http://localhost:5000/Timetable/delete/${tableID}`)
       alert(response.data.message)
    }
    catch(err)
    {
        alert(err);
    }
    fetchTimetables()
  }


  return (
    <div>
        {timetables.length === 0 ?( 
        <div className="table-add"> 
            <h2>Add Timetable</h2>
                <div>
                    <label>Monday</label>
                    <input
                    type="text"
                    value={timetable.Monday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Monday: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label>Tuesday</label>
                    <input
                    type="text"
                    value={timetable.Tuesday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Tuesday: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label>Wednesday</label>
                    <input
                    type="text"
                    value={timetable.Wednesday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Wednesday: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label>Thursday</label>
                    <input
                    type="text"
                    value={timetable.Thursday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Thursday: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label>Friday</label>
                    <input
                    type="text"
                    value={timetable.Friday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Friday: e.target.value })
                    }
                    />
                </div>
                <div>
                    <label>Saturday</label>
                    <input
                    type="text"
                    value={timetable.Saturday}
                    onChange={(e) =>
                        setTimetable({ ...timetable, Saturday: e.target.value })
                    }
                    />
                </div>
               <button onClick={handleAdd}>Add</button>
               
        </div>
    ):( 
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
        <div className="button-sec">
            <button className="map-edit" onClick={()=>{editButton(tableID)}}>Edit</button>
            <button className="map-delete" onClick={()=>{deleteButton(tableID)}}>Delete</button>
        </div>   
    </div>
    )}
    </div>
  );
};

export default Timetable;
