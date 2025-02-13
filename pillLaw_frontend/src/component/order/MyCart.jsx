import React, { useState, useEffect } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Axios 추가

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentOption, setCurrentOption] = useState('30일'); // 모달 기본값
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터 가져오는 API 호출
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/cart/3/items"); // 예시로 회원번호 3 사용
        const items = response.data.map(item => ({
          ...item,
          img: "https://placehold.co/60",  // 이미지 URL 추가
          name: "알수없음",  // 상품명 통일
          option: item.subday === 30 ? "30일" : item.subday === 60 ? "60일" : "90일"  // subday 값을 기반으로 option 설정
        }));
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const updateCart = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      let optionMultiplier = item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1;
      totalPrice += item.price * optionMultiplier * item.quantity;
    });
    return totalPrice;
  };

  const handleOptionChange = (cino) => {
    const selectedItem = cartItems.find(item => item.cino === cino); 
    setCurrentItemId(cino);
    setCurrentOption(selectedItem.option);
    setShowModal(true);
  };
  const handleSaveOption = () => {
    const newOption = document.getElementById('newOption').value;
  
    setCartItems(cartItems.map(item => {
      if (item.cino === currentItemId) {
        let optionMultiplier = newOption === "60일" ? 2 : newOption === "90일" ? 3 : 1;
        return { 
          ...item, 
          option: newOption, 
          total: item.price * optionMultiplier * item.quantity // 옵션 변경 시 총 가격 업데이트
        };
      }
      return item;
    }));
  
    setShowModal(false);
  };

  const handleQuantityChange = (cino, quantity) => {
    setCartItems(cartItems.map(item => 
      item.cino === cino ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };
  
  const handleSelectItem = (cino) => {
    setSelectedItems(prev =>
      prev.includes(cino) ? prev.filter(item => item !== cino) : [...prev, cino]
    );
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => item.cino));  // cino 사용
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter(item => !selectedItems.includes(item.cino)));  // cino 사용
    setSelectedItems([]); // 선택 항목 초기화
  };

  const totalPrice = updateCart();
  const shippingFee = 3000;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className='wrap'>
      <Container style={{paddingTop: '115.19px'}}>
        <h4 className="text-center fw-bold my-5">
          <span className="header-font">1. 장바구니</span>
          <span className="text-secondary mx-5">2. 주문서 작성</span>
          <span className="text-secondary">3. 결제 완료</span>
        </h4>
        <Table className="text-center align-middle mt-5" responsive>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === cartItems.length && cartItems.length > 0} /></th>
              <th width="10%"></th>
              <th width="50%">상품명</th>
              <th width="10%">구독기간</th>
              <th width="10%">가격</th>
              <th width="10%">수량</th>
              <th width="10%">합계</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4 fw-bold text-muted">상품을 담아주세요</td></tr>
            ) : (
              cartItems.map(item => (
                <tr key={item.cino}>  
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(item.cino)} 
                      onChange={() => handleSelectItem(item.cino)}  
                    />
                  </td>
                  <td><img src={item.img} alt={item.name} className="img-fluid" /></td>
                  <td>{item.name}</td>
                  <td>
                    <Button variant="light" onClick={() => handleOptionChange(item.cino)}>{item.option}</Button>
                  </td>
                  <td>{(item.price * (item.option === '60일' ? 2 : item.option === '90일' ? 3 : 1)).toLocaleString()}원</td>
                  <td>
                    <Form.Control 
                      className="text-center" 
                      type="number" 
                      value={item.quantity} 
                      min="1" 
                      onChange={(e) => handleQuantityChange(item.cino, e.target.value)}  
                    />
                  </td>
                  <td>{(item.price * (item.option === "60일" ? 2 : item.option === "90일" ? 3 : 1) * item.quantity).toLocaleString()}원</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Button className='btn-pilllaw' onClick={handleDeleteSelected}>선택 삭제</Button>

        <div className="d-flex flex-column align-items-end mt-4">
          <p className="text-end mb-2 fw-bold" style={{ color: "black" }}>전체 주문금액 {totalPrice.toLocaleString()}원</p>
          <p className="text-end mb-2 fw-bold" style={{ color: "black" }}><span className="header-font">(구독 회원은 배송비 무료!) </span>배송비 {shippingFee.toLocaleString()}원</p>
          <p className="text-end mb-4 fw-bold" style={{ color: "black" }}>총 결제 금액 {finalPrice.toLocaleString()}원</p>
        </div>

        <div className="d-flex justify-content-end mb-3">
          <Button className="btn-pilllaw" onClick={() => navigate("/order")}>주문하기</Button>
        </div>

        {/* 옵션 변경 모달 */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>옵션 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newOption">
              <Form.Label>옵션 선택</Form.Label>
              <Form.Control as="select" defaultValue={currentOption}>
                <option value="30일">30일</option>
                <option value="60일">60일</option>
                <option value="90일">90일</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>취소</Button>
            <Button className='btn-pilllaw' onClick={handleSaveOption}>저장</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default MyCart;
