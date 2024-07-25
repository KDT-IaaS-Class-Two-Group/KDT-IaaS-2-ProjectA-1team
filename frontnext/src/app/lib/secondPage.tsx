import { useEffect } from 'react';
import sendData from './AJAX';

const SecondPage = () => {
  useEffect(() => {
    const forwardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/shot');
        const data = await response.json();
        await sendData('http://localhost:3001/final', data);
      } catch (error) {
        console.error('Error forwarding data:', error);
      }
    };
    forwardData();
  }, []);

  return (
    <div>
      <h1>Second Page</h1>
    </div>
  );
};

export default SecondPage;
