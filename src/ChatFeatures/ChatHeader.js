import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./chatHeader.css"
const ChatHeader = ({channelName}) => {
   
    return (
        <div className='chatHeader'>

            <div className='chatHeader_left'>
                <h4>
                    <span className='chatHeader_hash'><ChatBubbleOutlineIcon/></span>
                    {channelName}
                </h4>
            </div>
           


        </div>
    )
}

export default ChatHeader