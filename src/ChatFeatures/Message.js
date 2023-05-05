import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./message.css"
import { Avatar } from '@mui/material'
import { addChannelMessage, selectChannelId, selectChannelMessages } from '../Store/AppSlice';

const Message = (props) => {
  const channelId = useSelector(selectChannelId);
  const { timestamp, messages, user } = props;

  if (channelId !== null);
  return (<div className='message'>
    <Avatar src={user.photo} />
    <div className='message_info'>
      <h6>{user.firstName}
        <span className='message_timestamp'>{timestamp}
        </span>
      </h6>
      <p>{messages} </p>

    </div>

  </div>);

}

export default Message