import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header.tsx';

const CheckoutPage: React.FC = () => {
  const location = useLocation();
const { selectedHotel, check_in, check_out, rooms, adults } = location.state || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default payment method is Credit Card
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch('/api/checkout-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccessMessage('Booking successfully created.');
      console.log('Booking response:', data);
    } catch (error) {
      setErrorMessage(`Booking failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Container for the form and hotel information */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="md:w-2/3 md:pr-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center uppercase tracking-wide mb-6">
              Checkout
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Postal/Zip Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Payment Method
                </h3>
                <label
                  className={`flex items-center space-x-3 border ${
                    paymentMethod === 'credit_card'
                      ? 'border-blue-600'
                      : 'border-gray-300'
                  } rounded-lg p-4 cursor-pointer transition`}
                >
                  <input
                    type="radio"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />
                  <div className="text-blue-600 font-semibold">Credit Card</div>
                </label>
              </div>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Hotel Info Section */}
          {selectedHotel && (
            <div className="md:w-1/3 bg-gray-100 rounded-lg p-6 mt-6 md:mt-0 md:ml-4">
              <h3 className="text-xl font-semibold mb-4">Selected Hotel</h3>
              <p className="text-gray-700">
                <strong>Name:</strong> {selectedHotel.details?.hotel?.name}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {selectedHotel.details?.hotel?.cityCode}
              </p>
              <p className="text-gray-700">
                <strong>Coordinates:</strong> Latitude: {selectedHotel.details?.hotel?.latitude}, Longitude: {selectedHotel.details?.hotel?.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
