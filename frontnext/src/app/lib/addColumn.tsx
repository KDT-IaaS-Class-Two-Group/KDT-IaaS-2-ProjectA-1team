'use client';

import React, { useState } from 'react';

const ButtonSection: React.FC = () => {
  const [columnName, setColumnName] = useState("");
  const [rowData, setRowData] = useState({ name: "" });

  const addColumn = async () => {
    if (!columnName) {
      alert("Column name must be provided.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/add-column/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ column_name: columnName }),
      });

      if (response.ok) {
        alert('열추가 완료');
      } else {
        const errorText = await response.text();
        alert(`열추가 실패: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('열추가 중 오류 발생');
    }
  };

  const deleteColumn = async () => {
    if (!columnName) {
      alert("Column name must be provided.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/delete-column/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ column_name: columnName }),
      });

      if (response.ok) {
        alert('열삭제 완료');
      } else {
        const errorText = await response.text();
        alert(`열삭제 실패: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('열삭제 중 오류 발생');
    }
  };


  return (
    <div>
      <div>
        <input 
          type="text" 
          value={columnName} 
          onChange={(e) => setColumnName(e.target.value)} 
          placeholder="열 이름 입력"
        />
        <button onClick={addColumn}>열추가</button>
        <button onClick={deleteColumn}>열삭제</button>
      </div>
    </div>
  );
};

export default ButtonSection;
