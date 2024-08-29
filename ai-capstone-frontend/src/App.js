import React, { useState } from 'react';
import './App.css'; // Make sure to create this file for styles
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import Dashboard from './components/Dashboard';

function App() {
  const [transactionData, setTransactionData] = useState(null);
  const [fraudResult, setFraudResult] = useState(null);

  const handleFormSubmit = (data) => {
    // Here you would typically send the data to a backend API to check for fraud
    // For now, we will simulate the fraud detection process
    console.log('Transaction data submitted:', data);

    // Simulate an AI model checking for fraud
    const isFraud = Math.random() > 0.5; // Randomly determine if the transaction is fraudulent
    setTransactionData(data);
    setFraudResult(isFraud ? 'Fraudulent' : 'Legitimate');
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        <TransactionForm onSubmit={handleFormSubmit} />
        <Dashboard transactionData={transactionData} fraudResult={fraudResult} />
      </main>
    </div>
  );
}

export default App;
