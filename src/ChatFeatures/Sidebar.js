import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { addFriend, selectUser } from '../Store/userSlice';
import { setChatInfo } from '../Store/AppSlice';
import { Avatar } from '@mui/material';
import "./sidebar.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {
  const dispatch = useDispatch();

  const API_URL_User = 'http://localhost:8080/api/v1/user/';
  const API_URL_Conversations = "http://localhost:8080/api/v1/conversation/";
  const [alert, setAlert] = useState({ type: '', message: '' });

  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const [friends, setFriends] = useState([]);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  const [showAddChannel, setShowAddChannel] = useState(false);
  const [allChat, setAllChat] = useState([]);

  const [input, setInput] = useState("");

  const [chatHeader, setChatHeader] = useState('Vänner');

  let dateTime = new Date();
  let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let dateString = dateTime.toDateString().slice(4);
  let formattedTimestamp = `${timeString} ${dateString}`;

  const showListOfUsers = () => {
    setShowUsers(!showUsers);
  }
  useEffect(() => {
    getAllchats();
  }, []);


  useEffect(() => {
    getAllUsers();
  }, [user]);


  const getAllchats = async () => {
    await axios.get(API_URL_Conversations).then(response => {
      if (response.status === 200) {
        setAllChat(response.data);
        setAlert({ type: 'success', message: 'Objekt tillagd!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
  };

  const addChannel = async (e) => {
    e.preventDefault();
    setInput("")
    const newChannel = {
      chatName: input,
    }
    await axios.post(API_URL_Conversations, newChannel).then(response => {
      if (response.status === 201) {
        console.log("Response: " + response.data);
        setAlert({ type: 'success', message: 'Objekt tillagd!' });
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
    handelAddChannelForm();
  }

  const handleChatHeader = () => {
    if (chatHeader === 'Vänner') {
      setChatHeader('Chat Rum');
    } else {
      setChatHeader('Vänner');
    }
  };
  const handelAddChannelForm = () => {
    setShowAddChannel(!showAddChannel);
    setInput("");
  };
  const handelAddIcon = () => {
    if (chatHeader === "Chat Rum") { handelAddChannelForm() }

    if (chatHeader === "Vänner") { showListOfUsers() }
  };

  const handleSelectedMember = (friend) => {
    const isFriend = friends.some((existingFriend) => existingFriend.id === friend.id);
    if (!isFriend) {
      dispatch(addFriend(friend));
    }
  };

  const handleUserInfo = (friend) => {
    console.log("Open you chat with", friend.firstName);
  }
  const handleUserContextMenu = (friend) => {
    console.log("User info menu on", friend.firstName);
  }

  const getAllUsers = async () => {
    await axios.get(API_URL_User).then(response => {
      if (response.status === 200) {
        setUsers(response.data);
        setAlert({ type: 'success', message: 'Objekt hittad!' })
      } else {
        setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });

  }

  return (
    <div className='sidebar mb-3 shadow'>
      <div className='sidebar_top'>
        <Dropdown>
          <Dropdown.Toggle variant="btn btn-primary btn-lg" id="dropdown-basic">
            {chatHeader}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleChatHeader}>Vänner</Dropdown.Item>
            <Dropdown.Item onClick={handleChatHeader}>Chat Rooms</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='sidebar_channels'>
        <div className='sidebar_channelsHeader'>
          <div className='sidebar_header'></div>
          <ExpandMoreIcon />
          <h4>{chatHeader}</h4>
          <AddIcon type="button" onClick={handelAddIcon} className='sidebar_addchannels' />

          {showAddChannel && <div className='addChannel_form'>

            <div className='addChannel_formContent shadow'>
              <div className='addChannel_headText pb-1'>Lägg till kanal</div>

              <form className='form rounded' onSubmit={addChannel} >
                <input value={input} onChange={e => setInput(e.target.value)} className='addChannel_formInput' placeholder='Ange kanalnamn...' />
                <button type='submit' className='addChannel_formContent_btn'>submit</button>
              </form>

              <button type='button' className='btn btn-danger m-3' onClick={handelAddChannelForm}>Avbryt</button>
            </div>

          </div>}


        </div>
      </div>
      <div className='sidebar_channelList'>
        {users && users.map((user) => {
          if (chatHeader === "Vänner") {
            return (
              <div className='user p-3 rounded shadow' key={user.id} onClick={() => handleUserInfo(user)} onContextMenu={(e) => handleUserContextMenu(user)}>
                <Avatar sx={{ bgcolor: user.photo }}>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>
                <div className='user_name ps-2'>{user.firstName} {user.lastName}</div>
              </div>
            );
          }
          return null;
        })}

        {allChat.map((allChat, index) => {
          const isParticipant = allChat.participants.some(participant => participant.id === user.id);

          if (chatHeader === "Chat Rum" && isParticipant) {
            return (
              <div key={index} className='sidebarChannel' onClick={() => dispatch(setChatInfo({
                key: index,
                id: allChat.id,
                chatName: allChat.chatName,
                participants: allChat.participants,
                messages: allChat.messages,
                timestamp: allChat.timestamp,
              }))}>
                <h5 className='rounded p-1'>{allChat.chatName}</h5>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className='sidebar_profile'>
        <Avatar >{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName + " " + user.lastName}</h6>
          <p>{user.id}</p>
        </div>
      </div>

      {showUsers && <div className='friend_box shadow'>
        <div className='friend_content'>

          <div className='friend_headText border-bottom text-black p-2'>Medlemmar</div>
          <div className='friend_List'>
            {users && users.sort((a, b) => (a.firstName || '').localeCompare(b.firstname || '')).map((user) => {
              const isFriend = friends.some((friend) => friend.id === user.id);

              return (
                <div className="user rounded p-2" key={user.id} onClick={() => handleSelectedMember(user)}>
                  <Avatar sx={{ bgcolor: user.photo }}>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>
                  <div className="user_name ps-2">
                    {user.firstName} {user.lastName}
                  </div>
                  {isFriend && <div className="friend_status ps-1" >Already friends</div>}
                </div>
              );
            })}
          </div>
          <div className='border-top btn_style'>
            <button type='button' className=' btn btn-danger m-3 ' onClick={() => showListOfUsers()}>Avbryt</button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Sidebar