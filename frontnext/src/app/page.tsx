'use client';

import Image from 'next/image';
import HeaderSection from './ui/Header/headerSection';
import RenderLoginFormSection from './ui/RenderLoginFormSection';

import Search from './lib/search';
import SearchComponent from './lib/SearchComponent';
export default function Home() {
  return (
    <div>
      <RenderLoginFormSection />
    </div>
  );
}
