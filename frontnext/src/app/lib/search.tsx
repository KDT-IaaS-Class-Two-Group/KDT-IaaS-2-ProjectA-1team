'use client';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

// 검색 컴포넌트
const Search: React.FC = () => {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [results, setResults] = useState<string[]>([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  // 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value); // 검색어 상태 업데이트
  };

  // 폼 제출 시 호출되는 핸들러
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 방지
    setLoading(true); // 로딩 상태 활성화
    setError(null); // 오류 상태 초기화

    try {
      // 검색 요청
      const response = await axios.get('http://localhost:3001/search', {
        params: { query },
      });
      setResults(response.data.results); // 검색 결과 상태 업데이트
    } catch (err) {
      console.error('There was an error fetching the results!', err);
      setError('검색하신 내용이 없습니다.'); // 오류 상태 업데이트
    } finally {
      setLoading(false); // 로딩 상태 비활성화
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
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
