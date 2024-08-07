'use client';
import React, { useState } from 'react';

// Define the type for search results
interface SearchResult {
  name: string;
  age: number;
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('에러 발생!', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="hrim+숫자를 검색하세요"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.name} = {result.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
