import React, { useState } from "react";
import styles from "./AddComment.module.scss";

export default function AddComment({
  setReplies,
  img,
  isComment,
  id,
  commentOwner,
  sendToReply,
}) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  let responseComment = () => {
    if (isComment) {
      replyToComment();
    } else {
      replyToReply();
    }
  };
  let replyToComment = () => {
    const newReply = {
      content: "@" + commentOwner + " " + inputValue,
      createdAt: "1 second ago",
      score: 0,
      commentId: id,
      replyingTo: commentOwner,
    };
    setReplies(newReply);
  };
  let replyToReply = () => {
    const newReply = {
      content: "@" + commentOwner + " " + inputValue,
      createdAt: "1 second ago",
      score: 0,
      commentId: id,
      replyingTo: commentOwner,
    };
    sendToReply(newReply);
  };
  return (
    <>
      <div className="row bg-white rounded-3 p-4 mt-4 addComment">
        <div className="col-md-1 d-flex flex-column justify-content-center align-items-center userImage">
          <img src={img} alt="Comments" />
        </div>
        <div className="col-md-10 d-flex flex-column">
          <input
            value={inputValue}
            onChange={handleChange}
            className="rounded-3 p-2"
            type="text"
            placeholder="Add a comment..."
          />
        </div>
        <div className="col-md-1 sendComment">
          <button
            onClick={responseComment}
            className={`btn ${styles.mainColor}`}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );
}
