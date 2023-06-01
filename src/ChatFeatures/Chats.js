import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectChannelId, selectChannelName, selectChannelMessages, setChannelInfo } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import { addChannelMessage, } from '../Store/AppSlice';
import ChatHeader from './ChatHeader'

import Message from './Message';
import "./chats.css";

const Chats = () => {

    // user / channel info
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

   // local timeStamp
    let dateTime = new Date();
    let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let dateString = dateTime.toDateString().slice(4); // Remove the day of the week
    let formattedTimestamp = `${timeString} ${dateString}`;

    // turorial 
    const [showTutorial, setShowTutorial] = useState(false);
    useEffect(() => {
        if (showTutorial) {
          // Display the tutorial modal or perform other tutorial actions
          // Attach event listeners or onClick handlers to handle user interactions
        }
      }, [showTutorial]);
      
      const dismissTutorial = () => {
        setShowTutorial(false);
        // Perform any necessary cleanup or store the user's preference to dismiss the tutorial in the future
      };

    const sendMessage = e => {
        e.preventDefault();
        const newMessage = {
            MessageId: Math.random(11),
            user: user,
            timestamp: formattedTimestamp,
            message: input,

        };

        // send to BE for storing 
        dispatch(addChannelMessage(newMessage));
        setInput("");
    }


    return (

        <div className='chats'>
 {showTutorial && (
        // Render the tutorial modal or tooltip based on the state
        <div className='tutorial'>
          <h2>Vällkommen till chaten!</h2>
          {/* Display tutorial steps or instructions */}
          <button className='btn ' onClick={dismissTutorial}>skipa</button>
        </div>
      )}

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