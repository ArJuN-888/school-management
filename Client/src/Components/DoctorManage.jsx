import React, { useContext,useEffect, useState } from 'react'
import mycontext from '../Context/Context'
import axios from 'axios'
import '../Components/Styles/DoctorManage.css'

export default function DoctorManage() {
    const {baseURL} = useContext(mycontext)
    const[doctors,setDoctors]=useState([])
    const[doctor,setDoctor]=useState([])
    const[docID,setDocID]=useState("")
    const[passCon,setPassCon]=useState(0)
    const[editToggle,setEditToggle]=useState(0)
    const[passtoggle,setPasstoggle]=useState(0)
    const[oldPass,setOldpass]=useState("")
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[quali,setQuali]=useState("")
    const[status,setStatus]=useState("")
    const[newUsername,setNewusername]=useState("")
    const[newEmail,setNewEmail]=useState("")
    const[newQuali,setNewQuali]=useState("")
    const[conPass,setConpass]=useState("")
    const[newPass,setNewpass]=useState("")
console.log("hsgh",doctors)
    useEffect(()=>{

        fetchDoctors()

    },[])

    const fetchDoctors = async() =>{
        try
        {
            const response = await axios.get(`${baseURL}/Doctor/getalldoctor`)
            setDoctors(response.data.doctor)
        }
        catch(err)
        {
            alert(err)
        }
    }

    const editDoc = async(id) =>{
        try
        {
            const response = await axios.get(`${baseURL}/Doctor/find/${id}`)
            setDoctor(response.data.doctor)
            setEditToggle(1)
            setDocID(id)
            setNewusername(response.data.doctor.username)
            setNewEmail(response.data.doctor.email)
            setNewQuali(response.data.doctor.qualification)
            
        }
        catch(err)
        {
            alert(err)
        }
    }
console.log("id",docID);
    const submitButton = async() =>{
        try
        {
            const response = await axios.post(`${baseURL}/Doctor/register`,{username,email,password,qualification:quali,status})
            alert(response.data.message)
            fetchDoctors()
            setUsername("")
            setEmail("")
            setPassword("")
            setQuali("")
            setStatus("")
            setDocID("")
        }
        catch(err)
        {
            alert(err)
        }
    }

    const deleteDoc = async(id) =>{
        try
        {
            const response = await axios.delete(`${baseURL}/Doctor/delete/${id}`)
            alert(response.data.message)
            fetchDoctors()
            setDocID("")
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const editSave = async() =>{
        try
        {
            const response = await axios.put(`${baseURL}/Doctor/edit/${docID}`,{username:newUsername,email:newEmail,qualification:newQuali})
            alert(response.data.message)
            setEditToggle(0)
            fetchDoctors()
            setOldpass("")
            setPasstoggle(0)
            setPassCon(0)
            setDocID("")
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const cancelUpdate =async()=>{
        setEditToggle(0)
        setOldpass("")
        setPasstoggle(0)
        setPassCon(0)
        setDocID("")
    }

    const passChange = async() =>{
        setPasstoggle(1)
        setOldpass("")
    }

    const subCanpass =async() =>{
        setPasstoggle(0)
        setOldpass("")
    }

    const subPass =async() =>{
        try
        {
            const response=await axios.post(`${baseURL}/Doctor/docpassmatch/${docID}`,{password:oldPass})
            alert(response.data.message)
            if(response.data.message ==="You can now update your Password")
            {
                setPassCon(1)
                setPasstoggle(0)
            }
            setOldpass("")
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const subConpass = async() =>{
        try
        {
            const response=await axios.put(`${baseURL}/Doctor/docpassupdate/${docID}`,{password:newPass,conPass})
            alert(response.data.message)
            setOldpass("")
            setDocID("")
            if(response.data.message === "Password Updated successfully")
            {
                setPassCon(0)
                setPasstoggle(0)
            }
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const subConpassCancel = async() =>{
        setPasstoggle(0)
        setEditToggle(0)
        setPassCon(0)
        setOldpass("")
        setDocID("")
    }

  return (
    <div className='doc-container'>
        <div className='doc-reg'>
            <h3 className='doc-reg-head'>Doctor-Registration</h3>
            <div className='doc-input-sec'>
                <input
                    className='add-in-doc'
                    type='text'
                    value={username}
                    placeholder='Username'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                    type='text'
                    className='add-in-doc'
                    value={email}
                    placeholder='Email'
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type='text'
                    className='add-in-doc'
                    value={password}
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    type='text'
                    className='add-in-doc'
                    value={quali}
                    placeholder='Qualification'
                    onChange={(e)=>setQuali(e.target.value)}
                />
                <input
                    type='text'
                    className='add-in-doc'
                    value={status}
                    placeholder='Status'
                    onChange={(e)=>setStatus(e.target.value)}
                />
                <div className='sub-button'>
                    <button className='submit-button' onClick={()=>{submitButton()}}>Submit</button>
                </div>
            </div>
        </div>
        <div className='doc-map-sec'>
            <div className='doc-mapp'>
                <table className='doc-map-tab'>
                    <tr>
                        <th className='doc-map-head'>sl.No</th>
                        <th className='doc-map-head'>Username</th>
                        <th className='doc-map-head'>Email</th>
                        <th className='doc-map-head'>Qualification</th>
                        <th className='doc-map-head'>Action</th>
                    </tr>
                    {doctors.map((doc,index)=>(
                    <tr>
                        <td className='doc-map-data'>{index+1}</td>
                        <td className='doc-map-data'>{doc.username}</td>
                        <td className='doc-map-data'>{doc.email}</td>
                        <td className='doc-map-data'>{doc.qualification}</td>
                        <td className='doc-map-data'>
                            <button className='doc-edit' onClick={()=>editDoc(doc._id)}>Edit</button>
                            <button className='doc-delete' onClick={()=>deleteDoc(doc._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </table>
            </div>
        </div>
        <div className='edit-sec-doc'>
            {editToggle ?(  
            <>
                <input
                    type='text'
                    className='new-doc-det'
                    value={newUsername}
                    placeholder='New Username'
                    onChange={(e)=>setNewusername(e.target.value)}
                />
                <input
                    type='text'
                    className='new-doc-det'
                    value={newEmail}
                    placeholder='New Email'
                    onChange={(e)=>setNewEmail(e.target.value)}
                />
                <input
                    type='text'
                    className='new-doc-det'
                    value={newQuali}
                    placeholder='Qualification'
                    onChange={(e)=>setNewQuali(e.target.value)}
                />
                <button className='edit-sub-button' onClick={()=>{editSave()}}>Update</button>
                <button className='edit-can-button' onClick={()=>{cancelUpdate()}}>Cancel</button>
                <button className='edit-pass-button' onClick={()=>{passChange()}}>Password Update</button>
            </>
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-edit'>
            {passtoggle ?(   
            <>
                <div className='pass-section'>
                <input
                    type='text'
                    className='pass-ch-edit'
                    value={oldPass}
                    placeholder='Old Password'
                    onChange={(e)=>setOldpass(e.target.value)}
                />
                <button className='pass-subm-button' onClick={()=>{subPass()}}>Check</button>
                <button className='pass-canc-button' onClick={()=>{subCanpass()}}>Cancel</button>
                </div>
            </>
            ):(
                <>
                </>
            )}
        </div>
        <div className='pass-update'>
        {passCon ?(    
            <>
            <input
                    type='text'
                    className='pass-up-edit'
                    value={newPass}
                    placeholder='New Password'
                    onChange={(e)=>setNewpass(e.target.value)}
            />
            <input
                    type='text'
                    className='pass-up-edit'
                    value={conPass}
                    placeholder='Confirm New Password'
                    onChange={(e)=>setConpass(e.target.value)}
            />
            <button className='pass-con-button' onClick={()=>{subConpass()}}>Update</button>
            <button className='pass-con-button-can' onClick={()=>{subConpassCancel()}}>Cancel</button>

            </>
        ):( 
            <div>

            </div>
        )}
        </div>
    </div>
  )
}
