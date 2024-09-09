import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard({ transactionData, fraudResult }) {
  return (
    <div className="dashboard">
      <h2>Transaction Dashboard</h2>
      {transactionData ? (
        <div>
          <p>Amount: {transactionData.amount}</p>
          <p>Transaction Type: {transactionData.transactionType}</p>
          <p>Account Number: {transactionData.accountNumber}</p>
          <p>Fraud Detection Result: {fraudResult}</p>
        </div>
      ) : (
        <p>No transaction data available.</p>
      )}
    </div>
  );
}

export default Dashboard;
