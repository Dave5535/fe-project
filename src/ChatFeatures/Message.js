import React from 'react'
import "./message.css"
import { Avatar } from '@mui/material'

const Message = (props) => {
 
  
  return (
    <div className='message'>
        <Avatar src="{user.photo}"/>
        <div className='message_info'>
            <h6>{props.user}
                <span className='message_timestamp'>{props.timestamp}
                </span>
            </h6>
            <p>{props.message} </p>

        </div>

    </div>
  )
}

export default Message