import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
          Support
        </h1>

        {/* Support Form */}
        {!isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Need help? Contact us!</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="5"
                  placeholder="Describe your issue"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-green-500">
              Thank you! We will get back to you soon.
            </h2>
          </div>
        )}

        {/* FAQs and Live Chat */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  <strong>How can I reset my password?</strong>
                  <p>Go to the login page, click "Forgot Password", and follow the instructions.</p>
                </li>
                <li className="mb-2">
                  <strong>Where can I find my invoice?</strong>
                  <p>You can find your invoice in your account's billing section.</p>
                </li>
                <li className="mb-2">
                  <strong>How can I cancel my subscription?</strong>
                  <p>Visit the account settings page and click "Cancel Subscription".</p>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
              <p className="mb-4">Try live chat for real-time support!</p>
              <Link to="/LiveChat">
              <button className=" bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600">
                Start Live Chat
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
