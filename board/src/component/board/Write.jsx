import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext'; 

const Write = () => {
  const { email } = useAuth(); 
  const [ board, setBoard] = useState({title:'', content:'', writer: '', attachDTOs: []});
  const navigate = useNavigate();
  const { req } = useAxios();
  const [uploaded, setUploaded] = useState([]);

  useEffect(() => {
    setBoard(prev => ({...prev, writer:email}))
  },[email]); 

  const handleChange = e => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value});
  }


  const handleSubmit = e => {
    e.preventDefault();
    
    req('post', 'notes', {...board, attachDTOs : uploaded});

    alert("글쓰기 성공");
    navigate("/notes");

  }
  const handleFileUpload = async e => {
    const files = e.target.files;//유사배열
    if (!files) return;

    const formData = new FormData();
    for(let i = 0; i < files.length; i++) {
      formData.append("file",files[i]);
    }
    
    
    try {
      const result = await req('post', 'file/upload', formData, {'Content-Type':'multipart/form-data'});
      setUploaded([...uploaded, ...result]);

    } catch (error) {
      console.error("Error during upload:", error);
    }

    e.target.value = ''
  };

  return (
    <div>
      <h1>write</h1>
      <form onSubmit={handleSubmit}>
        <input name='title' value={board.title} onChange={handleChange}/>
        <input name='content' value={board.content} onChange={handleChange}/>
        <input name='memberEmail' value={board.writer} onChange={handleChange}/>
        <input type='file' onChange={handleFileUpload} name='file' multiple/>
        <button>제출</button>
      </form>
      <ul> 
        {/* 원래 이거 뺴서 pros로 전달해야함~ */}
        {uploaded.map(u => <li key={u.uuid}><Link to={u.url}> {u.origin} </Link> <button data-uuid={u.uuid} onClick={e => setUploaded(uploaded.filter(file => file.uuid !== e.currentTarget.dataset.uuid))}>삭제</button></li>)}
      </ul>
    </div>
  );
}

export default Write;