import React from 'react';

const styles = {
  wrapper : {
    margin:8,
    padding:8,
    display:"flex",
    flexDirection:"row",
    border:"1px solid gray",
    borderRadius: "1em"
  },
  imageContainer : {

  },
  image : {
    width: 50,
    height: 50,
    borderRadius : 25
  },
  contentContainer: {
    marginLeft:8,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
  },
  nameText : {
    color: "black",
    fontSize: 16,
    fontWeight : "bold"
  },
  commentText: {
    color : "black",
    fontSize : 16
  }
};

const Comment = (props) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img src ="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png" alt="profile" style={styles.image}/>
      </div>

      <div style={styles.contentContainer}>
        <span style={styles.nameText}>{props.name}</span>
        {/* <span style={styles.commentText}>{props.comment}</span> */}
        <span style={(_) => {return {...styles.commentText, color:'blue'}}}>{props.comment}</span>
        {/* <span style={{...styles.commentText, color:'blue'}}>{props.comment}</span> */}
      </div>
    </div>
  );
}

export default Comment;
