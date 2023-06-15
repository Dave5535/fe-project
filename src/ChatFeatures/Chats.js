import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectChatId, selectChatName, selectChatMessages } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import ChatHeader from './ChatHeader'
import Message from './Message';
import "./chats.css";

const Chats = () => {

  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);
  const chatName = useSelector(selectChatName);
  const chatMessages = useSelector(selectChatMessages);

  const API_URL_Messages = "http://localhost:8080/api/v1/message/";
  const API_URL_Conversation = "http://localhost:8080/api/v1/conversation/";
  const [alert, setAlert] = useState({ type: '', message: '' });
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  
  let dateTime = new Date();
  let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let dateString = dateTime.toDateString().slice(4); 
  let formattedTimestamp = `${timeString} ${dateString}`;

  useEffect(() => {
    setMessages(chatMessages);

  }, [chatMessages]);

  const sendMessage = async e => {
    e.preventDefault();
    const newMessage = {
      sender: user,
      textContent: input,
    }
    await axios.post(API_URL_Messages, newMessage).then(response => {
      if (response.status === 201) {
        console.log(response.data);
        setMessage(response.data);
        setAlert({ type: 'success', message: 'Objekt tillagd!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
    setInput("");
     await messageToConversation();
  }
 
  const messageToConversation = async () => {
    await axios.post(API_URL_Conversation + chatId + "/message/" + message.id).then(response => {
      if (response.status === 201) {
        console.log(response.data);
        const addedmessage = response.data;
        setMessages(addedmessage.messages);

        setAlert({ type: 'success', message: 'Objekt tillagd!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }

    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });

  }
  return (
    <div className='chats bg-light rounded ms-2 shadow'>
      <ChatHeader chatName={chatName} />
      <div className='chats_messages'>
        {messages.map((message) => (<Message
          key={message.id}
          id={message.id}
          timestamp={message.timestamp}
          messages={message.textContent}
          userprop={message.sender}
        />))}</div>
      <div className='chats_input'>
        <form>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} disabled={!chatId} placeholder={'Message  #' + chatName} />
          <button className='chats_input_btn' type='submit' onClick={sendMessage} >Skicka meddelande</button>
        </form>
      </div>
    </div>
  )
}

export default Chats