import styled from "styled-components";
import ClientContainer from "../../common/ClientContainer";
import Footer from "../main/Footer";
import Topbar from "../main/topbar/Topbar";
import Input from "../../common/Input";
import DaumPost from "../../common/DaumPost";
import { useState } from "react";
import Bt from "../../common/Bt";
import {accessClient} from "../../../App";

const InputBox = styled.div`
  width: 60%;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  .title{
    font-size: 2rem;
    font-weight: bold;
    border-bottom: 2px solid #7ca2eb;
  }
  &.center{
    justify-content: center;
  }
`;

const InfoLabel = styled.label`
  font-size: 0.8rem;
  color: ${props => props.color};
`;

const ImageLabel = styled.label`
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  background: #7ca2eb;
  color: white;
  cursor: pointer;
  
  > input {
    display: none;
  }
`;


function MemberProfile() {
  // 정규식 및 유효성 체크 성공 여부에 따른 info 컬러 변수---------------------------------------------
  const trueColor = "#7ca2eb";
  const falseColor = "#f0a779";

  // 회원가입 서버 요청 시 전달할 회원 정보------------------------------------------------------------
  const [memberId, setMemberId] = useState("");
  const [memberPass, setMemberPass] = useState("");
  const [memberName, setMemberName] = useState("");
  const [image, setImage] = useState("");
  const [addressObj, setAddressObj] = useState({
    areaAddress: "",
    townAddress: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /*정규식 및 유효성 검증을 위한 state-----------------------------------------------------------------
    -xxCheck : 아이디 및 비밀번호 등 정규식 통과 여부
    -xxInfo : 정규식 여부에 따른 안내 메세지
    -confirmPass : 비밀번호 재확인 state
  */
  const [passCheck, setPassCheck] = useState(""); //비밀번호
  const [phoneNoCheck, setPhoneNoCheck] = useState(false); //휴대폰번호
  const [emailCheck, setEmailCheck] = useState(false); //이메일인증
  const [phoneCheck, setPhoneCheck] = useState(false); //휴대폰인증
  const [totalCheck, setTotalCheck] = useState(true); //위 모든 사항에 대한 논리값
  const [passInfo, setPassInfo] = useState("");
  const [smsInfo, setSmsInfo] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // 메일, 문자 인증코드
  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");

  // 패스워드 정규식 및 일치여부 검사-------------------------------------------------------------------
  const handleMemberPass = (e) => {
    const currentPass = e.target.value;
    const passRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    if (!passRegExp.test(currentPass)) {
      setPassInfo("숫자/영문자/특수문자 조합으로 8~15자 이내로 입력해주세요!");
      setPassCheck(false);
    } else {
      setPassInfo("안전한 비밀번호입니다.");
      setPassCheck(true);
    }
    setMemberPass(currentPass);
  }

  // 비밀번호 입력 일치 여부 검사-----------------------------------------------------------------------
  const handleConfirmPass = (e) => {
    const currentConfirm = e.target.value;

    if (memberPass !== currentConfirm) {
      setPassInfo("비밀번호가 일치하지 않습니다!");
      setPassCheck(false);
    } else {
      console.log(currentConfirm);
      setPassInfo("비밀번호가 일치합니다.");
      setPassCheck(true);
    }
    setConfirmPass(currentConfirm);
  }

  // 휴대폰 번호 입력 일치 여부 검사--------------------------------------------------------------------
  const handlePhone = (e) => {
    const currentPhone = e.target.value;
    const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setSmsInfo("올바른 형식이 아닙니다!");
      setPhoneNoCheck(false);
    } else {
      setSmsInfo("올바르게 입력되었습니다.");
      setPhoneNoCheck(true);
    }
    setPhone(currentPhone);
  };

  // 인증 이메일 발송 요청------------------------------------------------------------------------------
  const sendEmail = async () => {
    if (email === "") {
      alert("이메일을 입력하세요.");
      return;
    }
    const response = await accessClient.get(`${process.env.REACT_APP_REQUEST_URL}/api/client/join/email${email}/`);
    alert(response.data.msg);
  }

  // 인증번호 확인 요청---------------------------------------------------------------------------------
  const checkEmail = async () => {
    if (emailCode === "") {
      alert("인증번호를 입력하세요.");
      return;
    }

    const response = await accessClient.get(`${process.env.REACT_APP_REQUEST_URL}/api/client/join/email-auth/${emailCode}`);
    alert(response.data.msg);
    if (response.data.code === 1) {
      setEmailCheck(true);
    }
  }

  // 인증문자 발송 요청
  const sendSms = async () => {
    if (phone === "") {
      alert("휴대폰 번호를 입력하세요.");
      return;
    }
    console.log(phone);
    const response = await accessClient.get(`${process.env.REACT_APP_REQUEST_URL}/api/client/join/sms/${phone}`);
    alert(response.data.msg);
    setSmsInfo("");
  }

  // 문자 인증번호 확인
  const checkSms = async () => {
    if (smsCode === "") {
      alert("인증번호를 입력하세요.");
      return;
    }

    const response = await accessClient.get(`${process.env.REACT_APP_REQUEST_URL}/api/client/join/sms-auth/${smsCode}`);
    alert(response.data.msg);
    if (response.data.code === 1) {
      setPhoneCheck(true);
    }
  }

  //회원정보 수정
  const registMember = async () => {
    let formData = new FormData();

    //수정내용이 있는 경우에만 전송 데이터에 포함
    if(memberPass != "") formData.append("memberPass", memberPass);
    if(memberName != "") formData.append("memberName", memberName);
    if(addressObj.areaAddress != "") formData.append("localAddress", addressObj.areaAddress);
    if(addressObj.townAddress != "") formData.append("detailAddress", addressObj.townAddress);
    if(phone != "") formData.append("phoneNo", phone);
    if(email != "") formData.append("email", email);
    if(image != "")formData.append("image", image);
    console.log(image);


    //비동기 요청
    await accessClient.post(`${process.env.REACT_APP_REQUEST_URL}/api/client/token/member`, formData, {
      //multipart 데이터 전달 시 설정
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      alert(response.data.msg);
      window.location.href = "/my";
    }).catch((error) => {
      alert(error.response.data.detail);
    }).finally(() => setImage(""));
  }

  return (
    <>
      <Topbar />
      <ClientContainer>
        <InputBox>
          <span className="title">프로필 수정</span>
        </InputBox>

        <InputBox>
          <Input
            value={memberId}
            width="70%"
            mb="0px"
            dis={true}
          />
          <ImageLabel>
            이미지수정
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </ImageLabel>
        </InputBox>
        <InputBox>
          <InfoLabel color={falseColor}>
            아이디 수정은 불가능 합니다.
          </InfoLabel>
        </InputBox>
        {/* /.ID 입력 영역 */}

        {/* 비밀번호 입력 영역 */}
        <InputBox>
          <Input
            type="password"
            placeholder="변경하실 비밀번호를 입력하세요."
            value={memberPass}
            onChange={handleMemberPass}
            width="70%"
            mb="0px"
          />
        </InputBox>
        <InputBox>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
            value={confirmPass}
            onChange={handleConfirmPass}
            width="70%"
            mb="0px"
          />
        </InputBox>
        <InputBox color="#7ca2eb">
          <InfoLabel color={passCheck ? trueColor : falseColor}>
            {passInfo}
          </InfoLabel>
        </InputBox>
        {/* /.비밀번호 입력 영역 */}

        {/* 주소 입력 영역 */}
        <InputBox>
          <Input
            type="text"
            value={addressObj.areaAddress}
            readOnly={true}
            name="localAddress"
            mb="0px"
          />
          <DaumPost
            setAddressObj={setAddressObj}
          />
        </InputBox>
        <InputBox>
          <Input
            type="text"
            value={addressObj.townAddress}
            name="detailAddress"
            readOnly={true}
          />
        </InputBox>
        {/* /.주소 입력 영역 */}

        {/* 이메일 인증 영역 */}
        <InputBox>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="0px"
            dis={emailCheck}
          />
          <Bt
            btName="전송"
            onClick={sendEmail}
            dis={emailCheck}
            color={emailCheck ? "#7e8080" : trueColor}
          />
        </InputBox>
        <InputBox>
          <Input
            type="text"
            placeholder="인증번호 입력"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            mb="0px"
            dis={emailCheck}
          />
          <Bt
            btName="인증하기"
            onClick={checkEmail}
            dis={emailCheck}
            color={emailCheck ? "#7e8080" : trueColor}
          />
        </InputBox>
        {/* /.이메일 인증 영역 */}

        {/* 핸드폰 인증 영역 */}
        <InputBox>
          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            width="40%"
            mb="0px"
          />
        </InputBox>
        <InputBox>
          <Input
            type="text"
            placeholder="'-'을 제외하고 입력해주세요."
            value={phone}
            onChange={handlePhone}
            mb="0px"
            dis={phoneCheck}
          />
          <Bt
            btName="문자발송"
            onClick={sendSms}
            dis={phoneCheck}
            color={phoneCheck ? "#7e8080" : trueColor}
          />
        </InputBox>
        <InputBox>
          <InfoLabel color={phoneNoCheck ? trueColor : falseColor}>
            {smsInfo}
          </InfoLabel>
        </InputBox>
        <InputBox>
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            mb="0px"
            dis={phoneCheck}
          />
          <Bt
            btName="인증하기"
            onClick={checkSms}
            dis={phoneCheck}
            color={phoneCheck ? "#7e8080" : trueColor}
          />
        </InputBox>
        {/* /.핸드폰 인증 영역 */}

        <InputBox className="center">
          <Bt
            btName="수정하기"
            onClick={registMember}
            color={trueColor}
          />
          <Bt
            btName="뒤로가기"
            onClick={() => window.history.back()}
            color={falseColor}
          />
        </InputBox>
      </ClientContainer>
      <Footer />
    </>
  )
}

export default MemberProfile;