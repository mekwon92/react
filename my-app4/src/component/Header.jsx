import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* Router의 link 컴포넌트는 직접적 페이지 이동을 담당 
      path relative: ../ ./ / 상대경로 지정 가능*/}
      {/* <h1>react sample post</h1> */}
      {/* <p><a href="/">home</a></p>
      <p><a href="/posts">post</a></p> */}
      {/* <Link to="/">home</Link><span> </span>
      <Link to="/posts">post</Link> */}
      <Navbar expand="lg" className='mb-4' sticky='top'>
        <hr />
        <Container>
          <Navbar.Brand as={Link} to="/">react sample post</Navbar.Brand> 
          <Nav variant="pills" defaultActiveKey="link-0" className='me-auto'>
            <Nav.Item>
              <Nav.Link as={Link} to="/" eventKey="link-0">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/posts" eventKey="link-1">Posts</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
