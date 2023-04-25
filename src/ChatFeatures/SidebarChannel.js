import React from 'react'
import "./sidebarChannel.css"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../Store/AppSlice';




const SidebarChannel = (props) => {
  // when DB is in place We could get the created Channel and put its name here to render the right one.
  const dispatch = useDispatch();


  return (
    <div className='sidebarChannel' onClick={() => dispatch(setChannelInfo({
      id: props.id,
      channelName: props.channelName,
    }))}>
      <h5><span className='sidebarChannel_hash'><ChatBubbleOutlineIcon /></span>{props.channelName}</h5>
    </div>
  )
}

export default SidebarChannel