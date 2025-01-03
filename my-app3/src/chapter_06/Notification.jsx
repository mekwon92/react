import React, { Component } from 'react';

//인라인 스타일로 적용
const styles = {
  wrapper : {
    margin : 8,
    padding : 8,
    display : "flex",
    flexDirection : "row",
    border : "1px solid gray",
    borderRadius: 16
  },
  messageText : {
    color : "black",
    fontSize : 16
  }
};

class Notification extends React.Component {
  constructor(props) {
    super(props);

   // this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <span style = {styles.messageText}>
          {this.props.message}
        </span>
      </div>
    );
  }
}

export default Notification;
