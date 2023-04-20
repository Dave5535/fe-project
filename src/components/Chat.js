import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import Sidebar from '../ChatFeatures/Sidebar';
import "./chat.css"
import Chats from '../ChatFeatures/Chats';
import { selectUser } from '../Store/userSlice';



const Chat = () => {

const user = useSelector(selectUser);

    return (

        <div className='container'>

{user ? (<>
    <div className='chat_container'>
       <Sidebar/>
       <Chats/>

            </div>

</>):(
<>
   <h4 className='text-center'>Chat!</h4>
   <div className='text-center'>Logga in för att chata med en vän eller grup av Vänner.</div>
   <a className='text-center' href='http://localhost:3000/login'>Logga in här</a>
   </>
)}
            
      

        </div>
    );

}

export default Chat;