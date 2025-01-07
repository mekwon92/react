import React, { useState } from 'react';


//자식 컴포넌트
const TopingList = (props) => {

  const {topings, onSetMyTopings} = props;

  // 최대 토핑개수가 3개
  // 1번째 방법(cnt이용)
  // const [cnt, setCnt] = useState(0);

  // const handleChange = e => {
  // console.log(typeof e.target.checked);

  //   const c = e.target.checked;

  //   if(c && cnt >=3) {
  //     alert('최대 3개 체크');
  //     e.target.checked = false;
  //     return;
  //   }
  //   setCnt(cnt + (c ? 1 : -1));
  //   console.log(cnt);
  // };

  // 2번째 방법(배열이용)

  // const [checkedItems, setCheckedItems] = useState([]);

  // const handleChange = e => {
  //   const c = e.target.checked;
  //   if(c && checkedItems.length >=3) {
  //     alert('최대 3개 체크');
  //     return;
  //   }
  //   setCheckedItems(items => c ? [...items, e.target.value] : items.filter(ci => ci !== e.target.value));
  //   console.log(checkedItems);
    
  // }

  // 3번째 방법(set 이용)
  const [mySet, setMySet] = useState(new Set());

  const handleChange = e => {
    const c = e.target.checked;
    if(c && mySet.size >= 3) {
      alert('최대 3개 체크');
      return;
    }
    const newSet = new Set(mySet);
    c ? newSet.add(e.target.value) : newSet.delete(e.target.value);
    setMySet(newSet);
    // 부모 컴포넌트에 자식 state 전달(함수로 전달해야함...ㅠ_ㅠ어렵) =>redux(상태관리 라이브러리) 사용
    onSetMyTopings(newSet);
  };

  return topings.length === 0 ? <h1>토핑이 없습니다</h1> : (
    <>
    <h3>최대 선택 가능 토핑은 3개 입니다.</h3>
    <ul>
      {/* 2번째 방법 -> checkedItems.includes(t) */}
      {topings.map((t,i) => <li key={i}><label><input type='checkbox' name='toping' value={t} onChange={handleChange} checked={mySet.has(t)}/>{t}</label></li>)}
    </ul>    
    </>
  );
}


//부모 컴포넌트
const Multiple = () => {
  const [myTopings, setMyTopings] = useState(new Set());
  const topings = ["베이컨","페퍼로니","파인애플","치즈","고구마","감자","새우","불고기"];
  return (
    <form onSubmit={e => {
      e.preventDefault();

      if(myTopings.size === 0) {
        alert('1개 이상의 토핑 선택');
        return;
      }
      
      alert(`선택한 토핑은 ${Array.from(myTopings).join(", ")}`);

    }}>
      <TopingList topings={topings} myTopings={myTopings} onSetMyTopings={setMyTopings}/>
      <button>주문</button>
    </form>
  );
}

export default Multiple;
