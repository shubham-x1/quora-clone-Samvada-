import React, { useState, useEffect } from 'react'
import Hquestion from './Historyquest';
import Hbox from './Historybox'
import axios from 'axios'



const Historyfeed = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get("/api/history")
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
      <Hbox/>
      {post.map((post, index) => (
        <Hquestion key={index} post={post} />
      ))}
    </div>
  )
}

export default Historyfeed;
