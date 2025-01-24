import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Bt from "../../common/Bt";
import EmptyList from "./EmptyList";

const MenuBox = styled.div`
  width: 100%;
  height: 70px;
  margin: 10px 0px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  
  .info-box{
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .price-box{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .menu-img{
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
  }
  .name{
    font-size: 1.3rem;
    font-weight: 500;
  }
  .menu-info{
    font-size: 1rem;
    color: #7e8080;
  }
`;

function MenuItem({ shopIdx }) {
  // 상품 리스트
  const [menus, setMenus] = useState([]);

  // 상품 리스트 호출
  const getMenus = () => {
    axios.get(`${process.env.REACT_APP_REQUEST_URL}/api/menu/${shopIdx}`)
      .then((res) => {
        setMenus(res.data);
      })
  }

  // 상품 1건 삭제
  const removeMenu = (menuIdx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`${process.env.REACT_APP_REQUEST_URL}/api/menu/${menuIdx}`)
        .then((res) => {
          alert(res.data.msg);
          getMenus();
        }).catch((err) => {
          alert(err.response.data.detail);
        })
    }
  }

  // 로드와 동시에 상품리스트 조회
  useEffect(() => {
    getMenus();
  }, []);
  return (
    menus.length === 0 ? <EmptyList title="메뉴" /> :
      menus && menus.map((menu, index) => {
        return (
          <MenuBox key={index}>
            <div className="info-box">
              <img src={`${process.env.REACT_APP_IMG_URL}/resources/data/${menu.menuImage}`} alt=".." className="menu-img" />
              <div>
                <div>
                  <label className="name">{menu.menuName}</label>
                </div>
                <div>
                  <label className="menu-info">{menu.menuDesc}</label>
                </div>
              </div>
            </div>
            <div className="price-box">
              {/* 정규식 이용 3자리 숫자마다 콤마 */}
              <label className="name">{menu.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</label>
            </div>
            <div>
              <Bt
                btName="삭제"
                color="#f0a779"
                onClick={() => removeMenu(menu.menuIdx)}
              />
            </div>
          </MenuBox>
        )
      })
  )
}

export default MenuItem;