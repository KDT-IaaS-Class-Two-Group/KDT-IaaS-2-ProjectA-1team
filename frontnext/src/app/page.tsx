import Image from 'next/image';
import DataComponent from './ui/renderTest';

export default function Home() {
  return (
    <div>
      <h1>데이터 요청 예제</h1>
      <DataComponent />
    </div>
  );
}
