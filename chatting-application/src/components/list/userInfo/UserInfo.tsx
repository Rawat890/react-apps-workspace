import './userInfo.css'
import {useUserStore} from '../../../lib/userStore';

function UserInfo() {
  const {currentUser} = useUserStore();
  return (
    <div className='userInfo'>
    <div className="user">
      <img src={currentUser.avatar || '../../../../public/images/avatar.png' } alt=''/>
      <h2>{currentUser.username}</h2>
    </div>
    <div className="icons">
      <img src='../../../../public/images/more.png' className='image' />
      <img src='../../../../public/images/video.png' className='image' />
      <img src='../../../../public/images/edit.png' className='image' />
    </div>
    </div>
  )
}

export default UserInfo