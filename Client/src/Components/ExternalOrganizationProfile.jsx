import React, { useContext, useEffect, useState } from 'react'
import GetEname from './Hooks/GetEName'
import axios from 'axios'
import mycontext from '../Context/Context'
import GetEID from './Hooks/GetEID';
import GetEoprofile from './Hooks/GetEoprofile';
import { FaPlus,FaMinus } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import {Flip, toast} from "react-toastify"
const ExternalOrganizationProfile = () => {
    const Externalname=GetEname()
    const eoID = GetEID()
    const eoProfile = GetEoprofile()
    const [tog,setTog] = useState(false)
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
    <div className="pdiv" >
          
            <div className="img-contain mb-2">
              <img className="image" src={`${reqURL}/${eoProfile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>
            
                <div className="">
                    {eo.length === 0 ? (
                        <div className="alert alert-info">No staff available</div>
                    ) : (
                        eo.map((data, index) => (
                            <div className="card border-0 fs-5" style={{boxShadow:"0px 0px 1px 0px",borderRadius:"0.2rem"}} key={index}>
                                <div className="card-body">
                                    <h3 className="card-title" style={{letterSpacing:"3px"}}>{data.username}</h3>
                                    <p className="card-text">
                                       <div style={{letterSpacing:"4px"}}>{data.email}</div> 
                                       <div className='mt-2'  ><Button style={{boxShadow:"0px 0px 5px 0px grey"}} onClick={()=>setTog(!tog)}>{tog ? <FaMinus/> : <FaPlus/>}</Button></div>
                                   {tog &&<><div style={{letterSpacing:"4px"}}>Organization - <b style={{letterSpacing:"1px"}}>{data.organization}</b></div>   
                                    <div style={{letterSpacing:"3px"}}>Stat - {data.status}</div>
                                    </> }  
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                </div>
           
     
  )
}

export default ExternalOrganizationProfile