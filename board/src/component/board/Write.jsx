import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const Write = () => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [memberEmail, setMemberEmail] = useState('');
  const [board, setBoard] = useState({title:'', content:'', memberEmail:'a@b.c'});

  const navigate = useNavigate();
  const {req} = useAxios();

  const handleChange = e => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(board);
    req('post', 'board', board);

    alert("글쓰기 성공");
    navigate("/");

  }
  return (
    <div>
      <h1>write</h1>
      <form onSubmit={handleSubmit}>
        {/* <input name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/> */}
        <input name='title' value={board.title} onChange={handleChange}/>
        <input name='content' value={board.content} onChange={handleChange}/>
        <input name='memberEmail' value={board.memberEmail} onChange={handleChange}/>
        <button>제출</button>
      </form>
    </div>
  );
}

export default Write;