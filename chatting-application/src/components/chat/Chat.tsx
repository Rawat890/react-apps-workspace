import './chat.css';
function Chat() {
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src='../../../public/images/avatar.png' />
          <div className="texts">
            <span>Jane doe</span>
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>
        <div className="icons">
          <img src='../../../public/images/phone.png' alt='' />
          <img src='../../../public/images/video.png' alt='' />
          <img src='../../../public/images/info.png' alt='' />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src='../../../public/images/img.png' alt='' />
          <img src='../../../public/images/camera.png' alt='' />
          <img src='../../../public/images/mic.png' alt='' />
          </div>
          <input type='text' placeholder='Type a message...' />
          <div className="emoji">
            <img src='../../../public/images/emoji.png' alt='' />
          </div>
          <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat