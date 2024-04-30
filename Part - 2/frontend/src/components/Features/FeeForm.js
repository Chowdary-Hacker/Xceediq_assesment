import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const FeeForm = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [er, seter] = useState(true);
  const [admissionNumber, setAdmissionNumber] = useState('test'); 
  const [studentName, setStudentName] = useState('test'); 
  const [pdfPaths, setPdfPaths] = useState(['']);  
  const [fee, setFee] = useState();
  const [payingAmount, setPayingAmount] = useState();
  const [loading, setLoading] = useState(null);
var sh;
  const handleChange = (event) => {
    const intValue = parseInt(event.target.value);
    setPayingAmount(intValue);
  };
  useEffect(()=>{
    try{
    setAdmissionNumber(location.state.admissionNumber) ; setStudentName(location.state.studentName) ; setFee(location.state.feees); seter(false);
    } catch(e){alert("Your session has been expired! kindly login again.. (:"); nav('/');}
  },[]);

  const fetchReceipts = () => {
    try {
      axios.get('http://localhost:3333/receipts'+admissionNumber+'').then(response =>
      {setPdfPaths(response.data)}).catch();
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  }
  const load = () => {
    setLoading(true);
    process();
  };

  const process = () => {
    try{
    axios.put("http://localhost:3333/fee/paying/"+admissionNumber+"",{payingAmount:payingAmount, date:new Date.now().toLocaleString()}).then(res=>{setFee(res.data)}).catch((e)=>console.log(e));
    } catch(e){}
    const interval = setInterval(() => {
      sh = 2;
      //just to see running img for some more time.. i've been making little bit delay here (:
     }, 5000); 
     setLoading(false);
     return () => clearInterval(interval);
  }

  return (
   <div>
   
   {er ? (
  <h1></h1>
) : (
  <>
    <h1>Pending fee: {fee}</h1>
    <p>Student Name: {studentName}</p>
    <p>Student Admission Number: {admissionNumber}</p>
  </>
)}    
    <div>
      <h1>PDF Receipts</h1>
      <button onClick={fetchReceipts}>Fetch Receipts</button>
      <ul>
        {pdfPaths.map((pdfPath, index) => (
          <li key={index}>
            <a href={pdfPath} download={`receipt_${index}.pdf`}>Download Receipt {index + 1}</a>
          </li>
        ))}
      </ul>
    </div>
    {/* list the reciepts with download icon */}
    <input type='text' placeholder='Enter Amount' value={payingAmount} onChange={handleChange}/>
    <button onClick={()=>{load()}}>Pay</button>{loading?( <img src="https://example.com/running.gif" alt="Running" />):(<p></p>)}
   </div>
  );
};

export default FeeForm;
