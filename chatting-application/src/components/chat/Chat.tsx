import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { toast } from 'react-toastify';

function Chat() {
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const endRef = useRef(null);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    })

    return () => {
      unsub();
    }
  }, [chatId])

  console.log("Chat is - ", chat)

  const handleEmoji = (e) => {
    setMessage(prev => prev + e.emoji);
  }

  const handleSendMessage = async () => {
    if (message === " ") {
      return;
    }
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message,
          createdAt: new Date(),
        })
      })

      console.log("current - ", currentUser.id)
      console.log("user - ", user.id || "none")
      const userIds = [currentUser.id, user.id];
      console.log("User. - ", userIds)
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapshot = await getDoc(userChatRef);
        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();
          const chatIndex = userChatData.chats.findIndex(c => c.chatId === chatId);

          userChatData.chats[chatIndex].lastMessage = message;
          userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          })
        }
      })
      setMessage('');
    } catch (err) {
      console.log(err)
      toast.error("Failed to send message.")
    }
  }

  return (
    <div className='chat'>

      {/* Header section */}
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

      {/* Messages section  */}
      <div className="center">
        {
          chat?.messages?.map((message) => (
            <div className="message own" key={message?.createdAt}>
              <div className="texts">
                {message.image && <img src={message.image} />}

                <p>{message.message}</p>
                {/* <span>{message.createdAt}</span> */}
              </div>
            </div>
          ))
        }
        <div ref={endRef}>
        </div>
      </div>

      {/* input section  */}
      <div className="bottom">
        <div className="icons">
          <img src='../../../public/images/img.png' alt='' />
          <img src='../../../public/images/camera.png' alt='' />
          <img src='../../../public/images/mic.png' alt='' />
        </div>
        <input type='text'
          value={message}
          placeholder='Type a message...'
          onChange={(e) => setMessage(e.target.value)} />
        <div className="emoji">
          <img src='../../../public/images/emoji.png' alt='' onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton' onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat