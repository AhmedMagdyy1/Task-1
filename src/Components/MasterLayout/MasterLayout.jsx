import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comments from "../Comments/Comments";
import Replies from "../Replies/Replies";
import jsonData from "../../Data/data.json";

export default function MasterLayout() {
  const { currentUser, comments } = jsonData;
  const [newReply, setNewReply] = useState("");
  const [deleteReply, setDeleteReply] = useState("");
  const [newComment, setNewComment] = useState("");
  const handleChange = (event) => {
    setNewComment(event.target.value);
  };
  const addReply = (newReply) => {
    newReply.user = currentUser;
    setNewReply(newReply);
    comments.find((a) => a.id == newReply.commentId).replies.push(newReply);
    // comments[0].replies.push(newReply); // Add the new reply to comments[0].replies array
  };
  const deleteComment = (deleteComment) => {
    setDeleteReply(deleteComment);
    if (!deleteComment.isEdit) {
      console.log(deleteReply);
      comments
        .find((a) => a.id === deleteComment.commentId)
        .replies.splice(
          comments
            .find((a) => a.id === deleteComment.commentId)
            .replies.findIndex(
              (a) =>
                a.content === deleteComment.content &&
                a.replyingTo === deleteComment.replyingTo
            ),
          1
        );
    } else {
      if (deleteComment.oldContent) {
        const commentIndex = comments.findIndex(
          (a) => a.id === deleteComment.commentId
        );
        const replyIndex = comments[commentIndex].replies.findIndex(
          (a) =>
            a.id === deleteComment.replyId &&
            a.replyingTo === deleteComment.replyingTo
        );
        comments[commentIndex].replies[replyIndex].content =
          deleteComment.content;
        setNewComment(deleteComment.content);
      }
    }
  };
  return (
    <>
      {/* {console.log(newComment.content)} */}
      <div className="container p-5 w-75 mainContainer">
        {comments.map((comment) => (
          <>
            <Comments
              key={comment.id}
              id={comment.id}
              commenterName={comment.user.username}
              img={comment.user.image.png}
              score={comment.score}
              content={comment.content}
              createdAt={comment.createdAt}
              sendToMaster={addReply}
            />
            {comment.replies.length > 0
              ? comment.replies.map((reply) => {
                  let isCurrentUser =
                    currentUser.username === reply.user.username;
                  return (
                    <>
                      <Replies
                        key={reply.id}
                        name={reply.user.username}
                        img={reply.user.image.png}
                        score={reply.score}
                        content={reply.content}
                        commentId={comment.id}
                        createdAt={reply.createdAt}
                        replyingTo={reply.replyingTo}
                        data={isCurrentUser}
                        setDeleteReply={deleteComment}
                        commentOwner={reply.user.username}
                      />
                    </>
                  );
                })
              : ""}
          </>
        ))}
        <AddComment
          setReplies={addReply}
          img={currentUser.image.png}
          isComment={true}
          id={comments[0].id} // Pass the id of the first comment as the id prop
          commentOwner={comments[0].user.username} // Pass the username of the first comment owner as the commentOwner prop
        />
      </div>
    </>
  );
}
