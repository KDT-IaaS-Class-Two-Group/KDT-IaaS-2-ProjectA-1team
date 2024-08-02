'use client'; // 클라이언트 컴포넌트로 설정

import Image from 'next/image';
import LoginFormSection from './ui/loginFormSection/loginFormSection';
import SimpleApp from './lib/UserInput';
import SelectBox from './lib/TableSelectBox'; // 클라이언트 컴포넌트 import

export default function Home() {
  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <>
      <SelectBox
        label="Select an option"
        options={['Option 1', 'Option 2', 'Option 3']}
        onChange={handleSelectChange}
      />
    </>
  );
}
