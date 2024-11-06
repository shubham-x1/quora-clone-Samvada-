import React, { useState, useEffect } from 'react';
import Question from './question'
import Box from './Quorabox'
import './css/feed.css'
import axios from 'axios'



const Feed = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get("/api/quest")
      .then((res) => {
        console.log(res.data.reverse());
        setPost(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className='full'>
      <Box/>
      {post.map((post, index) => (
        <Question key={index} post={post} />
      ))}
    </div>
  )
}

export default Feed
