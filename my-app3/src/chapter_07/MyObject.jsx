import React, { useState } from 'react';

const MyObject = () => {

  const fruits = [
    { name : '사과' , cnt: 0},
    { name : '귤' , cnt: 0},
    { name : '복숭아' , cnt: 0},
    { name : '딸기' , cnt: 0},
    { name : '포도' , cnt: 0}
  ]

  const [bucket, setBucket] = useState(fruits);
  
  return (
    <div>
      <h3>과일 바구니 - {bucket}</h3>
      <button onClick={() => {
        // const rand = parseInt(Math.random() * fruits.length);
        // console.log(rand);
        
      }}>과일 추가</button>
      <button onClick={() => {
      }}>과일 제거</button>
      <button onClick={() => {
      }}>바구니 비우기</button>
      <ul>
       <li>사과</li>
       <li>귤</li>
       <li>복숭아</li>
       <li>딸기</li>
       <li>포도</li>
      </ul>
    </div>
  );
}

export default MyObject;
