import React, { useContext, useEffect, useState } from 'react'
import GetEname from '../Hooks/GetEName'
import axios from 'axios'
import mycontext from '../../Context/Context'
const ExternalOrganizationProfile = () => {
    const Externalname=GetEname()
    const {baseURL}=useContext(mycontext)
    const [eo,setEo]=useState([])
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
  return (
    <div><h2>ExternalOrganization</h2>
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