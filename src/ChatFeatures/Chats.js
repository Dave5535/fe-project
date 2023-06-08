import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectChatId, selectChatName, selectChatMessages, selectChat } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import { addChatMessage, } from '../Store/AppSlice';
import ChatHeader from './ChatHeader'

import Message from './Message';
import "./chats.css";

const Chats = () => {

    // Api 
    const API_URL_Messages = "http://localhost:8080/api/v1/message/";
    const [alert, setAlert] = useState({ type: '', message: '' });
    // user / Chat info
    const user = useSelector(selectUser);
    const chatId = useSelector(selectChatId);
    const chatName = useSelector(selectChatName);
    const chatMessages = useSelector(selectChatMessages); 
    const conversation = useSelector(selectChat);
    
    const dispatch = useDispatch();

    // for message and input
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
       
        console.log(chatId +"  :  "+ chatName + "  :   " ,chatMessages)
        setMessages(chatMessages);
        
    }, [chatMessages]);

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

    const sendMessage = async e => {
        e.preventDefault();
        const newMessage = {
          sender: user ,
          textContent: input,
          emojis : [],
          attachments: [],
          conversation: conversation,
          editedStatus:false,
          deletedStatus:false,
        }
        console.log(newMessage);
        // send to BE for storing 
        await axios.post(API_URL_Messages,newMessage).then(response => {
          if (response.status === 201) {
            console.log(response.data);
            setAlert({ type: 'success', message: 'Objekt tillagd!' });
          } else {
            setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
          }
    
        }).catch(error => {
          console.log("ERROR: ", error);
          setAlert({ type: 'danger', message: error.message });
        });

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

            <ChatHeader chatName={chatName} />
            <div className='chats_messages'>
              {messages.map((message, index) => (<Message
                key={index}
                id={message.id}
                timestamp={message.timestamp}
                messages={message.textContent}
                userprop={message.sender}
            />))}</div>
 

            <div className='chats_input'>
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} disabled={!chatId} placeholder={'Message  #' + chatName} />
                    <button className='chats_input_btn' type='submit' onClick={sendMessage} >Send message</button>
                </form>

            </div>

        </div>
    )
}

export default Chats