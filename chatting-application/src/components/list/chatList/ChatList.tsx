import React, { useState } from 'react'
import './chatList.css';

function ChatList() {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src='../../../../public/images/search.png' />
          <input type='text' placeholder='Search' />
        </div>
        <img src={addMode ? '../../../../public/images/minus.png' : '../../../../public/images/plus.png'} className='add'
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

      <div className="item">
        <img src='../../../../public/images/avatar.png' alt='' />
        <div className="texts">
          <span>John</span>
          <p> hello</p>
        </div>
      </div>

    </div>
  )
}

export default ChatList