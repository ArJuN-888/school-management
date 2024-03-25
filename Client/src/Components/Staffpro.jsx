import React, { useContext, useEffect, useState } from 'react';
import GetSID from './Hooks/GetstaffID';
import axios from 'axios';
import mycontext from '../Context/Context';

const Staffpro = () => {
    const { baseURL } = useContext(mycontext);
    const staffid = GetSID();
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        getallStaff();
    }, []);

    const getallStaff = async () => {
        try {
            const response = await axios.get(`${baseURL}/Staff/getstaff`);
            console.log(response.data.staff);
            const logedinStaff = response.data.staff.filter((u) => u._id === staffid);
            setStaff(logedinStaff);
        } catch (error) {
            // Handle error
            console.error('Error fetching staff data:', error);
        }
    };

    return (
        <div className="container">
            <h2>Profile</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {staff.length === 0 ? (
                        <div className="alert alert-info">No staff available</div>
                    ) : (
                        staff.map((data, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-body">
                                    <h3 className="card-title">{data.username}</h3>
                                    <p className="card-text">
                                        <strong>ID:</strong> {data._id}<br />
                                        <strong>Email:</strong> {data.email}<br />
                                        <strong>Batch:</strong> {data.batch}<br />
                                        <strong>Specialization:</strong> {data.specialization}<br />
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Staffpro;
