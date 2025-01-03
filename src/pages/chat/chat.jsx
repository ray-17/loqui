import React, { useContext, useEffect, useState } from 'react'
import './chat.css'
import LeftSideBar from '../../components/leftsidebar/leftsidebar'
import ChatBox from '../../components/chatbox/chatbox'
import RightSideBar from '../../components/rightsidebar/rightsidebar'
import { AppContext } from '../../context/AppContext'

const Chat = () => {

  const { chatData, userdata } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (chatData && userdata) {
      setLoading(false);
    }
  }, [chatData, userdata]
  )


  return (
    <div className='chat'>
      {
        loading
          ? <p className='loading'>Loading...</p>
          :
          <div className="chat-container">
            <LeftSideBar />
            <ChatBox />
            <RightSideBar />
          </div>
      }

    </div>
  )
}

export default Chat