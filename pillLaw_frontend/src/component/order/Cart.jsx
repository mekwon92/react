import React, { useEffect, useState } from 'react';
import { getCartItems } from '../common/CartApi'

const Cart = ({ mno }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems(mno);  // 회원 번호로 장바구니 아이템 조회
        console.log('Cart items fetched:', data); // 응답 데이터 출력
        setCartItems(data);  // 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    fetchCartItems();
  }, [mno]);  // mno가 변경될 때마다 다시 호출

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length === 0 ? (
          <li>No items in cart.</li>
        ) : (
          cartItems.map(item => (
            <li key={item.cino}>
              Product ID: {item.pno}, Price: {item.price}, Quantity: {item.quantity}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;