import Image from 'next/image';
import { checkCredentials } from './lib/loginfunc';

export default function Home() {
  const inputId = 'admin';
  const inputPassword = '1234';
  const dbId = 'admin';
  const dbPassword = '1234';
  let rufrhk = '';

  const isLoginSuccessful = checkCredentials(
    inputId,
    inputPassword,
    dbId,
    dbPassword,
  );

  if (isLoginSuccessful) {
    rufrhk = '로그인 성공';
  } else {
    rufrhk = '로그인 실패';
  }

  return (
    <div id="root">
      <p>{rufrhk}</p>
    </div>
  );
}
