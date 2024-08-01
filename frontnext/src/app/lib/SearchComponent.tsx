'use client';
import React, { useState } from 'react';
import axios from 'axios';

// Define the type for search results
interface SearchResult {
  name: string;
  age: number;
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<any>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get<{ results: SearchResult[] }>(
        `http://localhost:3001/search?query=${query}`,
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('There was an error fetching the results!', error);
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
