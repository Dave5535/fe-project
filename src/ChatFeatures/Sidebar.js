import React, { useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

import "./sidebar.css"
import SidebarChannel from './SidebarChannel';
import { selectUser } from '../Store/userSlice';
import { useSelector } from 'react-redux';






const Sidebar = () => {

const user = useSelector(selectUser)

useEffect(() =>{ 
// update Users Channels when a new one is added

},[])
const handelAddChannel= ()=> {
console.log("handelAddChannel");

const c3 = {id: "3",channelName: "added room"} // want to try to add this "got this from BE"




// update with an useEffect 
}
const c1 = {id: "1",channelName: "testName"}
const c2 = {id: "2",channelName: "new project"}


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
          <AddIcon onClick={handelAddChannel} className='sidebar_addchannels' />
        </div>
      </div>
      <div className='sidebar_channelList'>
        
        
        <SidebarChannel key={c1.id} id={c1.id} channelName={c1.channelName}/>
        <SidebarChannel key={c2.id} id={c2.id} channelName={c2.channelName}/>
       
      </div>

      <div className='sidebar_profile'>
        <Avatar src='add an image' />

        <div className='sidebar_profileInfo'>
          <h6>{user}</h6>
          <p>Id</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar