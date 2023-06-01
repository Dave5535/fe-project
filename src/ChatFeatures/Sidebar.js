import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import "./sidebar.css"

import { addConversation, addFriend, selectUser } from '../Store/userSlice';
import { addChannelMessage, setChannelInfo, selectChannelType } from '../Store/AppSlice';
import { Tooltip } from '@mui/material';
import { set } from 'date-fns';


const Sidebar = () => {
  // used to store things
  const dispatch = useDispatch();

  // info about User
  const user = useSelector(selectUser);
  const [userPhoto, setUserPhoto] = useState(true);
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

  // input for AddChannel
  const [input, setInput] = useState("");
  const [channel, setChannel] = useState([]);


  // selection of what chatroom would be created 

  const [selectedOption, setSelectedOption] = useState('vän');


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };
  const renderTooltip = (text, name) => {
    return (
      <Tooltip title={text} placement="bottom" arrow>
        <span className="tooltip-trigger">{name}</span>
      </Tooltip>
    );

  };

  // settings if you want to see Chat Rum or Vänner 
  const [chatHeader, setChatHeader] = useState('Vänner');


  useEffect(() => {
    setFriends(user.friends);
    setChannel(user.conversations);
    if (user.photo.charAt(0) !== "#") {
      setUserPhoto(false)
    }
    if (user.photo.charAt(0) === "#") {
      setUserPhoto(true)
    }

  }, [user]);
  //  

  // adding Channel
  let dateTime = new Date();
  let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let dateString = dateTime.toDateString().slice(4);
  let formattedTimestamp = `${timeString} ${dateString}`;


  const addChannel = (e) => {
    e.preventDefault();

    setInput("")
    const c3 = {
      channelId: "3",
      channelName: input,
      channelType: selectedOption,
      channelMessages: {
        MessageId: Math.random(11),
        user: { firstName: "System", photo: "https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
        timestamp: formattedTimestamp,
        message: "Start your conversation today",
      },

    }

    const newChannel = {
      channelId: c3.channelId,
      channelName: c3.channelName,
      channelType: c3.channelType,
      channelUsers: [{
        user: {
          user,
        },
      }
      ],
      channelMessages: [c3.channelMessages],
    };

    dispatch(addConversation(newChannel));
    ;
    handelAddChannel();

    console.log(newChannel);

  }

  const handleChatHeader = () => {
    // Toggle between "Vänner" and "Chat Rum"
    if (chatHeader === 'Vänner') {
      setChatHeader('Chat Rum');

    } else {
      setChatHeader('Vänner');

    }
  };

  const handelAddChannel = () => {
    setShowAddChannel(!showAddChannel);
    setInput("");
  }


  const handelAddIcon = () => {
    if (chatHeader === "Chat Rum") { handelAddChannel() }

    if (chatHeader === "Vänner") { showListOfUsers() }
  };


  //store it 
  const handleSelectedMember = (friend) => {

    const isFriend = friends.some((existingFriend) => existingFriend.id === friend.id);
    if (!isFriend) {
      dispatch(addFriend(friend));
    }

  }

  // should be replaced whit friends from BE 
  const handelAddFriend = () => {


    const newUser = {


      id: "593",
      firstName: "Mikael",
      lastName: "Svensson",
      email: "email",
      role: "teacher",
      userName: "M,S",
      password: "login",
      photo: "https://avatars.githubusercontent.com/u/113359307?s=120&v=4",
      conversations: [],
      friends: [],
      events: [],


    }
    setUsers(prevUsers => [...prevUsers, newUser]);

  };

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

  const API_URL = 'http://localhost:8080/api/v1/user/';
  // if a refresch button is needed
  const [reload, setReload] = useState(false);
  const updateList = () => {
    setReload(!reload);
  }
  //updating List
  useEffect(() => {
    getAllUsers();

    setTimeout(() => {
      console.log(users);

      console.log("if you get error with http://localhost:8080/api/v1/user/ then it is no problem it just don't have the right connection with BE")
    }, 1000);
  }, []);

  // Alert
  const [alert, setAlert] = useState({ type: '', message: '' });

  const getAllUsers = async () => {
    await axios.get(API_URL).then(response => {
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
    <div className='sidebar mb-3'>
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

      <div className='sidebar_channels shadow'>
        <div className='sidebar_channelsHeader shadow'>
          <div className='sidebar_header shadow'></div>
          <ExpandMoreIcon />
          <h4>{chatHeader}</h4>
          <AddIcon type="button" onClick={handelAddIcon} className='sidebar_addchannels' />

          {showAddChannel && <div className='addChannel_form'>

            <div className='addChannel_formContent'>
              <div className='addChannel_headText'>Lägg till kanal</div>

              <form className='form' onSubmit={addChannel} >
                <input value={input} onChange={e => setInput(e.target.value)} className='addChannel_formInput' placeholder='ange kanalnamn ...' />
                <button type='submit' className='addChannel_formContent_btn'>submit</button>
              </form>


              <div className='option'>


                <label>

                  <input
                    type="radio"
                    name="option"
                    value="vän"
                    checked={selectedOption === 'vän'}
                    onChange={handleOptionChange}
                  />
                  {renderTooltip('Vän kanal är till för att skapa en chat med vänner där alla kan lägga till nya chat medlemar', "Vän")}
                </label>

                <label>

                  <input
                    type="radio"
                    name="option"
                    value="Class"
                    checked={selectedOption === 'Class'}
                    onChange={handleOptionChange}
                  />
                  {renderTooltip('klass kanal är till för Admins och lärare för att skapa en chat där bara Admins och lärare kan lägga till nya chat medlemar', "Klass")}
                </label>

                <button type='button' className='btn btn-danger m-3' onClick={handelAddChannel}>Avbryt</button>



              </div>
            </div>

          </div>}


        </div>
      </div>

      <div className='sidebar_channelList shadow'><>

        {friends.map((friends) => {
          if (chatHeader === "Vänner") {
            return (
              <div className='user' key={friends.id} onClick={() => handleUserInfo(friends)} onContextMenu={(e) => handleUserContextMenu(e, friends)}>
                <Avatar src={friends.photo} />
                <div className='user_name'>{friends.firstName} {friends.lastName}  </div>
              </div>
            )
          }
        })}

        {channel.map((channel, index) => {
          if (chatHeader === "Chat Rum") {
            return (
              <div key={index} className='sidebarChannel' onClick={() => dispatch(setChannelInfo({
                key: index,
                channelId: channel.channelId,
                channelName: channel.channelName,
                channelType: channel.channelType,
                channelUsers: channel.channelUsers,
                channelMessages: channel.channelMessages,
              }))}>
                <h5><span className='sidebarChannel_hash'></span>{channel.channelName}</h5>
              </div>
            );
          } else return null;

        })}


      </>
      </div>
      {userPhoto && <div className='sidebar_profile shadow'>
        <Avatar sx={{ bgcolor: user.photo }}>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName + " " + user.lastName}</h6>
          <p>{user.id}</p>
        </div>
      </div>}
      {!userPhoto && <div className='sidebar_profile'>
        <Avatar src={user.photo} />

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName + " " + user.lastName}</h6>
          <p>{user.id}</p>
        </div>
      </div>}


      {showUsers && <div className='friend_box'>
        <div className='friend_content'>

          <div className='friend_headText border-bottom'>Medlemar</div>
          <div className='friend_List'>
            {users.sort((a, b) => a.user.firstName.localeCompare(b.user.firstName)).map((user) => {
              const isFriend = friends.some((friend) => friend.id === user.id);

              return (
                <div className="user" key={user.id} onClick={() => handleSelectedMember(user)}>
                  <Avatar src={user.photo} />
                  <div className="user_name">
                    {user.firstName} {user.lastName}
                  </div>
                  {isFriend && <div className="friend_status">Already friends</div>}
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