import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatApp from '../../Features/ChatApp';
import axios from 'axios'; import AdminAssistStaffInfo from '../AdminAssist/AdminAssistStaffInfo'
import FeeForm from '../../Features/FeeForm';
const AdminAssist = () => {
  var sessionToken, userName, parentName, admissionNumber;
  const [messages, setMessages] = useState([{data:"Hlo", sender:"parent", date:'2024 10:00', parentName:'SomeswaraRao', childAdmissionNumber:'123'},{data:"Its Mohan", sender:"admin", date:'2024 10:00', parentName:'', childAdmissionNumber:''}]);
  const [warning, setWarning] = useState(false);
  const [messageInput, setMessageInput] = useState('');

const nav = useNavigate(); const location = useLocation();
try{if(location.state.sessionToken!==null){sessionToken = location.state.sessionToken; userName = location.state.userName;}else{alert("Session expired kindly login again ! (:"); nav('/adminAssistLogin')}
} catch(e){}

/*const sendMessage = () => {
  if (messageInput.trim() === '') return;
try{axios.post("http://localhost:3333/chat/adminParentChat",{data:messageInput, sender:'parent', reciever:'admin', parentName:parentName, childAdmissionNumber:admissionNumber, date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)});
  setMessageInput('');} catch(e){console.log(""+e+"");}
};
*/
  useEffect(()=>{
    axios.get("http://localhost:3333/adminAssistLogin/adminAssist",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/adminAssistLogin');}}).catch((e)=>{console.log(e);});
},[]);
/*
useEffect(() => {
  const interval = setInterval(async () => {
   await fetchMessages();
  }, 5000); 
  return () => clearInterval(interval);
}, []);
*/
  return (
 <div className="app">
       {sessionToken? (<>Welcome {userName} </>) : <p></p>}
     <div> <ChatApp/> </div>
      {warning && <p> Failed Loading messages try check internet connection (:</p>} 
       <div>
      <AdminAssistStaffInfo/>
      </div>
    </div>
  
  );
};

export default AdminAssist;
