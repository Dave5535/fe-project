import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./message.css";
import { Avatar } from '@mui/material';
import { editChannelMessage, deleteMessage, selectChannelId, selectChannelMessages } from '../Store/AppSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../Store/userSlice';


const Message = (props) => {

  const { timestamp, messages, userprop } = props;

  const dispatch = useDispatch();

  const channelId = useSelector(selectChannelId);
  const channelMessages = useSelector(selectChannelMessages);
  const userInfo = useSelector(selectUser);


  const [user, setUser] = useState("");

  const [showButtons, setShowButtons] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    setUser(userprop);
    
  }, [userprop]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowButtons(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleEditMessage = (messageId, newContent) => { 
      // edit message from API whit messageId
  };
  const handleDeleteMessage = (messageId) => {
     // delete message from API whit messageId
  };

  const handleContextMenu = (messageUser) => {
    return (e) => {
      e.preventDefault();
  
  if (userInfo.role.roleTitle === "admin" || userInfo.id === messageUser.id) {
    setShowButtons(!showButtons);
  }
  

    };
  };

  return (
    <div
      className='message'
      ref={messageRef}
      onContextMenu={handleContextMenu(userprop)}
    >
      
      {channelId !== null && typeof user.photo === 'string' && user.photo.charAt(0) !== "#" ? (
        <Avatar className='picture' src={user.photo} />
      ) : (
        <div>
          <Avatar className='picture' sx={{ bgcolor: user.photo ,position: 'static'}} >
            {user.firstName && user.firstName.charAt(0).toUpperCase()}
            {user.lastName && user.lastName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      )}
      <div className='message_info'>
        <h6>
          {user.firstName}
          <span className='message_timestamp'>{timestamp}</span>
        </h6>
        <p>{messages}</p>
      </div>
      
      {showButtons &&   (
        <div className="message_buttons">
          <button onClick={() => handleEditMessage(messages.id, 'New Content')}><EditIcon/></button>
          <button onClick={() => handleDeleteMessage(messages.id)}><DeleteIcon/></button>
        </div>
      )}
    </div>
  );
};

export default Message;
