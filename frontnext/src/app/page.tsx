import Image from 'next/image';
<<<<<<< HEAD
import Tabs from '../app/lib/tabs';
import FormComponent from './ui/FormComponentTestFirst';
export default function Home() {
  return <FormComponent />;
=======
import DataComponent from './ui/renderTest';

export default function Home() {
  return (
    <div>
      <h1>데이터 요청 예제</h1>
      <DataComponent />
    </div>
  );
>>>>>>> AJAXServerTest
}
