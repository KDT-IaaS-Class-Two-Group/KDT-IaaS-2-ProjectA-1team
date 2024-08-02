import Image from 'next/image';
import Tabs from '../app/lib/tabs';
import RenderLoginFormSection from './ui/RenderLoginFormSection';

import Search from './lib/search';
import UserInput from './lib/UserInput';
export default function Home() {
  return (
    <div className="search-test">
      <header className="header">
        <UserInput />
      </header>
    </div>
  );
}
