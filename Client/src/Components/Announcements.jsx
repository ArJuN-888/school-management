import React, { useState } from 'react'

export default function Announcements() {
  const [selectedfile,setSelectedfile] = useState(null)
  console.log("file",selectedfile)
  const handleFile = (e) =>{
setSelectedfile(e.target.files[0])
const HandleRegister = async () => {
  try {
    const formData = new FormData();
    formData.append("image", selectedfile);//image key  specfies  multer field name that is also specified in the multer-config they should match
    console.log("formdata",formData)
const response = await axios.post("http://localhost:5000/User/UserRegistration",
formData,
{
  headers: {
    "Content-Type": "multipart/form-data",
  },
}
);

  }
catch(error){

}
}
  return (
    <div>
<div><h1>Upload announcements</h1></div>
      <input
      type='file'
     onChange={handleFile}
      />
      <button onClick={HandleRegister}></button>
    </div>
  )
}
}