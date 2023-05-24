import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChannelInfo } from '../Store/AppSlice';
import "./sidebarChannel.css"
import { selectUser } from '../Store/userSlice';


const SidebarChannel = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [allChannels, setAllChannels] = useState([]);
  const { channelHeader } = props;
  // premade channels 


  const handleChannelClick = (channel) => {
  
    console.log(channel);
    
    dispatch(
      setChannelInfo({
        key: channel.key,
        channelId: channel.channelId,
        channelName: channel.channelName,
        channelType: channel.channelType,
        
        channelUsers : [{
          user: {
            user,
          },
        }
        ],
        channelMessages: channel.channelMessages,  // this is suposed to come from BE now It just take the creation value; 
      })
    );
  };


  return (
    <div>
      {allChannels.map((channel) => {
        if (channel.channel.channelType === channelHeader) {
          return (
            <div
              key={channel.channel.channelId}
              className='sidebarChannel'
              onClick={() => handleChannelClick(channel.channel)}
            >
              <h5>
                <span className='sidebarChannel_hash'></span>
                {channel.channel.channelName}
              </h5>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default SidebarChannel