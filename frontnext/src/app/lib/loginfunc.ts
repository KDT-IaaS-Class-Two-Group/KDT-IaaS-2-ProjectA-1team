export function checkCredentials(
  inputId: string,
  inputPassword: string,
  dbId: string,
  dbPassword: string,
): boolean {
  if (inputId === dbId) {
    if (inputPassword === dbPassword) {
      return true; // 로그인 성공
    } else {
      alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
      return false;
    }
  } else {
    alert('아이디가 일치하지 않습니다. 다시 시도해주세요.');
    return false;
  }
}

// 사용 예시

// export default function Home() {
//   const inputId = 'id';
//   const inputPassword = 'password';
//   const dbId = 'adminData';
//   let rufrhk = '';

//   const isLoginSuccessful = checkCredentials([inputId, inputPassword], dbId);

//   if (isLoginSuccessful) {
//     rufrhk = '로그인 성공';
//   } else {
//     rufrhk = '로그인 실패';
//   }
