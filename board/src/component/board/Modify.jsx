import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const Modify = () => {
  const param = useParams();
  const num = param.num;
  const [ board, setBoard ] = useState({title:'', content:'', writer: '',attachDTOs:[]});
  const navigate = useNavigate();
  const { req } = useAxios();
  const [uploaded, setUploaded] = useState([]);
  


  // effect >> api호출
  useEffect(() => {
    (async () => {
      const resp = await req('get',`notes/${num}`);
      console.log(resp);
      setBoard(resp);
      setUploaded(resp.attachDTOs);
    })();
  }, [req, num]);

  const handleChange = e => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value});
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(board);

    req('put', `notes/${num}`, {...board, attachDTOs:uploaded});

    alert("수정");
    navigate("/notes");
  }

  return (
    <div>
      <h1>MODIFY</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name="title" value={board.title} onChange={handleChange}/>
        <input type='text' name="content" value={board.content} onChange={handleChange}/>
        <input type='text' name="memberEmail" value={board.writer} onChange={handleChange} readOnly/>
        <div>
        <h3>attachs : {board.attachDTOs.length}</h3>
        <ul>
          {board.attachDTOs.map(a=><li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
        </ul>
        </div>
        <button>글수정</button>
        <hr />
        <input type='file' onChange={handleFileUpload} name='file' multiple/>
        <ul> 
        {uploaded.map(u => <li key={u.uuid}><Link to={u.url}> {u.origin} </Link> <button data-uuid={u.uuid} onClick={e => setUploaded(uploaded.filter(file => file.uuid !== e.currentTarget.dataset.uuid))}>삭제</button></li>)}
      </ul>
      </form>
    </div>
  );
}

export default Modify;