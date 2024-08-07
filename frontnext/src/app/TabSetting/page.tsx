import Image from 'next/image';
import HeaderSection from '../ui/Header/headerSection';
import PasswordChangeForm from '../lib/PWChangeForm';
export default function Home() {
  return (
    <>
      <HeaderSection />
      <PasswordChangeForm />
      <h1>Hellow TabSetting</h1>
    </>
  );
}
