import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import styles from "./Comments.module.scss";

export default function Comments({
  id,
  commenterName,
  img,
  createdAt,
  content,
  sendToMaster,
}) {
  let isComment = true;
  const [adjustNumber, setAdjustNumber] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [replies, setReplies] = useState("");

  const addReply = (newReply) => {
    setReplies(newReply);
    sendToMaster(newReply);
    setShowCommentSection(!showCommentSection);
  };
  const replyTo = () => {
    setShowCommentSection(!showCommentSection);
  };
  const handleAdd = () => {
    setAdjustNumber(adjustNumber + 1);
  };
  const handleSubtract = () => {
    setAdjustNumber(adjustNumber - 1);
  };
  return (
    <>
      <div className="row bg-white rounded-3 p-4 mt-4 mainComment">
        <div className="col-md-1 d-flex flex-column justify-content-center align-items-center numberContainer">
          <div className={`p-2 ${styles.mainLightBlue} rounded-3 numberAdjust`}>
            <button
              onClick={handleAdd}
              className={`${styles.mainLightBlue} $ border-0`}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            <div className={`text-center fw-bold ${styles.mainColor}`}>
              {adjustNumber}
            </div>
            <button
              onClick={handleSubtract}
              className={`${styles.mainLightBlue} border-0`}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
        <div className="col-md-11 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={img} alt="Comments" />
              <h5 className="mx-3">{commenterName}</h5>
              <p className={`m-0 ${styles.textColor} commentDate`}>
                {createdAt}
              </p>
            </div>
            <button
              onClick={replyTo}
              className={`d-flex align-items-center border-0 bg-white ${styles.mainColor} commentReply`}
            >
              <i class="fa-solid fa-reply mx-2"></i>
              <p className="m-0">Reply</p>
            </button>
          </div>
          <div>
            <p className={styles.textColor}>{content}</p>
          </div>
        </div>
      </div>
      {showCommentSection ? (
        <AddComment
          isComment={isComment}
          id={id}
          commentOwner={commenterName}
          img={"images/avatars/image-juliusomo.png"}
          setReplies={addReply}
        />
      ) : (
        ""
      )}
    </>
  );
}
