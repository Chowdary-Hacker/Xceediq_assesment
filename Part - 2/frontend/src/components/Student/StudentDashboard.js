import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
function StudentDashboard(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const nav = useNavigate();
    // Function to simulate sending a message
    const sendMessage = () => {
        if (messageInput.trim() === '') return;
        // Assuming you have an API to send messages
        // This is just a placeholder function
        // In real implementation, you would make an API call to send the message
        console.log('Message sent:', messageInput);
        setMessageInput('');
    };
  
    // Function to fetch messages from API
    const fetchMessages = () => {
      // Assuming you have an API to fetch messages
      // This is just a placeholder function
      // In real implementation, you would make an API call to fetch messages
      const fetchedMessages = [
        { id: 1, text: 'Hello', sender: 'received' },
        { id: 2, text: 'Hi there', sender: 'sent' },
        { id: 3, text: 'How are you?', sender: 'received' },
        { id: 4, text: 'I am fine, thank you', sender: 'sent' },
        // Add more messages here if needed
      ];
      setMessages(fetchedMessages);
    };
  
    useEffect(() => {
      // Fetch messages from API when component mounts
      fetchMessages();
    }, []);
  
    return (
      <div className="app">
        <div className="chat-container">
          {/* Chat Application */}
          <div className="chat-app">
            {/* Chat messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'sent' ? 'sent' : 'received'}`}
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
            {/* Two buttons */}
            <button onClick={nav('/StudentAcademics')} className="button">Academics</button>
            <button className="button">Grading</button>
          </div>
        </div>)
}
export default StudentDashboard ;