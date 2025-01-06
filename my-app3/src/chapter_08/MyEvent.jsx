import React from 'react';

const MyEvent = () => {
  return (
    <div>
      <div style={{border:"5px solid", padding:50}} onClick={() => console.log('최상위 클릭')}>
        <div style={{border:"5px solid", padding:50}} onClick={(e) => {
          console.log(e);
          console.log(e.target); // 이벤트가 발생한 실제 DOM 요소	<button>
          console.log(e.currentTarget); // 이벤트 핸들러가 연결된 DOM 요소	<div>
          console.log(e.currentTarget.title);
          e.stopPropagation();
        }} title='나는 배경이야'>
          <button style={{padding: 20}} onClick={() => console.log('최하위 클릭')}>클릭</button>
        </div>
      </div>
    </div>
  );
}

export default MyEvent;
