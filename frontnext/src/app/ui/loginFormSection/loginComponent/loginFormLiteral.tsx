export const LoginFormText = {
  form: {
    valueID: '아이디',
    valuePassword: '비밀번호',
    submitButton: '로그인',
    buttonType: 'submit' as 'submit',
    inputTypeT: 'text',
    inputTypeP: 'password',
    nameI: 'id',
    password: 'passowrd',
    placeholders: {
      id: 'ID를 입력하세요',
      password: 'password를 입력하세요',
    },
  },
  AJAXReq: {
    url: '8000/searchData/login',
    method: 'POST',
  },
  route: '/viewRef',
};
