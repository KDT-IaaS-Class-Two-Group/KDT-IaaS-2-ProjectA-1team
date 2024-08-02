'use client';

import HeaderSection from '../ui/Header/headerSection';
import { TabToggle } from '../ui/toggle/tabToggle';

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <main>
        {/* <h1>Hellow View</h1> */}
        <TabToggle />
      </main>
    </div>
  );
}
