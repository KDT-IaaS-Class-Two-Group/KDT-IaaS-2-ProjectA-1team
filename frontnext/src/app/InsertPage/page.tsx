import Image from 'next/image';
import HeaderSection from '../ui/Header/headerSection';
import TableModal from '../ui/modal/components/tableModal';

export default function Home() {
  return (
    <>
      <HeaderSection />
      <TableModal />
    </>
  );
}
