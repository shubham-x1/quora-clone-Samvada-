import React, { useState } from "react";
import { Avatar } from "@mui/material";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlined,
  MoreHorizOutlined,
  RepeatOneOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import ReactHtmlParser from "html-react-parser";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userslice";
import "./css/question.css";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Question({ post }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      try {
        await axios.post("/api/ans", body, config);
        alert("Answer added successfully");
        setModalOpen(false);
        window.location.reload(); // Reload page to see new answer
      } catch (e) {
        alert("Failed to add answer. Please try again.");
      }
    }
  };

  const handleShare = () => {
    const questionLink = `${window.location.origin}/question/${post._id}`;
    navigator.clipboard.writeText(questionLink).then(
      () => alert("Link copied to clipboard!"),
      (err) => console.error("Failed to copy link: ", err)
    );
  };

  const handleUpvote = async () => {
    try {
      await axios.post(`/api/questions/${post._id}/upvote`);
      alert("Upvoted successfully!");
    } catch (error) {
      console.error("Error upvoting:", error);
      alert("Failed to upvote. Please try again.");
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(`/api/questions/${post._id}/downvote`);
      alert("Downvoted successfully!");
    } catch (error) {
      console.error("Error downvoting:", error);
      alert("Failed to downvote. Please try again.");
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await axios.delete(`/api/questions/${post._id}`);
      alert("Question deleted successfully!");
      window.location.reload(); // Reload page after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  return (
    <>
      <div className="body">
        <div className="head">
          <div className="information">
            <Avatar src={post?.user?.photo} />
            <h4>{post?.user?.userName}</h4>
            <small>
              <LastSeen date={post?.createdAt} />
            </small>
          </div>
        </div>

        <p className="quest">{post?.questionName}</p>
        {post.questionUrl && (
          <img className="questionurl" src={post.questionUrl} alt="question visual" />
        )}

        <div className="button-group">
          <button className="Ansbtn" onClick={() => setModalOpen(true)}>
            Answer
          </button>
          {user?.uid === post?.user?.uid && (
            <>
              <button 
                className="delete-btn" 
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Delete Question
              </button>

              {/* Delete Confirmation Modal */}
              <Modal
                open={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                center
              >
                <h2>Are you sure you want to delete this question?</h2>
                <button onClick={handleDeleteQuestion}>Yes</button>
                <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
              </Modal>
            </>
          )}
        </div>

        {/* Answer Modal */}
        <Modal
          open={modalOpen}
          closeIcon={<CloseIcon />}
          onClose={() => setModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
        >
          <div className="modal__question">
            <h1>{post?.questionName}</h1>
            <p>
              asked by <span className="name">{post?.user?.userName}</span> 
              <span className="date">{new Date(post?.createdAt).toLocaleString()}</span>
            </p>
          </div>
          <div className="modal__answer">
            <ReactQuill
              value={answer}
              onChange={(value) => setAnswer(value)}
              placeholder="Enter your answer"
            />
          </div>
          <div className="modal__button">
            <button className="cancel" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="add">
              Add Answer
            </button>
          </div>
        </Modal>

        {/* Footer with Upvote/Downvote */}
        <div className="footer">
          <div className="foot">
            <ArrowUpwardOutlined onClick={handleUpvote} />
            <ArrowDownwardOutlined onClick={handleDownvote} />
          </div>
          <RepeatOneOutlined />
          <ChatBubbleOutlined />
          <div className="Left">
            <ShareOutlined onClick={handleShare} />
            <MoreHorizOutlined />
          </div>
        </div>

        {/* Display Answers */}
        <p className="answer-count">{post?.allAnswers?.length || 0} Answer(s)</p>
        {post?.allAnswers?.map((_a, index) => (
          <div key={index} className="post-answer-container">
            <div className="post-answered">
              <Avatar src={_a?.user?.photo} />
              <div className="post-info">
                <p>{_a?.user?.userName}</p>
                <span><LastSeen date={_a?.createdAt} /></span>
              </div>
            </div>
            <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Question;