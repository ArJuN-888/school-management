import axios from "axios";
import mycontext from "../../Context/Context";
import { useEffect, useState, useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
export const useFetchRecipient = (chat, userID) => {
  const { baseURL } = useContext(mycontext);
  const [recipientUser, setRecipientUser] = useState(null);
  console.log("recipo", recipientUser);
  const recipientid = chat?.members?.find((id) => id !== userID);
  console.log("recipientiid", recipientid);
  useEffect(() => {
 
    const fetchrecipient = async () => {
      try {
        if (!recipientid) {
          return (<><Spinner animation="border" variant="danger" /></>);
        } else {
          const response = await axios.get(`${baseURL}/Teacher/find/${recipientid}`);
            if (response.data.user !== null) {
            setRecipientUser(response.data.user);
          }

          const adminresponse = await axios.get(`${baseURL}/Admin/find/getadmin/${recipientid}`);
        
          if (adminresponse.data.admin !== null) {
            setRecipientUser(adminresponse.data.admin);
          }
          const doctorresponse = await axios.get(`${baseURL}/Doctor/find/${recipientid}`);
          if (doctorresponse.data.doctor !== null) {
            setRecipientUser(doctorresponse.data.doctor);
          }
        }
      } catch (error) {
        console.log(error);
      }
    
    };
   

    fetchrecipient();
   
  }, [recipientid,userID]);

  return { recipientUser };
};
