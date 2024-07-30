import Image from 'next/image';
import Tabs from '../app/lib/tabs';
// import RenderLoginFormSection from './ui/RenderLoginFormSection';

import Search from './lib/search';
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
