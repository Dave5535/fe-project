import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectPlays } from '../Store/playSlice';
import "./infolist.css";

const InfoList = () => {
    const [allplays, setAllPlays] = useState([]);
    const plays = useSelector(selectPlays); // empty from begining 
    const history = useHistory();

    useEffect(() => {
        // need to get Api Here get all plays / events
        setAllPlays(plays);
    }, [plays]);

    const handelClickOnDocumentBtn = () => {
        history.push('/documents');
    }

    return (
        <div className='list'>
            {allplays.map((play) => (
                <div key={play.playId} className='plays_list'>
                    <h4>{play.playName} <span className='plays_time'>{play.time}</span> </h4>
                    
                    <span className='plays_description mb-3'>{play.description}</span>
                    <button className='btn btn-primary plays_btn' onClick={handelClickOnDocumentBtn}>
                        Till Dokument
                    </button>
                </div>
            ))}
        </div>
    );

}


export default InfoList;