import List from './components/list/List'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import './App.css';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/lib/firebase';
import { useUserStore } from './lib/userStore';
import { useChatStore } from './lib/chatStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo])

  console.log(currentUser)

  if (isLoading) {
    return <div className="loader">
      Loading....
    </div>
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          <Details />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <Notification />
    </div>
  )
}

export default App