import React from 'react';
// 재렌더링시 식별하기위해 list에 key를 사용하는 것.
const NumberList = (props) => {
  const {numbers} = props;
  const listItems = numbers.map(number => <li>{number}</li>);
  return (
    <ul>
      {listItems}
    </ul>
  );
}

export default NumberList;
