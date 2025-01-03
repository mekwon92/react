import React from 'react';
import Comment from './Comment';

const CommentList = () => {
  return (
    <div>
      <Comment name={"권미은"} comment={"댓글"} />
      <Comment name={"권미은1"} comment={"댓글"} />
      <Comment name={"권미은2"} comment={"댓글"} />
    </div>
  );
}

export default CommentList;
