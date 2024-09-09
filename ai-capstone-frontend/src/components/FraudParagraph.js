import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FraudParagraph() {
  return (
    <div className="container">
      <p className="h1 font-weight-bold text-black text-center my-5">
        Please enter the required details in the form below to help us detect whether a particular transaction is likely to be a fraud.
      </p>
    </div>
  );
}

export default FraudParagraph;
