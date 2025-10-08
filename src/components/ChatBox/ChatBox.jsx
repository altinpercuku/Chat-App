import React, { useEffect, useState } from 'react'
import "./Chatbox.css"
import assets from '../../assets/assets'
import { supabase } from '../../config/supabase'
import { useNavigate } from 'react-router-dom'


const ChatBox = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data) return navigate("/");
      setUser(data.session.user)
      fetchMessages()
    }

    getSession();


    const channel = supabase.
    channel("realtime-messages")
    .on(
      "postgres_changes",
      {event: "INSERT", schema: "public", table: "messages"},
      (payload) => {
        setMessages((prev) => [...prev, payload.new])
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  },[])

  const fetchMessages = async () => {
    const {data, error} = await supabase
    .from("messages")
    .select("*")
    .order("created_at", {ascending : true});
    if (!error) setMessages(data)
  }

  const sendMessage = async (e) => {
    e.preventDefaul();
    if (!newMsg.trim()) return;

    const {error} = await supabase.from("messages").insert([
      {
        sender_id: user.id,
        receiver_id: "global",
        content: newMsg,
      },
    ])

    if (error) console.error(error);
    setNewMsg("")
  }
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="Profile image" />
        <p>Altin Percuku <img src={assets.green_dot} className='dot' alt="Green Dot" /></p>
        <img src={assets.help_icon} alt="help icon" />
      </div>

      <div className="chat-message">
        <div className="s-message">
          <p className='message'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <div>
            <img src={assets.profile_img} alt="profile image" />
            <p>
              2:30 PM
            </p>
          </div>
        </div>

        <div className="s-message">
          <img src={assets.pic1} className='message-image' alt="Pic 1" />
          <div>
            <img src={assets.profile_img} alt="profile image" />
            <p>
              2:30 PM
            </p>
          </div>
        </div>

        <div className="r-message">
          <p className='message'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <div>
            <img src={assets.profile_img} alt="profile image" />
            <p>
              2:30 PM
            </p>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder='Send a message...' />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="Gallery icon" />
        </label>
        <img src={assets.send_button} alt="Send button" />
      </div>
    </div>
  )
}

export default ChatBox