import './details.css';

function Details() {
  return (
    <div className='details'>
      <div className="user">
        <img src='../../../../public/images/avatar.png' alt='' />
        <h2>John doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src='../../../../public/images/arrowUp.png' alt='' />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src='../../../../public/images/arrowUp.png' alt='' />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src='../../../../public/images/arrowDown.png' alt='' />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src='' alt='' />
                <span>photo_24.png</span>
              </div>
              <img src='../../../../public/images/download.png' alt='' className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src='../../../../public/images/arrowUp.png' alt='' />
          </div>
        </div>
        <button className='block'>Block User</button>
        <button className='logOut'>Log Out User</button>
      </div>
    </div>
  )
}

export default Details