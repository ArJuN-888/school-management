// import React, { useContext, useState } from 'react'
// import axios from 'axios'
// import { Button ,Col,Form, Row} from 'react-bootstrap'
// import mycontext from '../Context/Context'
// export default function ExternalOrganizationRegister() {
//     const {baseURL} = useContext(mycontext)
//     const [registerEo,setregisterEo] = useState({
//         email:"",
//         username:"",
//         organization:"",
//         password:"",
//         status:""
//     })
//     const handleChange = (key,value) =>{
// setregisterEo({...registerEo,[key]:value})
//     }
//     const handleSubmit = async() =>{
//         try{
//  const response = await axios.post(`${baseURL}/Organization/register`,registerEo)
//  alert(response.data.message)
//         }
//         catch(error){
// alert(error.response.data.message)
//         }
//     }
//   return (
//     <div className='m-2'>
//       <Form>
//         <Form.Group as={Row}>
//           <Form.Label column sm="1">Username:</Form.Label>
//           <Col sm="11" >
//         <Form.Control
//         placeholder='Username...'
//         value={registerEo.username}
//         onChange={(e)=> handle1Change("username",e.target.value)}
//         />
//         </Col>
//         </Form.Group>
//         <Form.Group as={Row}>
//           <Form.Label column sm="1">Email:</Form.Label>
//           <Col sm="11" >
//         <Form.Control
//         placeholder='Email...'
//         value={registerEo.email}
//         onChange={(e)=> handle1Change("email",e.target.value)}
//         />
//         </Col>
//         </Form.Group>
//         <Form.Group as={Row}>
//           <Form.Label column sm="1">Password:</Form.Label>
//           <Col sm="11" >
//         <Form.Control
//         placeholder='Password...'
//         value={registerEo.password}
//         onChange={(e)=> handle1Change("password",e.target.value)}
//         />
//         </Col>
//         </Form.Group>
//         <Form.Group as={Row}>
//           <Form.Label column sm="1">Status:</Form.Label>
//           <Col sm="11" >
//         <Form.Control
//         placeholder='Status...'
//         value={registerEo.status}
//         onChange={(e)=> handle1Change("status",e.target.value)}
//         />
//         </Col>
//         </Form.Group>
//         <Form.Group as={Row}>
//           <Form.Label column sm="1">Organization:</Form.Label>
//           <Col sm="11" >
//         <Form.Control
//         placeholder='Organization...'
//         value={registerEo.organization}
//         onChange={(e)=> handle1Change("organization",e.target.value)}
//         />
//         </Col>
//         </Form.Group>
//         <Button className='bg-primary' onClick={handleSubmit}>Submit</Button>
//         </Form>
        
//     </div>
//   )
// }
