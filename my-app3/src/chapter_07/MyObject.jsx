import React, { useState } from 'react';

const MyObject = () => {

  // const fruits = [
  //   { name : '사과' , cnt: 0},
  //   { name : '귤' , cnt: 0},
  //   { name : '복숭아' , cnt: 0},
  //   { name : '딸기' , cnt: 0},
  //   { name : '포도' , cnt: 0}
  // ]
  const fruits = ['사과', '귤','복숭아','딸기','포도'];

  //초기값
  const fruitsCount = fruits.map(f => ({name : f, count: 0}));
  console.log(fruitsCount);

  const [bucket, setBucket] = useState([...fruitsCount]); //fruitsCount 넣으면 안됨(복제본 사용)
  console.log(fruitsCount);
  
  return (
    <div>
      <h3>과일바구니</h3>
      <button onClick={() => {
        const rand = parseInt(Math.random() * fruits.length);
        bucket[rand].count++;
        console.log(bucket);
        setBucket([...bucket]);
        
      }}>과일 추가</button>
      
      <button onClick={() => setBucket([...fruitsCount])}>바구니 비우기</button>
      <ul>
        {bucket.map((f,i) => <li key = {i}>{f.name} :: {f.count}개</li>)}
      </ul>
    </div>
  );
}

export default MyObject;