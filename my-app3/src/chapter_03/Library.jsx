import React from 'react';
import Book from './Book';

const result = [
  {
    name : "처음만난 파이썬",
    numOfPage : "300"
  },
  {
    name : "처음만난 AWS",
    numOfPage : "400"
  },
  {
    name : "처음만난 리액트",
    numOfPage : "500"
  },
];



const Library = () => {
  return (
    <>
      {result.filter(el => el.numOfPage != 400).map(el => <Book name={el.name} numOfPage={el.numOfPage}/>)}
      <Book name="스프링부트" numOfPage="700" />
    </>
  );
}


// const Library = () => {
//   return (
//     <>
//       <Book name="처음만난 파이썬" numOfPage={300} />
//       <Book name="처음만난 AWS" numOfPage={400} />
//       <Book name="처음만난 리액트" numOfPage={500} />
//     </>
//   );
// }

export default Library;
