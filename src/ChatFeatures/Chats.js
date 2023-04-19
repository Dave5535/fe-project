import React from 'react'
import ChatHeader from './ChatHeader'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./chats.css";
import Message from './Message';

const Chats = () => {
    return (
        <div className='chats'>
            <ChatHeader />

            <div className='chats_messages'>
                <Message/>
                <Message/>
                <Message/>
            </div>

            <div className='chats_input'>
                <form>
                    <input type="text " placeholder='Message' />

                    <button className='chats_input_btn' type='submit'>Send message</button>
                    
                        <EmojiEmotionsIcon fontSize='large' className='chats_inputIcons'/>
                    

                </form>

            </div>

        </div>
    )
}

export default Chats