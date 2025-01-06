import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Container, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Posts = () => {
  // ajax 구문
  // axios
  const [posts, setPosts] = useState([]); //데이터
  const [loading, setLoading] = useState(true); //로딩
  const [error, setError] = useState(null); //에러

  useEffect(()=> {
    const getList = async() => {
      try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPosts(resp.data);
      }
      catch(err) {
        console.log(err);
        setError(err);
      }
      finally {
        setLoading(false);
      }
    }
    getList();
  }, []);
  // 로딩
  if(loading) {
    return (
    <>
      <Container className='text-center mt-5'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
       </Spinner>
      </Container>
    </>
    );
  }

  //에러 - 얘는 에러 잘 잡아줌 400, 500번도
  if(error) {
    return (
      <>
        <Container className='mt-5'>
          <Alert variant="danger">
          <Alert.Heading>error</Alert.Heading>
          <p>
            에러발생 :: {error.name}
          </p>
          <hr />
          <p className="mb-0">
            {error.message}
          </p>
          </Alert>  
        </Container>
      </>
    );
  }

  // 데이터 처리
  return (
    <>
      <Container>
      <h1>posts</h1>
      <ListGroup>
        {posts.map(p=><ListGroup.Item key={p.id} action as={Link} to={`/posts/${p.id}`}>{p.title}</ListGroup.Item>)}
      </ListGroup>
      </Container>
    </>
  );
}

export default Posts;
