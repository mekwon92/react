import React from 'react';

const BnbItem = ({src, title, distance, color}) => {
  return (
    <li>
      <img src={src} alt='bg-img'/>
      <div style={{backgroundColor:color}}>
        <p>{title}</p>
        <p>{distance}Km 거리</p>
      </div>
    </li>
  );
}

export default BnbItem;
