import Image from 'next/image';
import HeaderSection from '../ui/Header/headerSection';
import TotalSidebar from '../ui/Modal-Test/TotalSidebar';
import EditList from '../lib/EditList';

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <EditList />
      <TotalSidebar />

    </div>

  );
}
