/*
전역으로 사용되는 상수) toggleButton, sideNavigation
*/
const toggleButton = document.querySelector('i.toggle');
const sideNavigation = document.querySelector('nav');

/*
HTML 문서를 읽고 DOM 트리를 완성하는 즉시 (DOMContentLoaded)
localStorage에 저장된 sideNavigation 상태를 브라우저에 반영 후 
body 요소의 visibility를 visible로 수정
*/
document.addEventListener('DOMContentLoaded', () => {
  const savedState = JSON.parse(localStorage.getItem('state')).sideNavigation;
  if (savedState === 'active') {
    sideNavigation.classList.add('active');
  }

  document.body.style.visibility = 'visible';
});

/*
초기 렌더링이 끝난 후 (일반적으로 load 시점이 DOMContentLoaded 보다 늦음)
body 요소의 preload 클래스 삭제
*/
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

/*
toggleButton에 클릭 이벤트가 발생할 때마다
sideNavigation 요소에 active 클래스를 반전
(toggle 메소드는 active 클래스가 있으면 삭제, 없으면 추가)
*/
toggleButton.addEventListener('click', () => {
  sideNavigation.classList.toggle('active');
});

/* 
사용자가 페이지를 닫거나 이동하려고 할 때 (beforeunload)
sideNavigation 상태를 localStorage에 저장
*/
window.addEventListener('beforeunload', () => {
  const newState = sideNavigation.classList.contains('active')
    ? JSON.stringify({ sideNavigation: 'active' })
    : JSON.stringify({ sideNavigation: 'inactive' });
  localStorage.setItem('state', newState);
});
