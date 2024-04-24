import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {Chart, Legend, ArcElement, Tooltip} from 'chart.js';
function StudentDashboard(){
    const [messages, setMessages] = useState([]);
    const [warning, setWarning] = useState(false);
    const [RefreshKey, setRefreshKey] = useState(0);
    const [messageInput, setMessageInput] = useState('');
    const [fee, setFee] = useState(null);
    const [data, setData] = useState({labels:['Pending fee', 'Paid fee', 'Total fee'], datasets:[{label:"Fee status", data:[15, 16,19], backgroundColor:['pink', 'blue', 'yellow']}]})
    const nav = useNavigate();
    Chart.register(Legend, ArcElement, Tooltip);
    // Function to simulate sending a message
    const sendMessage = () => {
        if (messageInput.trim() === '') return;
    try{axios.post("http://localhost:3333/AdminTeacherChat",{data:messageInput, sender:'ToAdmin'}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)});
        setMessageInput('');} catch(e){console.log(""+e+"");}
    };
  
    // Function to fetch messages from API
    const fetchMessages = () => {
      try{
      axios.get("http://localhost:3333/AdminTeacherChat")
      .then(res=>{if(res.status!==222){setWarning(true)} return res.json();}).then(res=>setMessages(res.data)).catch(error => {console.error("Error fetching messages:", error)});
    } catch(e){console.log(""+e+"")}
    };
  
    useEffect(() => {
      const interval = setInterval(async () => {
       await fetchMessages();
        setRefreshKey(prevKey => prevKey + 1);
      }, 5000); 
      return () => clearInterval(interval);
    }, [RefreshKey]);
  
     useEffect(()=>{
       axios.get("http://localhost:3333/fee").then(res=>res.json()).then(res=>{setFee(res.data)}).catch(e=>console.log(e));
     },[RefreshKey])
    return (
      <div className="app">
        <h1>Chat with Admin</h1>
        <div className="chat-container">
          {/* Chat Application */}
          <div className="chat-app">
            {/* Chat messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'ToAdmin' ? 'sent' : 'received'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            /></div>
          {/* Arrow icon for sending message */}
          <div className="send-arrow"><button onClick={sendMessage}>
          ➡️</button>
          </div>
        </div>
      </div>
          <div className="button-container">
            {/* Two buttons  display pending fee*/}     
            {warning && <p> Failed Loading messages try checking internet connection (:</p>}      
            <button onClick={()=>{nav('/FeeForm.js')}} className="button">Pay fee/download fee-paid reciepts</button>
            <button onClick={()=>{nav('/StudentAcademics')}} className="button">Your Child's Academic Score</button>
          </div>
          <div><Pie data={data} /></div>
        </div>)
}
export default StudentDashboard ;