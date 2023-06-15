import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./message.css";
import { Avatar } from '@mui/material';
import { selectChatId, selectChatMessages } from '../Store/AppSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectUser } from '../Store/userSlice';


const Message = (props) => {

  const { id, timestamp, messages, userprop } = props;

  const dispatch = useDispatch();

  const ChatId = useSelector(selectChatId);
  const ChatMessages = useSelector(selectChatMessages);
  const userInfo = useSelector(selectUser);


  const [user, setUser] = useState("");

  const [showButtons, setShowButtons] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    setUser(userprop);
    console.log(id)
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
    console.log(messageId + " : " + newContent)
  };
  const handleDeleteMessage = (messageId) => {
    // delete message from API whit messageId
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
      {ChatId !== null && userprop && ( // Add a null check for userprop
        <div className='me-2'>
          <Avatar sx={{ bgcolor: user.photo }}>
            {userprop.firstName.charAt(0).toUpperCase() + userprop.lastName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      )}
      <div className='message_info'>
        <h6>
          {userprop && userprop.firstName} {/* Add a null check for userprop */}
          <span className='message_timestamp'>{timestamp}</span>
        </h6>
        <p>{messages}</p>
      </div>

      {showButtons && userprop && ( // Add a null check for userprop
        <div className="message_buttons">
          <button onClick={() => handleEditMessage(id, 'New Content')}><EditIcon /></button>
          <button onClick={() => handleDeleteMessage(id)}><DeleteIcon /></button>
        </div>
      )}
    </div>
  );
};

export default Message;
