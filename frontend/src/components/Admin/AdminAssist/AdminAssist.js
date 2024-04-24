import React, { useState } from 'react';
import FeeForm from '../../Features/FeeForm';
import FinancialReport from '../../Features/FinancialReport';
import Receipt from '../../Features/Receipt';
import { useNavigate } from 'react-router-dom';

const AdminAssist = () => {
  const [fees, setFees] = useState([]);
  const [receipt, setReceipt] = useState(null);
const nav = useNavigate();
  const addFeePayment = (payment) => {
    setFees([...fees, payment]);
    setReceipt(payment);
  };

  return (
    <div className="app">
      <div className="container">
        <FeeForm addFeePayment={addFeePayment} />
        {receipt && <Receipt payment={receipt} />}
        {fees.length > 0 && <FinancialReport fees={fees} />}
      </div>
      <button onClick={nav('/AdminAssistStaffInfo')}>Edit Staff details</button>
    </div>
  );
};

export default AdminAssist;
