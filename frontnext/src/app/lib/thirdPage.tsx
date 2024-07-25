import { useEffect } from 'react';
import sendData from './AJAX';

const ThirdPage = () => {
  useEffect(() => {
    const transformData = async () => {
      try {
        const response = await fetch('http://localhost:3001/final');
        const data = await response.json();
        const transformedData = { data: 'bye' };
        await sendData('http://localhost:3000/firstPage', transformedData);
      } catch (error) {
        console.error('Error transforming data:', error);
      }
    };
    transformData();
  }, []);

  return (
    <div>
      <h1>Third Page</h1>
    </div>
  );
};

export default ThirdPage;
