// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [visibleSections, setVisibleSections] = useState({
    characters: true,
    numbers: true,
    highestAlphabet: true
  });

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonInput);
      setError('');
      const res = await fetch('https://your-backend-url.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      setResponse(result);
    } catch (e) {
      if (e instanceof SyntaxError) {
        setError('Invalid JSON format');
      } else {
        console.error('Error:', e);
      }
    }
  };

  const handleSectionChange = (e) => {
    const { name, checked } = e.target;
    setVisibleSections(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const renderResults = () => {
    if (!response) return null;

    const { status, user_id, email, roll_number, numbers, alphabets, highest_alphabet } = response;

    return (
      <div className="results-display">
        <h2>Results</h2>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>User ID:</strong> {user_id}</p>
        <p><strong>College Email ID:</strong> {email}</p>
        <p><strong>College Roll Number:</strong> {roll_number}</p>
        {visibleSections.numbers && <p><strong>Numbers:</strong> {numbers.join(', ')}</p>}
        {visibleSections.characters && <p><strong>Alphabets:</strong> {alphabets.join(', ')}</p>}
        {visibleSections.highestAlphabet && <p><strong>Highest Alphabet:</strong> {highest_alphabet.join(', ')}</p>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Data Processor</h1>
      <div className="input-form">
        <h2>Submit Data</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={handleChange}
            placeholder='Enter JSON data (e.g., {"data": ["A", "C", "z"]})'
            rows="5"
            cols="50"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="dropdown-menu">
        <h2>Select Sections to Display</h2>
        <label>
          <input
            type="checkbox"
            name="characters"
            checked={visibleSections.characters}
            onChange={handleSectionChange}
          />
          Characters
        </label>
        <label>
          <input
            type="checkbox"
            name="numbers"
            checked={visibleSections.numbers}
            onChange={handleSectionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            name="highestAlphabet"
            checked={visibleSections.highestAlphabet}
            onChange={handleSectionChange}
          />
          Highest Alphabet
        </label>
      </div>
      {renderResults()}
    </div>
  );
};

export default App;
