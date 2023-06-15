import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../ChatFeatures/Sidebar';
import Chats from '../ChatFeatures/Chats';
import { selectUser } from '../Store/userSlice';
import "./chat.css"
const Chat = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    if (user !== null)
        return (

            <div className='container'>
                <div className='chat_container'>
                    <Sidebar />
                    <Chats />
                </div>
            </div>
        )
}

export default Chat;