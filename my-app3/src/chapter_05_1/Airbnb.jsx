import React from 'react';
import './Airbnb.css'
import BnbItem from './BnbItem';

const Airbnb = () => {
  const items = [
    {
      color : '#DE3151',
      title : '서울',
      distance : 2
    },
    {
      color : '#CC2D4A',
      title : '인천',
      distance : 29
    },
    {
      color : '#D93B30',
      title : '대구',
      distance : 237
    },
    {
      color : '#BC1A6E',
      title : '대전',
      distance : 140
    }
  ];

  const url = {src : 'https://placehold.co/200x100'}
  const copiedURL = {src:url.src}
  const src = url.src;
  const copiedURL2 = {...url}
  const copiedURL3 = {src}


  return (
    <div className='wrapper'>
      <h3>설레는 다음 여행을 위한 아이디어</h3>
      <ul className='gallery-list'>
        {/* {items.map(item => <BnbItem src={item.src} color={item.color} title={item.title} distance={item.distance} />)} */}
        {items.map((item, idx) => <BnbItem key={idx} {...item} {...url} />)}
      </ul>
    </div>
  );
}

export default Airbnb;
