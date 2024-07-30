'use client';
import React, { useState } from 'react';

// 검색 컴포넌트
const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const data = ['사과', '바나나', '참외', '수박', '복숭아', '딸기'];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query) {
      const filteredResults = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
