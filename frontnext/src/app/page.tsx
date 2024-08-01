'use client';

import Image from 'next/image';
import HeaderSection from './ui/Header/headerSection';
import RenderLoginFormSection from './ui/RenderLoginFormSection';

import Search from './lib/search';
import SearchComponent from './lib/SearchComponent';
export default function Home() {
  return (
    <div>
      <h1>hrim+숫자1~3 을 검색 하세요.</h1>
      <SearchComponent />
    </div>
  );
}
