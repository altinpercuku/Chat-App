import React from 'react'
import "./Chat.css"
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import {signOut} from "../../config/supabase"
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";

const Chat = () => {

  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat