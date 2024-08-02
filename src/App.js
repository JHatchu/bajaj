import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    characters: true,
    numbers: true,
    highestAlphabet: true
  });
  const [isValidJson, setIsValidJson] = useState(true);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async () => {
    try {
      // Validate JSON
      const json = JSON.parse(input);
      setIsValidJson(true);

      // Make API request
      const result = await axios.post('https://your-render-app-url.onrender.com/bfhl', json);
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setIsValidJson(false);
      setError('Invalid JSON format.');
      setResponse(null);
    }
  };

  const handleSectionChange = (e) => {
    const { name, checked } = e.target;
    setVisibleSections((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <div>
        <h2>Enter JSON Data</h2>
        <textarea
          rows="5"
          cols="40"
          value={input}
          onChange={handleInputChange}
          placeholder='{"data":["A","C","z"]}'
        />
        <button onClick={handleSubmit}>Submit</button>
        {!isValidJson && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {response && (
        <div>
          <h2>Response</h2>
          <div>
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
          {visibleSections.characters && response.alphabets.length > 0 && (
            <div>
              <h3>Characters</h3>
              <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
            </div>
          )}
          {visibleSections.numbers && response.numbers.length > 0 && (
            <div>
              <h3>Numbers</h3>
              <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
            </div>
          )}
          {visibleSections.highestAlphabet && response.highest_alphabet.length > 0 && (
            <div>
              <h3>Highest Alphabet</h3>
              <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


