import { useEffect } from 'react';
import sendData from './AJAX';

const FirstPage = () => {
  useEffect(() => {
    const sendHello = async () => {
      try {
        await sendData('http://localhost:3000/shot', { data: 'hello' });
      } catch (error) {
        console.error('Error sending hello:', error);
      }
    };
    sendHello();
  }, []);

  return (
    <div>
      <h1>First Page</h1>
    </div>
  );
};

export default FirstPage;
