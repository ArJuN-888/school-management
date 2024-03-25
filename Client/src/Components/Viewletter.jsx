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
    <div className='l-container'>
      {letters.length > 0 ? (
        <div className='l-section'>
          <h2 className='l-head text-center'>Submitted Leave Letters</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Roll No.</th>
                <th>Student Name</th>
                <th>Start Date</th>
                <th>No. of Days</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((a, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{a.rollno}</td>
                  <td>{a.studentname}</td>
                  <td>{a.startdate}</td>
                  <td>{a.days}</td>
                  <td>{a.reason}</td>
                  <td>
                  <Button
                    className='l-button'
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
