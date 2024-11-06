import React from 'react'
import Navbar from './Historynavbar'

import Feed from './Historyfeed'

function historymain() {
  return (
    <>
    <div className='navbar'>
      <Navbar/>
    </div>
    <div className='whole'>
    <div className='body'>
      <div className='content'>
        <Feed/>
      </div>
    </div>
    </div>
    </>
  )
}

export default historymain
