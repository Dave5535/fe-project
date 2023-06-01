import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./chatHeader.css"

import { addFriendToChannel, addChannelMessage, selectChannelType } from '../Store/AppSlice';
import { Avatar } from '@mui/material';
import { selectUser } from '../Store/userSlice';





const ChatHeader = ({ channelName }) => {
    // const channelUserList = useSelector(selectChannelUsers);
    const [users, setUsers] = useState([]);
    // const dispatch = useDispatch();
    const [showUsers, setShowUsers] = useState(false);
    const dispatch = useDispatch();

    const channelType = useSelector(selectChannelType);

    const channelUser = useSelector(selectUser);

    const addUserToList = () => {
        const newUser = {

            user: {
                id: "43573",
                firstName: "Mikael",
                lastName: "Svensson",
                email: "email",
                title: "FOR TESTING", // role in
                userName: "M,S",
                password: "login",
                photo: "https://avatars.githubusercontent.com/u/113359307?s=120&v=4",
                conversations: [],
                events: [],
            }
        };

        setUsers(prevUsers => [...prevUsers, newUser]);
    }


    const showListOfUsers = () => {
        addUserToList();
        setShowUsers(!showUsers);
    }
    const handelUserClicked = (user) => {
        // add the person to the channelUserList
        dispatch(addFriendToChannel({
            user: user,
        }
        ));

        let dateTime = new Date();
        let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let dateString = dateTime.toDateString().slice(4); // Remove the day of the week
        let formattedTimestamp = `${timeString} ${dateString}`;
        // send a message from system that the person is added and by who? 
        dispatch(addChannelMessage({
            MessageId: Math.random(11),
            user: { firstName: "System", photo: "https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
            timestamp: formattedTimestamp,
            message: user.firstName + " " + user.lastName + " have been added by " + channelUser.firstName + " " + channelUser.lastName,
        }
        ));
        setShowUsers(!showUsers)

    }

    if (channelName !== null)
        return (
            <div className='chatHeader'>

                <div className='chatHeader_left'>
                    <h4>
                        <span className='chatHeader_hash'><ChatBubbleOutlineIcon /></span>
                        {channelName}
                    </h4>
                </div>
                <div className='chatHeader_right' onClick={showListOfUsers}>Lägg till användare</div>

                {showUsers && <div className='friend_box shadow'>
                    <div className='friend_content'>

                        <div className='friend_headText border-bottom'>Medlemmar</div>
                        <div className='friend_List shadow'>
                            {users.sort((a, b) => a.user.firstName.localeCompare(b.user.firstName)).map((users) => (
                                <div className='user' key={users.user.id} onClick={() => handelUserClicked(users.user)}>
                                    <Avatar src={users.user.photo} />
                                    <div className='user_name'>{users.user.firstName} {users.user.lastName}  </div>
                                </div>
                            ))
                            }
                        </div>
                        <div className='border-top btn_style'>
                            <button type='button' className=' btn btn-danger m-3 ' onClick={showListOfUsers}>Avbryt</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        )

}
export default ChatHeader
