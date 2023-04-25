import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

import "./sidebar.css"
import SidebarChannel from './SidebarChannel';
import { selectUser } from '../Store/userSlice';
import { useSelector } from 'react-redux';




const Sidebar = () => {

  // popup for adding a channel
  const user = useSelector(selectUser);
  const [showAddChannel, setShowAddChannel] = useState(false);

  // input for AddChannel
  const [input, setInput] = useState("");

  const [channel, setChannel] = useState([]);


  // adding Channel
  const addChannel = (e) => {
    e.preventDefault();

    const c1 = { id: "1", channelName: "testName" }
    const c2 = { id: "2", channelName: "new project" }


    const c3 = { id: "3", channelName: input } // want to try to add this "got this from BE"

    const newChannel = {
      id: c3.id,
      channelName: c3.channelName,
    };

    const createdChannel =
      setChannel(prevchannel => [...prevchannel, newChannel]);
    setInput("");
    handelAddChannel();
  }


  useEffect(() => {
    // update Users Channels when a new one is added

  }, []);


  const handelAddChannel = () => {
    setShowAddChannel(!showAddChannel);
    setInput("");
  }

  // Hardcodet Test Channels


  return (
    <div className='sidebar mb-3'>
      <div className='sidebar_top'>
        <h3>Chat Room</h3>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar_channels'>
        <div className='sidebar_channelsHeader'>
          <div className='sidebar_header'></div>
          <ExpandMoreIcon />
          <h4>Text channels</h4>
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

        {channel.map((channel, index) => (
          <SidebarChannel key={index} id={channel.id} channelName={channel.channelName} />
        ))}

      </div>

      <div className='sidebar_profile'>
        <Avatar src='add an image' />

        <div className='sidebar_profileInfo'>
          <h6>{user.firstName}</h6>
          <p>{user.id}</p>
        </div>
      </div>
    </div>
  )
}






export default Sidebar