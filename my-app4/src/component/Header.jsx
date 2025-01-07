import React from 'react';
import { useState } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  // const [activeKey, setActiveKey] = useState("link-0");
  const location = useLocation();
  console.log(location);
  
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
          <Nav variant="pills" activeKey={location.pathname} className='me-auto' defaultActiveKey="/" >
            <Nav.Item>
              <Nav.Link as={Link} to="/" eventKey="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/posts" eventKey="/posts">Posts</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
