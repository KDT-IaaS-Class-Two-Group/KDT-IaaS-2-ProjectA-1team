'use client';

import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const storedValue = localStorage.getItem('inputData');
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('inputData', inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>
      {inputValue && <div id="userName">{inputValue}</div>}
    </div>
  );
};

export default App;
