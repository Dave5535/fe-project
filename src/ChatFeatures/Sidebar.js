import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import "./sidebar.css"
import { addConversation, addFriend, selectUser } from '../Store/userSlice';
import { addChatMessage, setChatInfo } from '../Store/AppSlice';
import { Tooltip } from '@mui/material';
import { set } from 'date-fns';



const Sidebar = () => {
  // used to store things redux
  const dispatch = useDispatch();

  // info about User
  const user = useSelector(selectUser);
  const [friends, setFriends] = useState([]);
  const [alreadyFriends, setAlreadyFriends] = useState(false);
  // All users 
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const showListOfUsers = () => {
    setShowUsers(!showUsers);
  }

  // show from for channels 
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    getAllchats();

    setTimeout(() => {
      console.log(" All Chats :  ", allChat);

    }, 2000);
  }, []);

  const [chatName, setChatName] = useState("");

  // input for AddChannel
  const [input, setInput] = useState("");
  const [channel, setChannel] = useState([]);


  // selection of what chatroom would be created 

  const [selectedOption, setSelectedOption] = useState('vän');


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };


  // settings if you want to see Chat Rum or Vänner 
  const [chatHeader, setChatHeader] = useState('Vänner');


  useEffect(() => {
    getAllUsers();//updating Member List

  }, [user]);
  useEffect(() => {
    setChannel();
  }, []);
  // timeStamp
  let dateTime = new Date();
  let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let dateString = dateTime.toDateString().slice(4);
  let formattedTimestamp = `${timeString} ${dateString}`;

  // intruduction of API 
  const API_URL_User = 'http://localhost:8080/api/v1/user/';
  const API_URL_Conversations = "http://localhost:8080/api/v1/conversation/";
  // if a refresch button is needed
  const [reload, setReload] = useState(false);
  const updateList = () => {
    setReload(!reload);
  }


  // Alert
  const [alert, setAlert] = useState({ type: '', message: '' });


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

  // for adding a channel
  const addChannel = async (e) => {
    e.preventDefault();

    setInput("")
    const c3 = {

      chatName: input,
      channelType: selectedOption,
      channelMessages: {
        user: { firstName: "System", photo: "https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        timestamp: formattedTimestamp,
        message: "Start your conversation today",
      },

    }
    // added laiter channelMessages: [c3.channelMessages]; 
    const newChannel = {
      chatName: c3.chatName,
    }
    setChatName(newChannel.chatName);

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
    // Toggle between "Vänner" and "Chat Rum"
    if (chatHeader === 'Vänner') {
      setChatHeader('Chat Rum');

    } else {
      setChatHeader('Vänner');

    }
  };

  const handelAddChannelForm = () => {
    setShowAddChannel(!showAddChannel);
    setInput("");
  }


  const handelAddIcon = () => {
    if (chatHeader === "Chat Rum") { handelAddChannelForm() }

    if (chatHeader === "Vänner") { showListOfUsers() }
  };


  //store it 
  const handleSelectedMember = (friend) => {

    const isFriend = friends.some((existingFriend) => existingFriend.id === friend.id);
    if (!isFriend) {

      dispatch(addFriend(friend));
    }

  }
  const handleUserInfo = (friend) => {
    console.log("Open you chat");
    // open the chat you have with that person

  }
  const handleUserContextMenu = (friend) => {
    console.log("User info menu");
    // show public user information 
    // abale to create a conerssation with this person direcktly 
  }

  // Stored User from API
  const getAllUsers = async () => {
    await axios.get(API_URL_User).then(response => {
      if (response.status === 200) {
        setUsers(response.data);
        console.log(" All Users :  ", users);
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
              <div className='user p-3 rounded shadow' key={user.id} onClick={() => handleUserInfo(user)} onContextMenu={(e) => handleUserContextMenu(e, user)}>
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