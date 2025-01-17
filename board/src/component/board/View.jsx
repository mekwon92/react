import React, { useEffect, useState } from 'react';
import { Link,  useNavigate,  useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext';

const View = () => {
  const param = useParams();
  const num = param.num;
  const { req, error, loading } = useAxios();
  const navigate = useNavigate();
  const {email} = useAuth();
  const [note, setNote] = useState({});
  const [myLike, setMyLike] = useState({});

  useEffect(() => {
    
    (async () => {
      const resp = await req('get',`notes/${num}`);
      setNote(resp);
      const queryString = new URLSearchParams({email, num}).toString();
      const resp2 = await req('get',`likes?${queryString}`);
      setMyLike(resp2);
    
    })();
  }, [num,req]);

  if(error) return <div><h1>에러 발생</h1></div>
  if(loading) return <div><h1>로딩중</h1></div>

  const handleDelete = e => {
    e.preventDefault();
    if(!window.confirm("삭제하시겠습니까?")) return;
    req('delete', `notes/${num}`)
    navigate("/notes");
  }

  //좋아요 토글
  const handleLikesToggle = async e => {
    e.preventDefault();
    const ret = await req('post',`likes`,{email, num});
    setMyLike(!myLike);
    setNote({...note, likesCnt:note.likesCnt + (ret.result ? -1 : 1)})
    console.log(note);
    
  }

  return note && (
    <div>
      <h1>View</h1>
      <p>{param.num}번</p>
      <p>{num}번</p>
      <h4>등록 {note.regDate} 수정 {note.modDate}</h4>
      <h3>제목</h3>
      <p>{note.title}</p>
      <h3>내용</h3>
      <p>{note.content}</p>
      <h3>작성자</h3>
      <p>{note.writer}</p>
      <p><button onClick={handleLikesToggle}>좋아요 <span style={{color:'red'}}>{myLike ? '♥'  : '♡'} </span> {note.likesCnt}</button></p>
      <div>
        {/* note.attachDTOs && 제거시 undefined 오류 */}
        <p>{note.attachDTOs && note.attachDTOs.length}개의 첨부파일</p>
        <ul>
          {note.attachDTOs && note.attachDTOs.map(a=><li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
        </ul>
      </div>
      <Link to={"/notes"}>목록</Link>
      <Link to={`/notes/modify/${num}`} ><button>수정</button></Link>
      <button onClick={handleDelete}>삭제</button>

    </div>
  );
}

export default View;