import React from 'react'
import "./message.css"
import { Avatar } from '@mui/material'

const Message = () => {
  return (
    <div className='message'>
        <Avatar/>
        <div className='message_info'>
            <h6>sssssgshg
                <span className='message_timestamp'> this is a timestamp
                </span>
            </h6>
            <p>This is a message</p>

        </div>

    </div>
  )
}

export default Message