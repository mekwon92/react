import React, { useEffect, useState } from 'react';

const MyEffect = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {document.title = `총 ${count}번 클릭했습니다.`}); //title변경
  useEffect(() => {document.title = `총 ${count}번 클릭했습니다.`},[count]); //title변경

  // useEffect(() => {document.title = `총 ${count}번 클릭했습니다.`},[]); //[]이 있으면 한번만 실행(title변경 안됨)

  return (
    <div>
      <p>총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count+1)}>클릭</button>
    </div>
  );
}

export default MyEffect;