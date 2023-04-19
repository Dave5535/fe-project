import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

import "./sidebar.css"
import SidebarChannel from './SidebarChannel';






const Sidebar = () => {
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
          <AddIcon className='sidebar_addchannels' />
        </div>
      </div>
<div className='sidebar_channelList'>
<SidebarChannel/>
<SidebarChannel/>
<SidebarChannel/>
<SidebarChannel/>
</div>

<div className='sidebar_profile'>
  <Avatar src='add an image' />

  <div className='sidebar_profileInfo'>
    <h6>UserName</h6>
    <p>Id</p>
  </div>
</div>
</div>
  )
}

export default Sidebar