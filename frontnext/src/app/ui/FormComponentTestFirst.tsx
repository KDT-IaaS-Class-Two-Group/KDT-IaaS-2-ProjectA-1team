'use client';

import React, { useState } from 'react';

const FormComponent = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create the payload
    const payload = {
      id,
      password,
    };

    try {
      // Send POST request
      const response = await fetch('http://localhost:8000/searchData/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse response
      const result = await response.json();

      if (result === true) {
        setMessage('Hello World');
        setIsSuccess(true);
      } else if (result === false) {
        setMessage('Response Failed');
        setIsSuccess(false);
      } else {
        setMessage('Unexpected response');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Error occurred');
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {message === null ? (
        <form
          className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              ID
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your ID"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h1
            className={`text-${isSuccess ? 'blue' : 'red'}-500 text-4xl font-bold`}
          >
            {message}
          </h1>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
