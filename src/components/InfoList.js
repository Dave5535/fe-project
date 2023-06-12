import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectPlays } from '../Store/playSlice';
import "./infolist.css";

const InfoList = () => {
  const [allplays, setAllPlays] = useState([]);
  const plays = useSelector(selectPlays);
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState('');

  const searchQueries = searchQuery.trim().toLowerCase().split(/\s+/); // Split the search query into individual queries

  const filteredPlays = searchQueries.length
    ? plays.filter(play => searchQueries.every(query => play.playName.toLowerCase().includes(query)))
    : plays;

  useEffect(() => {
    setAllPlays(plays);
  }, [plays]);

  const handelClickOnDocumentBtn = () => {
    history.push('/documents');
  }

  return (
    
    <div className='play_info'>
    <input
    
        type="text"
        placeholder="Sök pjäs..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className='mb-1 rounded play_input'
      />
    <div className='list'>
      
      {filteredPlays.map((play) => (
        <div key={play.playId} className='p-3 plays_list shadow'>
          <h4>{play.playName} <span className='plays_time'>{play.time}</span> </h4>
          <span className='plays_description mb-3'>{play.description}</span><br />
          <button className='btn btn-primary plays_btn mt-3' onClick={handelClickOnDocumentBtn}>
            Dokument
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default InfoList;
