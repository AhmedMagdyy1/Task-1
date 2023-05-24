import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import styles from "./Replies.module.scss";

export default function Replies({
  name,
  img,
  primaryKey,
  createdAt,
  content,
  replyingTo,
  commentId,
  data,
  setDeleteReply,
  commentOwner,
  sendToMaster,
}) {
  let isComment = false;
  const [adjustNumber, setAdjustNumber] = useState(0);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [replies, setReplies] = useState("");
  const [inputEdit, setInputEdit] = useState(false);
  const [editContent, setEditContent] = useState(content); // Track edited content
  const [oldContent, setOldContent] = useState(content);
  const [isUpdating, setIsUpdating] = useState(false); // Track if currently updating
  const replyTo = () => {
    setShowCommentSection(!showCommentSection);
  };
  const addReply = (newReply) => {
    setReplies(newReply);
    sendToMaster(newReply);
    setShowCommentSection(!showCommentSection);
  };
  const handleAdd = () => {
    setAdjustNumber(adjustNumber + 1);
  };
  const handleChange = (event) => {
    setEditContent(event.target.value);
  };
  const handleSubtract = () => {
    setAdjustNumber(adjustNumber - 1);
  };
  const getReply = (isEdit) => {
    setInputEdit(isEdit);
    const replyObject = {
      content: content,
      replyingTo: replyingTo,
      commentId: commentId,
      isEdit: isEdit,
    };
    setDeleteReply(replyObject);
  };
  const editComment = () => {
    setShowCommentSection(!showCommentSection);
    getReply(true);
    setEditContent(content); // Reset edited content to original comment content
    setIsUpdating(true);
  };
  const updateComment = () => {
    setIsUpdating(false);
    setEditContent(content);
    const updatedComment = {
      commentId: commentId,
      replyId: primaryKey,
      replyingTo: replyingTo,
      content: editContent,
      oldContent: oldContent,
      isEdit: true,
    };
    setDeleteReply(updatedComment);
    setIsUpdating(false);
    setInputEdit(false);
  };
  const handleNewReply = (newReply) => {
    sendToMaster(newReply);
    setShowCommentSection(!showCommentSection);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-1">{/* <p>||</p> */}</div>
        <div className="col-md-11">
          <div className="row bg-white rounded-3 p-4 mt-4 mainComment">
            <div className="col-md-1 d-flex flex-column justify-content-center align-items-center numberContainer">
              <div
                className={`p-2 ${styles.mainLightBlue} rounded-3 numberAdjust`}
              >
                <button
                  onClick={handleAdd}
                  className={`${styles.mainLightBlue} border-0`}
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
                  <h5 className="mx-3">{name}</h5>
                  <p className={`m-0 ${styles.textColor} commentDate`}>
                    {createdAt}
                  </p>
                </div>
                <button
                  className={`d-flex align-items-center border-0 bg-white ${styles.mainColor}`}
                >
                  {data ? (
                    <>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content p-4">
                            <h1
                              className="modal-title fs-4 text-dark fw-bold text-start"
                              id="exampleModalLabel"
                            >
                              Delete Comment
                            </h1>
                            <p className="text-secondary my-4 w-100">
                              are you sure you want to delete this comment?This
                              will remove the comment and can't be undone.
                            </p>
                            <div className="d-flex justify-content-end">
                              <button
                                type="button"
                                className="btn btn-secondary mx-5 w-50"
                                data-bs-dismiss="modal"
                              >
                                NO,CANCEL
                              </button>
                              <button
                                onClick={() => getReply(false)}
                                type="button"
                                className="btn btn-danger w-50"
                              >
                                YES,DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex userInteract">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="d-flex align-items-center border-0 bg-white text-danger"
                        >
                          <i class="fa-solid fa-trash mx-2"></i>
                          <p className="m-0">Delete</p>
                        </button>
                        {!isUpdating ? (
                          <button
                            onClick={editComment}
                            className={`d-flex align-items-center border-0 bg-white ${styles.mainColor}`}
                          >
                            <i class="fa-solid fa-pen mx-2"></i>
                            <p className="m-0">Edit</p>
                          </button>
                        ) : (
                          <button
                            onClick={updateComment}
                            className={`d-flex align-items-center border-0 bg-white ${styles.mainColor}`}
                          >
                            <i class="fa-solid fa-check mx-2"></i>
                            <p className="m-0">Update</p>
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={replyTo}
                      className={`d-flex align-items-center border-0 bg-white ${styles.mainColor} commentReply`}
                    >
                      <i class="fa-solid fa-reply mx-2"></i>
                      <p className="m-0">Reply</p>
                    </button>
                  )}
                </button>
              </div>
              <div>
                {!inputEdit ? (
                  <p className={styles.textColor}>{content}</p>
                ) : (
                  <input
                    value={editContent}
                    onChange={handleChange}
                    className="rounded-3 p-2"
                    type="text"
                    placeholder={content}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCommentSection && (
        <AddComment
          isComment={isComment}
          name={"juliusomo"}
          img={"images/avatars/image-juliusomo.png"}
          setReplies={addReply}
          sendToReply={handleNewReply}
          commentOwner={commentOwner}
          id={commentId}
        />
      )}
    </>
  );
}
