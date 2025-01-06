import React, { useState } from 'react';

const Toggle = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <button onClick={() => {setToggle(toggle=>!toggle)}}>클릭</button>
      <div>{toggle ? '켜짐' : '꺼짐'}</div>
    </>
  );
}
export default Toggle;
