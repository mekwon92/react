import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Bt from "../../common/Bt";
import DaumPost from "../../common/DaumPost";
import Images from "../../common/Images";
import Input from "../../common/Input";

const InputContainer = styled.div`
  width: 50%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 15px;
  text-align: 

  -webkit-box-shadow: 0px 0px 5px -1px #000000; 
  box-shadow: 0px 0px 5px -1px #000000;
`;


function ShopForm() {
  //매장의 기본정보 state
  const [shopName, setShopName] = useState("");
  const [shopCall, setShopCall] = useState("");
  const [shopStart, setShopStart] = useState("");
  const [shopEnd, setShopEnd] = useState("");

  //매장의 주소 state
  const [addressObj, setAddressObj] = useState({
    areaAddress: '',
    townAddress: ''
  });

  //좌표 state
  const [locationObj, setLocationObj] = useState({
    locationX: 0,
    locationY: 0
  });

  //매장 대표이미지 state : images.jsx의 선택이미지가 달라질 경우에 상태 갱신
  const [files, setFiles] = useState([]);

  //매장등록 요청 함수
  const registShop = () => {
    if(files.length === 0){
      alert("사진을 선택해주세요.");
      return;
    }

    if (window.confirm("등록하시겠습니까?")) {
      //파라미터 세팅
      let formData = new FormData();
      formData.append("businessIdx", localStorage.getItem("businessIdx"));
      formData.append("shopArea", addressObj.areaAddress);
      formData.append("shopTown", addressObj.townAddress);
      formData.append("shopLati", locationObj.locationY);
      formData.append("shopLongi", locationObj.locationX);
      formData.append("shopName", shopName);
      formData.append("shopCall", shopCall);
      formData.append("shopStart", shopStart);
      formData.append("shopEnd", shopEnd);

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      //비동기 요청
      axios.post(`${process.env.REACT_APP_REQUEST_URL}/api/shop`, formData, {
        //multipart 데이터 전달 시 설정
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        alert(response.data.msg);
        window.location.href = "/admin";
      }).catch((error) => {
        alert(error);
      }).finally(() => setFiles([]));
    }
  }
  return (
    <InputContainer>
      <div style={{ width: "80%" }}>
        <Input
          type="text"
          placeholder="지역주소"
          name="shopArea"
          // 도, 시, 군, 구에 대한 주소 출력
          value={addressObj.areaAddress}
          readOnly={true}
        />
        {/* Daum Post 컴포넌트의 결과를 적용할 state 함수 전달 */}
        <DaumPost setAddressObj={setAddressObj} setLocationObj={setLocationObj} />
        <Input
          type="text"
          placeholder="상세주소"
          name="shopTown"
          // 지역주소를 제외한 상세주소 출력
          value={addressObj.townAddress}
          readOnly={true}
        />
        <input type="hidden" name="shopLati" value={locationObj.locationY} />
        <input type="hidden" name="shopLongi" value={locationObj.locationX} />
      </div>
      <Input
        type="text"
        placeholder="매장명"
        name="shopName"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="매장전화번호"
        name="shopCall"
        value={shopCall}
        onChange={(e) => setShopCall(e.target.value)}
      />
      <Input
        type="number"
        placeholder="24시간 기준으로 작성해주세요.(ex: 오전 8시 = 08)"
        name="shopStart"
        value={shopStart}
        onChange={(e) => setShopStart(e.target.value)}
      />
      <Input
        type="number"
        placeholder="24시간 기준으로 작성해주세요.(ex: 오후 8시 = 20)"
        name="shopEnd"
        value={shopEnd}
        onChange={(e) => setShopEnd(e.target.value)}
      />
      <Images setFiles={setFiles} />
      <Bt type="button" btName="등록하기" onClick={registShop} />
    </InputContainer>
  );
}

export default ShopForm;