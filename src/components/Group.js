import React, { useEffect, useState } from 'react'
import Sidebar from '../ChatFeatures/Sidebar';
import Chats from '../ChatFeatures/Chats';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';

const Group = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    const [showlist, setShowlist] = useState(false);

    const update = () => {
        setShowlist(!showlist);
    }
    const chatlist = () => {



    }


    if (user !== null)
        return (


            <div className='container'>
                <h4 className='text-center'>Klasser!</h4>
                <div className='text-center'>Klasser/grupper skapade av lärare!</div>

                <div className='chat_container'>
                    <Sidebar />
                    <Chats />

                </div>

            </div>
        )


}

export default Group;