import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import Sidebar from '../ChatFeatures/Sidebar';
import "./chat.css"
import Chats from '../ChatFeatures/Chats';
import { selectUser } from '../Store/userSlice';



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