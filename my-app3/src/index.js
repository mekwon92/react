import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import MyEffect from './chapter_07/MyEffect';
import Toggle from './chapter_08/Toggle';
const root = ReactDOM.createRoot(document.getElementById('root'));


// setInterval(() => {
  
  root.render(
    <React.StrictMode>
      {/* <App /> */}
      {/* <MyElement /> */}
      {/* <Library /> */}
      {/* <Clock /> */}
      {/* <Welcome name="javaman" /> */}
      {/* <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} /> */}
      {/* <CommentList /> */}
      {/* <CityList /> */}
      {/* <Airbnb /> */}
      {/* <NotificationList /> */}
      {/* <Counter/ > */}
      {/* <MyArray /> */}
      {/* <MyObject /> */}
      {/* <MyEffect/> */}
      <Toggle />
    </React.StrictMode>
  );
// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
