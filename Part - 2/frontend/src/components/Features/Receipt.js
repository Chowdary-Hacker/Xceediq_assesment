import React from 'react';

const Receipt = ({ payment }) => {
  return (
    <div>
      <h2>Fee Receipt</h2>
      <p>Student Name: {payment.studentName}</p>
      <p>Fee Amount: {payment.feeAmount}</p>
      <p>Payment Date: {payment.paymentDate}</p>
    </div>
  );
};

export default Receipt;
