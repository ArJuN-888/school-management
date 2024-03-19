import React, { useState, useEffect } from "react";
import axios from "axios";
import GetTname from "./Hooks/Getteachername";

const Timetable = () => {
  const[toggle,setToggle]=useState(0)
  const[mute,setMute]=useState(0)
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
  const legth = timetables.length
  useEffect(() => {
    fetchTimetables();
    
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Timetable/gettable",{params:{Tname}});
      setTimetables(response.data);
      setTableID(response.data[0]._id)
      setToggle(1)
      if(legth === 1)
    {
      setMute(1)
    }
    } catch (error) {
      console.error("Error fetching timetables: ", error);
    }
  };

  const handleAdd = async () => {
    try {
      fetchTimetables()
      if(legth === 1)
      {
        alert("Please Save Your Updates ")
      }
      else
      {
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
          setMute(1)
          setToggle(0)
      }
    } catch (error) {
      console.error("Error adding timetable: ", error);
    }
  };
  
  const deleteButton = async(id) => {
    try
    {
       const response = await axios.delete(`http://localhost:5000/Timetable/delete/${tableID}`)
       alert(response.data.message)
       setMute(0)
       fetchTimetables()
       setToggle(0)
    }
    catch(err)
    {
        alert(err);
    }
    fetchTimetables()
  }

  const editButton = async(id) => {
    
    try {
      const response = await axios.get(`http://localhost:5000/Timetable/gettable/${id}`);
      const { timetable } = response.data;
      setTimetable(timetable);
      console.log("tt",timetable);
      setTableID(id);
      setToggle(0);
      setMute(0)
  } catch (error) {
      console.error("Error editing timetable: ", error);
  }
  }

  const saveButton = async (tableID) => {
      fetchTimetables()
      console.log("length",legth);
      if(legth === 0)
      {
        alert("First Add Your Timetable")
      }
      else
      {
        try {
            const response = await axios.put(`http://localhost:5000/Timetable/updatetable/${tableID}`, { timetable });
            alert(response.data.message)
            fetchTimetables();
            setToggle(1);
            setTimetable({
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: []
            });
            } 
            catch (error) 
            {
            console.error("Error saving timetable: ", error);
            }
      }
};

  return (
    <div>
      {!toggle ?( 
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
               <button onClick={()=>{handleAdd()}}>Add</button>
               <button className="map-save" onClick={()=>{saveButton(tableID)}}>Save</button> 
               
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
         
    </div>
  )} 
    <div className="button-sec">
      {mute?(  
        <>
            <button className="map-edit" onClick={()=>{editButton(tableID)}}>Edit</button>
            <button className="map-delete" onClick={()=>{deleteButton(tableID)}}>Delete</button>
            </>   
      ):(   
      <div >

      </div>
      )}  
        </div>  
    </div>
  );
};

export default Timetable;
