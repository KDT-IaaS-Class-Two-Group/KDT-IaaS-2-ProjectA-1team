'use client';
import Image from 'next/image';
import HeaderSection from '../ui/Header/headerSection';
import TotalSidebar from './components/tableRender/RenderTable';
import { LanguageProvider } from '../ui/SettingMoules/LanguageContext';

export default function Home() {
  return (
    <LanguageProvider>
      <HeaderSection />
      <TotalSidebar />
    </LanguageProvider>
  );
}
