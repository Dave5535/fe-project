import React from 'react'
import ChatHeader from './ChatHeader'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./chats.css";
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChanelId, selectChanelName } from '../Store/AppSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { selectUser } from '../Store/userSlice';

const Chats = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChanelId);
    const channelName = useSelector(selectChanelName);

    // for message and input
    const [input,setInput ] = useState(""); 
    const [message,setMessage] = useState([]);


    // get chats from DB 
    useEffect(() => { 
        if (channelId){
// get the chats collection of channels where id = channelId) collection ( "messages") 
// orderBy("timestamp", 'desc').onSnapshot(Snapshot) => setMessage(snapshot.docs.map((dok) => doc.data()));
     
}

},[channelId])

const timestamp = "date from Api";

const sendMessage = e =>{
 e.preventDefault();
 const newMessage = {
    timestamp: timestamp,
    message: input,
    user: user.firstName,
 };
 setMessage(prevMessages => [...prevMessages, newMessage]);
 setInput("");
 }


    return (
        <div className='chats'>
            <ChatHeader channelName={channelName}/>

            <div className='chats_messages'>
            {message.map((message, index) => (
    <Message key={index} timestamp={message.timestamp} message={message.message} user={message.user} />
))} 

            </div>

            <div className='chats_input'>
                <form>
                    <input type="text " value={input} onChange={e => setInput(e.target.value)} disabled={!channelId} placeholder={'Message  #'+ channelName} />

                    <button className='chats_input_btn' type='submit' onClick={sendMessage} >Send message</button>
                    
                        <EmojiEmotionsIcon fontSize='large' className='chats_inputIcons'/>
                    

                </form>

            </div>

        </div>
    )
}

export default Chats