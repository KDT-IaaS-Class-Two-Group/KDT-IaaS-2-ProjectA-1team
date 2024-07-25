'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [hello, setHello] = useState('');
  const [bye, setBye] = useState('');

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetch('http://localhost:3000/shot');
        const data = await response.json();
        setHello(data.data);
      } catch (error) {
        console.error('Error fetching hello:', error);
      }
    };

    const fetchBye = async () => {
      try {
        const response = await fetch('http://localhost:3001/final');
        const data = await response.json();
        setBye(data.data);
      } catch (error) {
        console.error('Error fetching bye:', error);
      }
    };

    fetchHello();
    fetchBye();
  }, []);

  return (
    <div id="root">
      <p>{hello}</p>
      <p>{bye}</p>
    </div>
  );
}
