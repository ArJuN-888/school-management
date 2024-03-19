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
    const totalScoredMarks = marks.reduce((acc, curr) => acc + curr.scoredMark, 0);
    const totalPossibleMarks = marks.reduce((acc, curr) => acc + curr.totalMark, 0);
    const percentage = (totalScoredMarks / totalPossibleMarks) * 100;
    return percentage.toFixed(2); // Round to two decimal places
  };

  return (
    <div>
      <div className="heading">
        {parentname} Here is Your children's Marksheet
      </div>

      <div className="marklist">
        {mark.length === 0 ? (
          <div>No mark list available</div>
        ) : (
          mark.map((data, index) => (
            <div key={index}>
              <h2>Examination: {data.examname}</h2>
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
              <div>
                <p>Percentage: {calculatePercentage(data.marks)}%</p>
                <p>Result: {calculatePercentage(data.marks) > 45 ? "Passed" : "Fail"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParentMarklistView;
