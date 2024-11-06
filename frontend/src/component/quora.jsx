import React from 'react'
import Qnavbar from './Qnavbar'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Box from './Box'
import './css/quora.css'

function quora() {
  return (
    <>
    <div className='navbar'>
      <Qnavbar/>
    </div>
    <div className='whole'>
    <div className='body'>
      <div className='content'>
        <Sidebar/>
        <Feed/>
        <Box/>
      </div>
    </div>
    </div>
    </>
  )
}

export default quora
