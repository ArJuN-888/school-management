import React, { useContext, useEffect, useState } from "react";
import GetPname from "./Hooks/GetParentName";
import GetParentID from "./Hooks/GetParentID";
import axios from "axios";
import mycontext from "../Context/Context";
import { Table } from "react-bootstrap";

const ParentMarklistView = () => {
  const parentname = GetPname();
  const parentID = GetParentID();
  const [mark, setMark] = useState([]);
  console.log("marklist", mark);

  const { baseURL } = useContext(mycontext);

  useEffect(() => {
    ViewMarklist();
  }, [parentID]);

  const ViewMarklist = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/marksheetadd/list/${parentID}`
      );
      console.log(response.data.message);
      setMark(response.data.message);
    } catch (error) {}
  };

  const calculatePercentage = (marks) => {
    let scored = "";
    let Tmark="";
    marks.forEach(marks => {
      if(marks.scoredMark && marks.totalMark !== null)
      {
        scored += marks.scoredMark 
        Tmark += marks.totalMark
      }
    
    });
      
       const percentage = (scored/Tmark)*100
      return percentage
  };

  return (
    <div className="m-3 " style={{letterSpacing:'3px'}}>
      <div className="heading text-center">
        <h2 className="text-center" style={{fontFamily:'monospace',textDecoration:'underline', color:'brown'}}>
          STUDENT MARKLIST
        </h2>
      </div>

      <div className="marklist">
        {mark.length === 0 ? (
          <div className="text-center"><h5>No mark list available</h5></div>
        ) : (
          mark.map((data, index) => (
            <div key={index}>
              <h3 className="text-center" style={{color:'magenta', textDecoration:'underline' , fontFamily:'verdana'}}> {data.examname}</h3>
              <Table className="fs-5" striped bordered hover variant="white">
                <thead>
                  <tr>
                    <th className="bg-primary text-white">Subject</th>
                    <th className="bg-primary text-white">Scored Mark</th>
                    <th className="bg-primary text-white">Total Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {data.marks.map((mark, i) => (
                    <tr key={i}>
                      <td>{mark.subject}</td>
                      <td>{mark.scoredMark}</td>
                      <td>{mark.totalMark}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-center">
                <p className="fs-4 mt-3" >Percentage:<span style={{color:'royalblue'}}> {calculatePercentage(data.marks)}% </span></p>
                <p className="fs-4">Result:<span style={{color: calculatePercentage(data.marks) > 20 ? 'green' : 'red'}}>{calculatePercentage(data.marks) > 20 ? "Passed" : "Fail"}</span></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParentMarklistView;
