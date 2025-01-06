import React from 'react';

const Todo = ({id, content, writer, regDate}) => {
  return (
    <li>
      <p>{id}, {content}</p>
      <p>{writer}, {regDate}</p>
      
    </li>
  );
}

export default Todo;
