import React, { useState } from 'react';

// const Counter = () => {
//   var count = 0;
//   return (
//     <div>
//       <p>총 {count}번 클릭했습니다</p>
//       <button onClick={() => {
//         count++;
//         console.log(count);
//       }}>클릭
//       </button>
//     </div>
//   );
// }

// log에만 찍히고 count는 증가되지 않음.
// count가 state가 되어야 리렌더링 대상이 된다.

const Counter = () => {
  // const [변수명, set함수명] = useState(초깃값);
  const [count, setCount] = useState(0); //함수 호출의 결과가 배열.
  return (
    <div>
      <p>총 {count}번 클릭했습니다</p>
      <button onClick={() => {
        setCount(count+1);
        console.log(count);
      }}>증가
      </button>
      <button onClick={() => {
        setCount(count-1);
      }}>감소
      </button>
      <button onClick={() => {
        setCount(0);
      }}>초기화
      </button>
    </div>
    
  );
}




export default Counter;
