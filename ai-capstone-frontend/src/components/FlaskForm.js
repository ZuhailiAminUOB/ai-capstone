import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FlaskForm = () => {
  const [formData, setFormData] = useState({
    distance_from_home: '',
    distance_last_transaction: '',
    ratio_median_purchase_price: '',
    repeat_retailer: '',
    used_chip: '',
    used_pin: '',
    online_order: ''
  });
  
  const [prediction, setPrediction] = useState('');
  const [dbResult, setDbResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setPrediction(response.data.prediction);
        setDbResult(response.data.database_result);
      } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container">
      <form className="transaction-form text-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Distance of transaction from home:
            <input
              type="number"
              className="form-control"
              name="distance_from_home"
              value={formData.distance_from_home}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Distance from last transaction:
            <input
              type="number"
              className="form-control"
              name="distance_last_transaction"
              value={formData.distance_last_transaction}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Ratio to median purchase price:
            <input
              type="text"
              className="form-control"
              name="ratio_median_purchase_price"
              value={formData.ratio_median_purchase_price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Repeat Retailer?
            <select
              className="form-select"
              name="repeat_retailer"
              value={formData.repeat_retailer}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Was a credit card used in the transaction?
            <select
              className="form-select"
              name="used_chip"
              value={formData.used_chip}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Did the transaction involve using your card's PIN number?
            <select
              className="form-select"
              name="used_pin"
              value={formData.used_pin}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Was the transaction an online order?
            <select
              className="form-select"
              name="online_order"
              value={formData.online_order}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-outline-light">Submit</button>
      </form>
      
      {prediction && (
        <div className="mt-4">
          <h3>Prediction: {prediction}</h3>
          <h4>Database Result: {dbResult}</h4>
        </div>
      )}
    </div>
  );
};

export default FlaskForm;
