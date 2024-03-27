import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GetTID from './Hooks/Getteacherid';

import { Table ,Button} from 'react-bootstrap';
import {Flip, toast} from "react-toastify"

export default function ViewLetter() {
  const [letters, setLetters] = useState([]);
  const [cls, setCls] = useState("");
  const TID = GetTID();

  useEffect(() => {
    getTeacher();
  }, []);

  const getTeacher = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/Teacher/find/${TID}`);
      setCls(res.data.user.batch);
      const resp = await axios.get('http://localhost:5000/Leave/getletters', {
        params: {
          clue: res.data.user.batch
        }
      });
      setLetters(resp.data);
    } catch (err) {
      toast.error(err,{transition:Flip});
    }
  };

  const grantSubmit = async (id, grant) => {
    try {
      const response = await axios.put(`http://localhost:5000/Leave/grant/${id}`, { grant: !grant });
      toast.success(response.data.message,{transition:Flip});
      getTeacher();
    } catch (err) {
      toast.err(err,{transition:Flip});
    }
  };

  return (
    <div className='l-container m-2' style={{letterSpacing:"2px"}}>
      {letters.length > 0 ? (
        <div className='l-section'>
          <h2 className='l-head text-center'>Submitted Leave Letters</h2>
          <Table striped bordered hover className='fs-4 '>
            <thead>
              <tr>
                <th className="bg-primary text-white ">Sl.no</th>
                <th className="bg-primary text-white ">Roll No.</th>
                <th className="bg-primary text-white ">Student Name</th>
                <th className="bg-primary text-white ">Start Date</th>
                <th className="bg-primary text-white ">No. of Days</th>
                <th className="bg-primary text-white ">Reason</th>
                <th className="bg-primary text-white ">Action</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((a, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{a.rollno}</td>
                  <td>{a.studentname}</td>
                  <td>{new Date(a.startdate).toLocaleDateString()}</td>
                  <td>{a.days}</td>
                  <td>{a.reason}</td>
                  <td>
                  <Button
                    className='l-button'
                    style={{
                      borderRadius: "0.2rem",
                      boxShadow: "0px 0px 5px 0px grey",
                      letterSpacing: "2px",
                    }}
                    onClick={() => { grantSubmit(a._id, a.grant) }}
                    variant={a.grant ? "danger" : "success"} // Change variant based on grant status
                  >
                    {a.grant ? "Refuse" : "Grant"}
                  </Button>
    </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h4 className='text-center'>No Leave Letters have been Submitted</h4>
      )}
    </div>
  );
}
