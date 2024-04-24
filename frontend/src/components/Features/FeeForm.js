import React, { useState } from 'react';
import axios from 'axios';
const FeeForm = () => {
  const [studentName, setStudentName] = useState('');
  const [pdfPaths, setPdfPaths] = useState([]);
  const [fee, setFee] = useState('');
  const [payingAmount, setPayingAmount] = useState('');
  const [loading, setLoading] = useState(null);

  const handleChange = (event) => {
    const intValue = parseInt(event.target.value);
    setPayingAmount(intValue);
  };

  const fetchReceipts = () => {
    try {
      axios.get('http://localhost:3333/receipts').then(response =>
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
    axios.put("http://localhost:3333/fee/admissionNumber",{payingAmount:payingAmount}).then(res=>res.json()).then(res=>{setFee(res.data)}).catch((e)=>console.log(e));
    const interval = setInterval(() => {
      //just to see running img for some more time..
     }, 5000); 
     setLoading(false);
     return () => clearInterval(interval);
  }

  return (
   <div>
    <h1>Pending fee :{fee.pending}</h1>
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
