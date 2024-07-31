이 파일은 import하여 사용될 파일입니다. 즉 export되어야합니다.
이 파일은 useRoute기능을 자유롭게 사용하기 위해서 만듭니다.

버튼의 온클릭함수에 할당할 함수를 내보낼 것입니다.
기능 매개변수 {
  라우트를 매개변수에 푸시한다.
  예시)
  <ButtonClick onclickFunc={기능} className={테일윈드} textNode={조회} />
  라고한다면 클릭이벤트가 발생하면 route기능으로 해당 페이지로 이동할 것입니다.
}