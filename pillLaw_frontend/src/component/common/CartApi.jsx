import axios from 'axios';

// 백엔드 API URL 설정
const API_URL = 'http://localhost:8080/api/v1/cart';  // 실제 API 주소에 맞게 수정하세요

// 장바구니 내역 조회 (회원번호로)
export const getCartItems = async (mno) => {
  try {
    const response = await axios.get(`${API_URL}/${mno}/items`);
    return response.data;  // 데이터 반환
  } catch (error) {
    console.error('Error fetching cart items', error);
    throw error;
  }
};

// 장바구니 생성
export const addCart = async (cartDto) => {
  try {
    const response = await axios.post(`${API_URL}/`, cartDto);
    return response.data;  // 생성된 장바구니 번호 반환
  } catch (error) {
    console.error('Error adding cart', error);
    throw error;
  }
};