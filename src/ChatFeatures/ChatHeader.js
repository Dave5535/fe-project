import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./chatHeader.css"
import axios from 'axios';
import { addFriendToChat, addChatMessage } from '../Store/AppSlice';
import { Avatar } from '@mui/material';
import { selectUser } from '../Store/userSlice';





const ChatHeader = ({ chatName }) => {

    const API_URL = "http://localhost:8080/api/v1/user/"; 
    const [alert, setAlert] = useState({ type: '', message: '' });

    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
   
    const searchQueries = searchQuery.trim().toLowerCase().split(/\s+/); // Split the search query into individual queries

const filteredUsers = searchQueries.reduce((result, query) => {
  return result.filter(user =>
    user.firstName.toLowerCase().includes(query) ||
    user.lastName.toLowerCase().includes(query)
  );
}, userList);


     // get ListOfUsers
     useEffect(() => {
        GetData();
setTimeout(() => {
    
        console.log(userList)
    }, 2000);
    }, [chatName]);

    const GetData = async () => {
        await axios.get(API_URL).then(response => {
            if (response.status === 200) {
                setUserList(response.data);
                setAlert({ type: 'success', message: 'Objekt hittad!' })
            } else {
                setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
            }
        }).catch(error => {
            console.log("ERROR: ", error);
            setAlert({ type: 'danger', message: error.message })
        });

    }

    // const dispatch = useDispatch();
    const [showUsers, setShowUsers] = useState(false);
    const dispatch = useDispatch();

    

    const channelUser = useSelector(selectUser);


        let dateTime = new Date();
        let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let dateString = dateTime.toDateString().slice(4); // Remove the day of the week
        let formattedTimestamp = `${timeString} ${dateString}`;
  
    const showListOfUsers = () => {
        
        setShowUsers(!showUsers);
    }
    const handelUserClicked = (user) => {
        // add the person to the channelUserList
       console.log("user clicked ");

        // send a message from system that the person is added and by who? 
        const message = {
            MessageId: Math.random(11),
            user: { firstName: "System", photo: "https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
            timestamp: formattedTimestamp,
            message: user.firstName + " " + user.lastName + " have been added by " + channelUser.firstName + " " + channelUser.lastName,
        }
        
        setShowUsers(!showUsers)
        setSearchQuery("");
    } ;



    if (chatName !== null)
        return (
            <div className='chatHeader'>
      <div className='chatHeader_left'>
        <h4>
          <span className='chatHeader_hash'><ChatBubbleOutlineIcon /></span>
          {chatName}
        </h4>
      </div>
      <div className='chatHeader_right' onClick={showListOfUsers}>Lägg till användare</div>

      {showUsers && (
        <div className='friend_box shadow'>
          <div className='friend_content'>
            <div className='friend_headText border-bottom'>Medlemmar</div>
            <div className='friend_List shadow'>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {filteredUsers.map(user => (
                <div className='user' key={user.id} onClick={() => handelUserClicked(user)}>
                  <Avatar>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>
                  <div className='user_name'>{user.firstName} {user.lastName}</div>
                </div>
              ))}
            </div>
            <div className='border-top btn_style'>
              <button type='button' className='btn btn-danger m-3 ' onClick={showListOfUsers}>Avbryt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
export default ChatHeader
