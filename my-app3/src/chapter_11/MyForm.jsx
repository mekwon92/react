import React, { useState } from 'react';
//onFocus onBlur

//uncontrolled component를 통해 첨부파일 관리... state값을 조정해 리렌더링하도록..?덮어씀

const MyForm = () => {
  //let value = ''; //이렇게하면 상태관리를 무시하게 되어 안됨. -> useState
  const [name, setName] = useState('');
  const [req, setReq] = useState('');
  const [fruit, setFruit] = useState('');
  const [file, setFile] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.target.id);
    console.log(fruit);

    !fruit && alert('과일선택해'); //falsy값 처리
    
    // if(fruit == '') {
      //   alert("과일선택해")
      // }
    }
    
    const handleChange = e => {
      // const v = e.target.value;
      // value = v;
      // console.log(v);
      
      // 대문자만 받기
      // setValue(e.target.value.toUpperCase());
      
      // 숫자만 입력받게 변형
      
      // 1번째방법
      // setName(e.target.value.replace(/[^0-9]/g,''))    
      
      // 2번째방법
      // match나 new RegExp("[^0-9]","g").test("abcd"); 등도 이용가능.. 
      // match는 반환값이 배열이나 null
      
      //oninvalid도 이용가능(찾아보기)
      
      switch (e.target.id) {
        case "name": //숫자만 입력받게 변형
        setName(e.target.value.replace(/[^0-9]/g,''))    
        break;
        case "req": //영소문자 입력(한글, 숫자 포함)
        setReq(e.target.value.toLowerCase());
        // setReq(e.target.value.replace(/[^ㄱ-ㅎ가-힣a-z0-9]/g, ''));
        break;
        case "fruit": //반드시 과일을 선택하게 지정. 과일 미선택시 alert로 알림 메세지 표시
        setFruit(e.target.value);
        break;
        case "file": 
        console.log(e.target.files); //배열이 아니고 유사배열 형태임. length는 쓸수있는데 property, map 등은 사용 못함 -> 배열로 변경해줘야함.
        console.log("===========");
        console.log(Array.from(e.target.files, f=>f.name));
        
        setFile([Array.from(e.target.files, f=>f.name)]);
        default:
          break;
        }
      }
      

      return (
        <form onSubmit={handleSubmit}>
      <label>이름 <input type='text' name='name' onChange={handleChange} id='name' value={name}/></label>
      {/* name='name'
          입력 필드의 이름을 지정하여, 폼 데이터 처리 시 해당 키로 데이터를 구분할 수 있습니다.onChange={handleChange}:
          입력 값이 변경될 때 호출되는 이벤트 핸들러입니다. 주로 상태(state)를 업데이트하는 데 사용됩니다.
          id='name'
          필드의 고유 식별자입니다. <label>과 연결됩니다.
          value={name}
          이 필드의 현재 값을 React 상태(name)와 연결합니다. Controlled Component로 동작하게 됩니다.
          */}
      <label>
        <p>요청사항</p>
        <textarea onChange={handleChange} id='req' value={req}></textarea>
      </label>
      <label htmlFor='fruit'>과일을 선택하세요</label>
      <select id='fruit' onChange={handleChange}>
        <option value={''}>과일을 선택하세요</option>
        <option value={'apple'}>사과</option>
        <option value={'banana'}>바나나</option>
        <option value={'grape'}>포도</option>
        <option value={'watermelon'}>수박</option>
      </select>
      <br />
      {/* 파일 업로두 후 value 값 변경 불가 >> 조건부 렌더링을 통해 컴포넌트 재 로드
      <FileInput /> */}
      <input type="file" id='file' name='file' onChange={handleChange} multiple />
      <p>업로드된 파일</p>
      <ul>
        {file.map(f => <li key={f}>{f}</li>)}
      </ul>
      <hr />
      <button>제출</button>
    </form>
  );
}

export default MyForm;
