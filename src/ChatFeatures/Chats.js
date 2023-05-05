import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectChannelId, selectChannelName, selectChannelMessages, setChannelInfo } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import { addChannelMessage, } from '../Store/AppSlice';
import ChatHeader from './ChatHeader'
import "./chats.css";
import Message from './Message';


const Chats = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const channelMessages = useSelector(selectChannelMessages);

    const dispatch = useDispatch();

    // for message and input
    const [input, setInput] = useState("");
    const [message, setMessages] = useState([]);


    useEffect(() => {
        setMessages(channelMessages);
    }, [channelMessages]);




    const sendMessage = e => {
        e.preventDefault();
        const newMessage = {
            user: user,
            timestamp: "date from Api",
            message: input,

        };
        dispatch(addChannelMessage(newMessage));
        setInput("");
    }


    return (

        <div className='chats'>
            <ChatHeader channelName={channelName} />
            <div className='chats_messages'>{message.map((message, index) => (<Message
                key={index}
                timestamp={message.timestamp}
                messages={message.message}
                user={message.user}
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