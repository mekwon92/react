import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Container, Spinner, Card, Button} from 'react-bootstrap';


const PostDetail = () => {
  // ajax 구문
  // axios
  const {id} = useParams(); //객체형태로 받아옴.
  const [post, setPost] = useState(null); //데이터
  const [loading, setLoading] = useState(true); //로딩
  const [error, setError] = useState(null); //에러

  useEffect(()=> {
    const get = async() => {
      try {
        const resp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(resp.data);
        console.log(post);
        
      }
      catch(err) {
        console.log(err);
        setError(err);
      }
      finally {
        setLoading(false);
      }
    }
    get();
  }, [id]);
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
      <h1>post detail</h1>
        <Card>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.userId}</Card.Subtitle>
            <hr />
            <Card.Text>
            {post.body}
            </Card.Text>
            <div className='text-end'>
              <Button as={Link} to="/posts" variant="primary">To List</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default PostDetail;
