import React, { useState } from 'react';

export default function CheckoutPage() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Customer Info:', customerInfo);
  };

  return (
    <div className='container mx-auto my-3 '>

      <div className="checkout_wrapper max-w-2xl bg-white p-4 mx-auto">
      <h1>Checkout Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={customerInfo.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={customerInfo.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={customerInfo.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Payment Method:</label>
          <select name="paymentMethod" value={customerInfo.paymentMethod} onChange={handleChange}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}
