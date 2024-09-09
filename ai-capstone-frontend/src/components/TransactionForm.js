import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TransactionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    amount: '',
    transactionType: '',
    accountNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="transaction-form text-light" onSubmit={handleSubmit}>
      <label>
        Distance of transaction from home:
        <input
          type="text"
          name="distance_from_home"
          value={formData.distance_from_home}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Distance from last transaction:
        <input
          type="text"
          name="distance_from_last_transaction"
          value={formData.distance_from_last_transaction}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Ratio to median purchase price:
        <input
          type="text"
          name="ratio_to_median_purchase_price"
          value={formData.ratio_to_median_purchase_price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Repeat Retailer?
        <select
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
      <label>
        Was a credit card used in the transaction?
        <select
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
      <label>
        Did the transaction involve using your card's PIN number?
        <select
          name="used_pin_number"
          value={formData.used_pin_number}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </label>
      <label>
        Was the transaction an online order?
        <select
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
      <button type="button" class="btn btn-primary text-light">Submit</button>
    </form>
  );
}

export default TransactionForm;
