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
import { selectUser } from "../../feature/userslice"; 


function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Historyquest({ post }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [answer, setanswer] = useState("");
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
        user:user,
      };
      try {
        const res = await axios.post("/api/history", body, config);
        console.log(res.data);
        alert("Answer added successfully");
        setModalOpen(false);
        window.location.href = "/";
      } catch (e) {
        console.log(e);
        alert("Failed to add answer. Please try again.");
      }
    }
  };

  return (
      <div className="body">
      <div className="head">
        <div className="information">
          <Avatar src={post?.user?.photo} />
          <h4>{post?.user?.userName} </h4>
          <small>
            <LastSeen date={post?.createdAt} />
          </small>
        </div>
        </div>
         
          <p className="quest">{post?.questionName}Question1</p>
          {post.questionUrl !== ""  && <img className="questionurl" src={post.questionUrl} alt="question visual" />}
          <button className="Ansbtn" onClick={() => setModalOpen(true)}>
            Answer
          </button>
          <Modal
            open={modalOpen}
            closeIcon={<CloseIcon />}
            onClose={() => setModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by <span className="name">{post?.user?.userName}</span> 
                <span className="date">
                    {new Date(post?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={(value)=> setanswer(value)}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancel" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="add"
              >
                Add Answer
              </button>
            </div>
          </Modal>
         
        
       
      <div className="footer">
        <div className="foot">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        <div className="Left">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
        </div>
        <p className="answer-count">
          {post?.allAnswers?.length || 0} Answer(s)
        </p>
        <div className="post__answer">
          {post?.allAnswers?.map((_a, index) => (
            <div key={index} className="post-answer-container">
              <div className="post-answered">
                <Avatar src={_a?.user?.photo} />
                <div className="post-info">
                  <p>{_a?.user?.userName}</p>
                  <span>
                    <LastSeen date={_a?.createdAt} />
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(_a?.answer)}This is the answer</div>
            </div>
          ))}
          {console.log(post)}
        </div>
        </div>
        
  );
}

export default Historyquest;
