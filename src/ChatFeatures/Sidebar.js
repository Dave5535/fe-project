import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

import "./sidebar.css"
import SidebarChannel from './SidebarChannel';
import { selectUser } from '../Store/userSlice';
import { addChannelMessage, setChannelInfo } from '../Store/AppSlice';

const Sidebar = () => {
  // used to store things
  const dispatch = useDispatch();

  // popup for adding a channel
  const user = useSelector(selectUser);
  const [showAddChannel, setShowAddChannel] = useState(false);

  // input for AddChannel
  const [input, setInput] = useState("");

  const [channel, setChannel] = useState([]);

  const [userPhoto, setUserPhoto] = useState(true);

  // settings if you want to see klass or Friends 
  const [chatHeaderbtn, setChatHeaderbtn] = useState("Friends");
  const [chatHeader, setChatHeader] = useState("Klass");

  useEffect(() => {
   if(user.photo.charAt(0) !== "#") {
      setUserPhoto(false)
    }
    if(user.photo.charAt(0) === "#") {
      setUserPhoto(true)
    }
  }, [user]);
//  

  // adding Channel
  let dateTime = new Date();
  let timeString = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let dateString = dateTime.toDateString().slice(4); // Remove the day of the week
  let formattedTimestamp = `${timeString} ${dateString}`;
  

  const addChannel = (e) => {
    e.preventDefault();


    const c3 = {
      channelId: "3",
      channelName: input,
      channelType: chatHeader,
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
      channelUsers : [{
        user: {
          user,
        },
      }
      ],
      channelMessages: [c3.channelMessages],
    };
    setChannel(prevchannel => [...prevchannel, newChannel]);
    // save to BE 
    setInput("");
    handelAddChannel();
  
  }

  const handelAddChannel = () => {
    console.log(chatHeader);
  if(chatHeader === "Friends"){
    setShowAddChannel(!showAddChannel);
    setInput("");
  }
  
 if(chatHeader === "Klass" ){
  if (user.role === "admin" || user.role === "teacher"){
    setShowAddChannel(!showAddChannel);
    setInput("");
  };
}
  
}


  const handleChatHeader = () => {
    if (chatHeader === "Friends") setChatHeader("Klass"); else setChatHeader("Friends");
    if (chatHeaderbtn === "Klass") setChatHeaderbtn("Friends"); else setChatHeaderbtn("Klass");


  }

  return (
    <div className='sidebar mb-3'>
      <div className='sidebar_top'>
        <h3>{chatHeader} </h3>
        <ExpandMoreIcon />

        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={handleChatHeader}>{chatHeaderbtn}</button>

        </div>

      </div>

      <div className='sidebar_channels'>
        <div className='sidebar_channelsHeader'>
          <div className='sidebar_header'></div>
          <ExpandMoreIcon />
          <h4>{chatHeader} channels</h4>
          <AddIcon type="button" onClick={handelAddChannel} className='sidebar_addchannels' />

          {showAddChannel && <div className='addChannel_form'>

            <div className='addChannel_formContent'>
              <div className='addChannel_headText'>Lägg till kanal</div>

              <form className='form' onSubmit={addChannel} >
                <input value={input} onChange={e => setInput(e.target.value)} className='addChannel_formInput' placeholder='ange kanalnamn ...' />
                <button type='submit' className='addChannel_formContent_btn'>submit</button>
              </form>

              <div>
                <button type='button' className='btn btn-danger m-3' onClick={handelAddChannel}>Avbryt</button></div>
            </div>
          </div>}
        </div>
      </div>

      <div className='sidebar_channelList'>
        {channel.map((channel, index) => {
          if (channel.channelType === chatHeader) {
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
          }
          
          
          return null;
        })}
        <SidebarChannel channelHeader={chatHeader} />
      </div>
      { userPhoto &&  <div className='sidebar_profile'>
      <Avatar sx={{ bgcolor: user.photo }}>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName +" "+ user.lastName}</h6>
          <p>{user.id}</p>
        </div>
      </div> }
      { !userPhoto &&  <div className='sidebar_profile'>
      <Avatar src={user.photo} />

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName +" "+ user.lastName}</h6>
          <p>{user.id}</p>
        </div>
      </div> }
      
    </div>
  );
}

export default Sidebar