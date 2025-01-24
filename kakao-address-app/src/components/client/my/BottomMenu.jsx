import SideBarMenu from "./BottomList";
function BottomMenu({adminPage}) {
  /*
    -사이드바 메뉴 구성을 위한 객체
    -title: 메뉴 상단 타이틀
    -sub : 상단 타이틀의 하위 메뉴
    -link : 클릭 시 이동할 path 경로
    -icon : 하위 메뉴와 일치하는 아이콘 jsx
  */
  const menu = [
    {
      title: '관심메뉴',
      sub: ['예약내역', '관심 서핑샵', '관심 뽐내기'],
      link: ['...', '...', '...'] //각 페이지별 to 속성의 경로를 지정
    },
    {
      title: '고객센터',
      sub: ['입점신청', '매장관리', '공지사항'],
      link: ['/my/regist-shop', '/admin', '...'] //각 페이지별 to 속성의 경로를 지정
    },
  ];
  return (
    <div>
      {/* 객체의 길이만큼 반복문 실행 */}
      {menu && menu.map((menu, index) => {
        return (
          <SideBarMenu
            menu={menu} //메뉴 객체 자체를 props로 전달
            key={index}
            adminPage={adminPage}
          />
        )
      })}
    </div>
  );
}

export default BottomMenu;