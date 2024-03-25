import React, { useContext, useEffect, useState } from 'react'
import GetEname from './Hooks/GetEName'
import axios from 'axios'
import mycontext from '../Context/Context'
import { FaPlus } from "react-icons/fa";
import GetEID from './Hooks/GetEID';
import GetEoprofile from './Hooks/GetEoprofile';
import {Flip, toast} from "react-toastify"
const ExternalOrganizationProfile = () => {
    const Externalname=GetEname()
    const eoID = GetEID()
    const eoProfile = GetEoprofile()
    const {baseURL}=useContext(mycontext)
    const [eo,setEo]=useState([])
    const [reqURL,] = useState('http://localhost:5000/uploads');
    console.log("eo",eo)


    useEffect(()=>{
     Externalorganization()
    },[])

    const Externalorganization=async()=>{
        try {
            const response= await axios.get(`${baseURL}/Organization/geteo`)
            console.log(response.data.eo)
             const logedinEo= response.data.eo.filter((u)=> Externalname===u.username)
             setEo(logedinEo)
        } catch (error) {
            console.log(error)
        }
    }
    const HandleFile = async (e) => {
      const file = e.target.files[0];
  
      if (!file) {
        return;
      }
  
  
      try {
        const formData = new FormData();
        formData.append("file", file); // Use the correct field name
        console.log("formdata",formData)
        const response = await axios.put(`${baseURL}/Organization/editpic/${eoID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Add this header
            },
          }
        );
  
        localStorage.setItem("eoProfile", response.data.eo.filename);
        Externalorganization();
        toast.success(response.data.message,{transition:Flip});
      } catch (error) {
        
        toast.error( error.response.data.message,{transition:Flip});
      }
    };
  return (
    <div><h2>ExternalOrganization</h2>
     <div className="img-contain">
              <img className="image" src={`${reqURL}/${eoProfile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
    <div className="teacher-data">
   
        {eo.map((data, index) => (
          <div className="teacher-info" key={index}>
            <h3>{data.username}</h3>
            <p>ID: {data._id}</p>
            <p>Email: {data.email}</p>
            <p>Organization: {data.organization}</p>
            <p>Status: {data.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExternalOrganizationProfile