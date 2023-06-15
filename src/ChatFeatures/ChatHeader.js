import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./chatHeader.css"
import axios from 'axios';
import { selectChatId } from '../Store/AppSlice';
import { Avatar } from '@mui/material';
import { selectUser } from '../Store/userSlice';





const ChatHeader = ({ chatName }) => {

  const API_URL = "http://localhost:8080/api/v1/user/";
  const API_URL_CONVERSATION = "http://localhost:8080/api/v1/conversation/";
  const [alert, setAlert] = useState({ type: '', message: '' });
  const chatId = useSelector(selectChatId);
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueries = searchQuery.trim().toLowerCase().split(/\s+/); // Split the search query into individual queries

  const filteredUsers = searchQueries.reduce((result, query) => {
    return result.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query)
    );
  }, userList.slice());


  // get ListOfUsers
  useEffect(() => {
    GetData();

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
  const handelUserClicked = async (user) => {
    await axios.post(API_URL_CONVERSATION + chatId + "/participant/" + user.id).then(response => {
      if (response.status === 201) {
        console.log(response.data);
        setAlert({ type: 'success', message: 'Objekt Tillagt!' })
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });
    setShowUsers(!showUsers)
    setSearchQuery("");
  };
  // delete a user from conversation 
  const handelDeleteOfUserInConversation = async (user) => {
    await axios.delete(API_URL_CONVERSATION + chatId + "/participant/" + user.id).then(response => {
      if (response.status === 201) {
        console.log(response.data);
        setAlert({ type: 'success', message: 'Objekt Tillagt!' })
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });
    setShowUsers(!showUsers)
    setSearchQuery("");
  };


  if (chatName !== null)
    return (
      <div className='chatHeader'>
        <div className='chatHeader_left'>
          <h4>
            <span className='chatHeader_hash'><ChatBubbleOutlineIcon /></span>
            {chatName}
          </h4>
        </div>
        <div className='chatHeader_right p-2 shadow' onClick={showListOfUsers}>Lägg till användare</div>

        {showUsers && (
          <div className='friend_box shadow'>
            <div className='friend_content'>
              <div className='friend_headText border-bottom text-black p-2'>Medlemmar</div>
              <div className='friend_List shadow'>
                <input
                  type="text"
                  placeholder="Sök användare..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='mb-1 rounded' />
                {filteredUsers.map(user => (
                  <div className='user rounded p-2' key={user.id} onClick={() => handelUserClicked(user)}>
                    <Avatar>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>
                    <div className='user_name ps-2'>{user.firstName} {user.lastName}</div>
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
