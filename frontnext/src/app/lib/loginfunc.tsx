export function checkCredentials(
  inputId: string,
  inputPassword: string,
  dbId: string,
  dbPassword: string,
  onError: (message: string) => void
): boolean {
  if (inputId === dbId) {
    if (inputPassword === dbPassword) {
      return true; // 로그인 성공
    } else {
      onError("비밀번호가 일치하지 않습니다. 다시 시도해주세요."); // 비밀번호가 일치하지 않을 때
      return false;
    }
  } else {
    onError("아이디가 일치하지 않습니다. 다시 시도해주세요."); // 아이디가 일치하지 않을 때
    return false;
  }
}
