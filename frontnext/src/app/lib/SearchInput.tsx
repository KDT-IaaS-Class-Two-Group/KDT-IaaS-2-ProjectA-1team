'use client'; // 클라이언트 컴포넌트로 설정

import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div>
      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter search term" // placeholder 추가
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchInput;
