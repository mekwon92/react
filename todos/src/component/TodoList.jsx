import React, { useEffect, useState } from 'react';
import Todo from './Todo';
// 비동기
// jqueryXmlHttpRequest
// $.ajax(0).done().doen() 도 가능

// Promise란?
// 비동기 작업(예: 데이터 요청)이 성공했는지 실패했는지를 나타내는 객체.
// 3가지 상태를 가짐 - pending(실행전) fulfilled(성공) rejected(실패)
// fetch(myUrl): 데이터를 가져오는 작업을 나타내는 Promise.
// response.json(): JSON 데이터를 파싱하는 작업을 나타내는 Promise.

// fetch는 400, 500에러 처리못함 -> response.ok를 통해 처리
const  TodoList = () => {
  const [todos, setTodos] = useState([]);
  const myUrl = 'http://localhost:8080/api/todo/list';
  const sampleUrl = "https://jsonplaceholder.typicode.com/posts/1";
  useEffect(() => {
    (async () => { //익명 즉시실행함수
      const response = await fetch(myUrl);
      if(!response.ok) {
        throw new Error('네트워크 상태 불량')
      }
      const data = await response.json();
      console.log(data);
      setTodos(data);
    })();
  }, []); //무한루프 방지를 위해 빈배열 사용
  return todos.length ? <ul>{todos.map(todo => <Todo key = {todo.id} {...todo} />)}</ul> :<ul><li>페이지 로딩중....</li></ul>;
   // 얘가 더 빠름. 위에것을 안기다려서 undefined 뜸.
   // 순차로 만들기 위해 async/await 사용함. await는 async함수 안에서만 사용가능함
   // await는 Promise가 해결될 때까지 기다림(데이터를 가져오고 파싱한 후에 setTodos(data)가 실행)
}



export default TodoList;
