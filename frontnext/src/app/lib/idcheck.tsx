console.log(
  "아이디가 정확한가 확인하기, 입력받은 아이디와 비밀번호가 있을 때, DB에서 id, password를 뽑아와서 쭉 중복검사를 하고 둘다 일치하는 경우 dummi.tsx로 이동 필요함 만약 정확하지 않은 경우 1 아이디 또는 비밀번호가 일치하지 않습니다 or 빈 칸이 있습니다."
);
최상위 폴더는 KDT-IaaS-2-ProjectA-1team 야

이 파일의 경로는
KDT-IaaS-2-ProjectA-1team > frontnext > src > app > lib > idcheck.tsx 이고
KDT-IaaS-2-ProjectA-1team > database > login.db 에서 adminData 의 id, password 를 읽어와서 아이디와 비밀번호의 일치 유무를 파악하는게 일이야
내가 짜본 형식은 아래와 같아
function a (id, password) {
  if (db에서 읽어온 id === id) {
    if(db에서 읽어온 password === password){
      dummi.tsx 쪽으로 페이지 이동
    } else {
      span 모달 창을 열어서 "비밀번호가 일치하지 않습니다. 다시 시도해주세요." 를 띄우기 
    }
  } else {
    span 모달 창을 열어서 "아이디가 일치하지 않습니다. 다시 시도해주세요"를 띄우기
  }
}

또, 이 파일을 나눈다면 db에서 데이터를 읽어오는 부분만 파일로 만들고 id와 password를 입력 받을 수 있는 function 을 만들고, 한 곳에 모아서 읽어온 데이터를 함수에 넣어서 