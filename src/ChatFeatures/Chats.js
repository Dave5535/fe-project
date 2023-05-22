import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectChannelId, selectChannelName, selectChannelMessages, setChannelInfo } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import { addChannelMessage, } from '../Store/AppSlice';
import ChatHeader from './ChatHeader'

import Message from './Message';
import "./chats.css";

const Chats = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const channelMessages = useSelector(selectChannelMessages);

    const dispatch = useDispatch();

    // for message and input
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // get messages from BE 
        setMessages(channelMessages);
    }, [channelMessages]);


    let dateTime = new Date().toString();

    const sendMessage = e => {
        e.preventDefault();
        const newMessage = {
            MessageId: Math.random(11),
            user: user,
            timestamp: dateTime,
            message: input,

        };

        // send to BE for storing 
        dispatch(addChannelMessage(newMessage));
        setInput("");
    }


    return (

        <div className='chats'>
            <ChatHeader channelName={channelName} />
            <div className='chats_messages'>{messages.map((message, index) => (<Message
                key={index}
                id={message.user.id}
                timestamp={message.timestamp}
                messages={message.message}
                userprop={message.user}
            />))}</div>

            <div className='chats_input'>
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} disabled={!channelId} placeholder={'Message  #' + channelName} />
                    <button className='chats_input_btn' type='submit' onClick={sendMessage} >Send message</button>
                </form>

            </div>

        </div>
    )
}

export default Chats