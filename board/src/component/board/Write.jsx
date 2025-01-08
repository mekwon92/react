import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [memberEmail, setMemberEmail] = useState('');
  const [board, setBoard] = useState({title:'', content:'', memberEmail:'a@b.c'});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(board);
    

    (async() => {
      setLoading(true);
      try {
        const resp = await axios({
          method : 'post',
          url:'http://localhost:8080/api/v1/board',
          data:board,
          headers: {
            'Content-Type':'application/json'
      }
        });
        setData(resp.data);
      } catch (error) {
        setError(error);        
      } finally {
        setLoading(false);
      }
    })();

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