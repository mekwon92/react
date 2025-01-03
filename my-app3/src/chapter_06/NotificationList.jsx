import React, { Component } from 'react';
import Notification from './Notification';

const reservedNotifications = [
  {message : '안녕하세요. 오늘 일정을 알려드립니다.'},
  {message : '점심 식사 시간입니다.'},
  {message : '이제 곧 미팅이 시작됩니다.'}
];

let timer;
class NotificationList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {notifications: []};
    // this.state = {notifications: [], count:0}; 이렇게 되면 어떻게 해야할까?
  }
   
  // 생성자 정의 후
  componentDidMount() {
    const {notifications} = this.state; //분해임


    timer = setInterval(() => {
      if(this.state.notifications.length < reservedNotifications.length) {
        const index = notifications.length;
        notifications.push(reservedNotifications[index]);
        this.setState({notifications}); // 초당 한번씩 리렌더링이 될것이다. 최초렌더링은 빈 화면
        // this.setState({...this.state, notifications}); // 이렇게 해야한다.
      }
      else {
        clearInterval(timer);
      }
    }, 1000);
  }

  // 컴포넌트가 DOM에서 제거되기 직전에 호출
  // 남아 있는 타이머를 정리하여 메모리 누수를 방지
  componentWillUnmount() {
    if(timer) {
      clearInterval(timer);
    }
  }

  render() {
    return (
      <div>
        {/* 원래 key말고 이름을 적용해줘야함. 나중에 정렬하게 되면 터짐 */}
        {this.state.notifications.map((noti, i)=> <Notification key={i} {...noti}/>)}
      </div>
    );
  }
}

export default NotificationList;