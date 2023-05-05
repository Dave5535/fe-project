import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setChannelInfo } from '../Store/AppSlice';
import "./sidebarChannel.css"
import { selectUser } from '../Store/userSlice';


const SidebarChannel = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [AllChannels, setAllChannels] = useState([]);
  const { channelHeader } = props;
  // premade channels 
  const premadeChannels = [
    {
      channel: {
        key: "4",
        channelId: '4',
        channelName: 'Klass Channel',
        channelType: 'Klass',
        channelUsers: [
          {
            user: {
              id: "12345",
              firstName: "David",
              lastName: "Svantesson",
              email: "easy",
              title: "FOR TESTING", // role in
              userName: "Dave 5535",
              password: "pass",
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGXkn6Eo8eeiFv7O-1QEaenXwr_EcqmxtnQ&usqp=CAU",
              conversations: [],
              events: [],
            }
          }
        ],
        channelMessages: [
          {
            user: {
              firstName: 'System',
              photo: 'https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            },
            id: 'System_id',
            timestamp: 'date from Api',
            message: 'Start your conversation today',
          }
        ]
      }
    },

    {
      channel: {
        key: "5",
        channelId: '5',
        channelName: 'Friends channel',
        channelType: 'Friends',
        channelUsers: [{
          user: {
            id: "12345",
              firstName: "David",
              lastName: "Svantesson",
              email: "easy",
              title: "FOR TESTING", // role in
              userName: "Dave 5535",
              password: "pass",
              photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGXkn6Eo8eeiFv7O-1QEaenXwr_EcqmxtnQ&usqp=CAU",
              conversations: [],
              events: [],
          },
        }
        ],
        channelMessages: [
          {
            user: {
              firstName: 'System',
              photo: 'https://th.bing.com/th/id/OIP.6rBuDJx97j2yiZ8Bdi9tMwHaHa?w=164&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            },
            id: 'System_id',
            timestamp: 'date from Api',
            message: 'Start your conversation today',
          }
        ]
      }
    }
  ];

  useEffect(() => {
    setAllChannels(premadeChannels);
  }, []);

  const handleChannelClick = (channel) => {
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
      {AllChannels.map((channel) => {
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