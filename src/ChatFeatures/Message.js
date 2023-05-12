import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./message.css"
import { Avatar } from '@mui/material'
import { addChannelMessage, selectChannelId, selectChannelMessages } from '../Store/AppSlice';

const Message = (props) => {
  const channelId = useSelector(selectChannelId);
  const { timestamp, messages, userprop } = props;

  const [user, setUser] = useState("");



  useEffect(() => {
    setUser(userprop);
    const delay = 1000; // 1 second delay
    setTimeout(() => {
     
    }, delay);
  }, [userprop]);



  if (channelId !== null && typeof user.photo === 'string' && user.photo.charAt(0) !== "#")
    return (
    <div className='message'>
      <div><Avatar src={user.photo} />
        <div className='message_info'>
          <h6>{user.firstName}
            <span className='message_timestamp'>{timestamp}
            </span>
          </h6>
          <p>{messages} </p></div>
      </div>
    </div>);

  if (channelId !== null && typeof user.photo === 'string' && user.photo.charAt(0) === "#")
    return (<div className='message'>
      <div>
        <Avatar sx={{ bgcolor: user.photo }}>
          {user.firstName && user.firstName.charAt(0).toUpperCase()}
          {user.lastName && user.lastName.charAt(0).toUpperCase()}
        </Avatar>
        <div className='message_info'>
          <h6>{user.firstName}
            <span className='message_timestamp'>{timestamp}
            </span>
          </h6>
          <p>{messages} </p></div>
      </div>

    </div>

    );
}

export default Message

