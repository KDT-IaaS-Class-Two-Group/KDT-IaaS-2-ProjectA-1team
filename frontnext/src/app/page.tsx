import Image from 'next/image';
import { checkCredentials } from './lib/loginfunc';
import { readDataFromLogin } from './lib/SelectData';

export default function Home() {
  const inputId = 'id';
  const inputPassword = 'password';
  const dbId = 'adminData';
  let rufrhk = '';

  const isLoginSuccessful = checkCredentials([inputId, inputPassword], dbId);

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
