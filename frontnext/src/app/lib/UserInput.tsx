'use client';
import React, { useState, useEffect } from 'react';

interface SearchResult {
  [key: string]: any;
}

const SimpleApp: React.FC = () => {
  const [tableName, setTableName] = useState<string>('default_table');
  const [columnName1, setColumnName1] = useState<string>('column1');
  const [columnName2, setColumnName2] = useState<string>('column2');
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const createTable = async () => {
    const tableInfo = {
      table_name: tableName,
      columns: [
        { name: columnName1, type: 'TEXT' },
        { name: columnName2, type: 'TEXT' },
      ],
    };

    try {
      const response = await fetch('http://localhost:3001/create_table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableInfo),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(await response.json());
    } catch (error) {
      console.error('There was an error creating the table!', error);
    }
  };

  const handleInsert = async () => {
    const insertPayload = {
      table_name: tableName,
      data: {
        [columnName1]: input1,
        [columnName2]: input2,
      },
    };

    try {
      const response = await fetch('http://localhost:3001/insert_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertPayload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(await response.json());
    } catch (error) {
      console.error('There was an error inserting the data!', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?table_name=${tableName}&query=${query}`,
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
      console.error('There was an error fetching the results!', error);
    }
  };

  useEffect(() => {
    createTable(); // Create the table on component mount
  }, []);

  return (
    <div>
      <div>
        <h2>데이터 삽입</h2>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="입력1"
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="입력2"
        />
        <button onClick={handleInsert}>데이터 삽입</button>
      </div>

      <div>
        <h2>데이터 검색</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력"
        />
        <button onClick={handleSearch}>검색</button>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {Object.entries(result).map(([key, value]) => (
                <span key={key}>
                  {key}: {value},{' '}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SimpleApp;
