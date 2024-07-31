import React from 'react';
// import './App.css';
import Search from './search';

const App: React.FC = () => {
  return (
    <div className="search-test">
      <header className="header">
        <h1>과일 이름 검색하기 </h1>
        <Search />
      </header>
    </div>
  );
};

export default App;
