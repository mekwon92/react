import styled from "styled-components";

const CategoryContainer = styled.div`
  display: flex;
  margin: 10px 20px;
  margin-top: 0px;
`;

const CategoryButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #84a1e5;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  border-style: none;
  color: white;
`;

function SalesCategory(){
  return (
    <CategoryContainer>
      <CategoryButton>주간</CategoryButton>
      <CategoryButton>월간</CategoryButton>
      <CategoryButton>분기</CategoryButton>
    </CategoryContainer>
  );
}

export default SalesCategory;