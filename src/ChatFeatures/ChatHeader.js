import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./chatHeader.css"

import { addFriendToChannel, selectChannelUsers, addChannelMessage  } from '../Store/AppSlice';
import { Avatar } from '@mui/material';
import { selectUser } from '../Store/userSlice';





const ChatHeader = ({ channelName }) => {
   // const channelUserList = useSelector(selectChannelUsers);
    const [users, setUsers] = useState([]);
   // const dispatch = useDispatch();
    const [showUsers, setShowUsers] = useState(false);
    const dispatch = useDispatch();

    const channelUsers = useSelector(selectChannelUsers);

    const channelUser = useSelector(selectUser);

    const handelAddFriend = () => {
        const newUser = {

            user: {
                id: "43573",
                firstName: "Mikael",
                lastName: "Svennson",
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
        showListOfUsers();
    }


    const showListOfUsers = () => {
       setShowUsers(!showUsers);
    }
      const handelUserClicked = (user) => {

// add the person to the channelUserList
dispatch(addFriendToChannel({
    user: user,}
 ));

 // send a message from system that the person is added and by who? 
 dispatch(addChannelMessage({
    user:{ firstName: "System", photo: "https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
    id: "System_id", 
    timestamp: "date from Api",
    message: user.firstName +" "+ user.lastName + " have been added by " + channelUser.firstName + " " + channelUser.lastName,
    }
 ));
setShowUsers(!showUsers)
     
}

    if(channelName !== null)
        return (
            <div className='chatHeader'>

                <div className='chatHeader_left'>
                    <h4>
                        <span className='chatHeader_hash'><ChatBubbleOutlineIcon /></span>
                        {channelName}
                    </h4>
                </div>
                <div className='chatHeader_right' onClick={handelAddFriend}>Add Friends</div>

                {showUsers && <div className='friend_box'>
                <div className='friend_content'>
                        
                        <div className='friend_headText border-bottom'>Friends List</div>
                        <div className='friend_List'>
                          {users.map((users) => (
                           <div className='user' key={users.user.id} onClick={() => handelUserClicked(users.user)}>
                            <Avatar src={users.user.photo}/>
                            <div className='user_name'>{users.user.firstName} {users.user.lastName }  </div>
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