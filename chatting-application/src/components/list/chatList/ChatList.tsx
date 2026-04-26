import { useEffect, useState } from 'react'
import './chatList.css';
import AddUser from '../../addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { useChatStore } from '../../../lib/chatStore';
import { db } from '../../../lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

function ChatList() {
  const [chats, setChats] = useState([]) as any;
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      const items = res.data().chats;
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      })

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))

    })

    return () => {
      unsub();
    }
  }, [currentUser.id])

  console.log("Chats - ", chats)

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user)
  }
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

      {chats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
          <img src={chat.user.avatar || '../../../../public/images/avatar.png'} alt='' />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode ? <AddUser /> : null}
    </div>
  )
}

export default ChatList