import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectChatId } from '../Store/AppSlice';
import { selectUser } from '../Store/userSlice';
import { Avatar } from '@mui/material';
import "./message.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Message = (props) => {

  const { id, timestamp, messages, userprop } = props;

  const ChatId = useSelector(selectChatId);
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
    console.log(messageId + " : " + newContent)
  };
  const handleDeleteMessage = (messageId) => {
    console.log(messageId);
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
      {ChatId !== null && userprop && ( 
        <div className='me-2'>
          <Avatar sx={{ bgcolor: user.photo }}>
            {userprop.firstName.charAt(0).toUpperCase() + userprop.lastName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      )}
      <div className='message_info'>
        <h6>
          {userprop && userprop.firstName} 
          <span className='message_timestamp'>{timestamp}</span>
        </h6>
        <p>{messages}</p>
      </div>

      {showButtons && userprop && ( 
        <div className="message_buttons">
          <button onClick={() => handleEditMessage(id, 'New Content')}><EditIcon /></button>
          <button onClick={() => handleDeleteMessage(id)}><DeleteIcon /></button>
        </div>
      )}
    </div>
  );
};

export default Message;
