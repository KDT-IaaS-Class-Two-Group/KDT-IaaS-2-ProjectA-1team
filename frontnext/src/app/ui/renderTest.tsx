'use client';

import { useState } from 'react';
import { searchData, ErrorResponse } from '../lib/AJAXTest';

const DataComponent = () => {
  const [data, setData] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const response = await searchData();
    if (typeof response === 'string') {
      try {
        const parsedData = JSON.parse(response);
        setData(parsedData);
        setError(null);
      } catch (e) {
        setError('Failed to parse JSON');
      }
    } else {
      setError(response.errorMessage);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>데이터 요청</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataComponent;
