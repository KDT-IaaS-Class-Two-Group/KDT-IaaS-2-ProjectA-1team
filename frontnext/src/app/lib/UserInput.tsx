import React, { useState } from 'react';

interface UserInput {
  name: string;
  item: string;
  quantity: number;
  phone: string;
}

const SaveDataComponent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [item, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSaveData = async () => {
    const userInput: UserInput = {
      name: name,
      item: item,
      quantity: quantity,
      phone: phone,
    };

    try {
      const response = await fetch('http://localhost:3001/save_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setError(null);
    } catch (error) {
      console.error('There was an error saving the data!', error);
      setError('There was an error saving the data.');
    }
  };

  return (
    <div>
      <h2>데이터 저장</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="품목"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="수량"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="전화번호"
      />
      <button onClick={handleSaveData}>저장</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SaveDataComponent;
