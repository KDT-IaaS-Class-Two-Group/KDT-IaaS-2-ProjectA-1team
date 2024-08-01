'use client';

import Image from 'next/image';
import HeaderSection from './ui/Header/headerSection';
import RenderLoginFormSection from './ui/RenderLoginFormSection';

export default function Home() {
  return (
    <div className="search-test">
      <header className="header">
        <h1>검색하기</h1>
        <Search />
      </header>
    </div>
  );
}
