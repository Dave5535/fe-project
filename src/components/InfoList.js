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
        setAllPlays(plays);
    }, [plays]);
    
    const handelClickOnDocumentBtn = () => {
    history.push('/documents');
    }

    return (
        <div>
            {allplays.map((plays) => {
                return (<div key={plays.playId}
                    className='plays_list'>

                    <h4>{plays.playName}
                        <span className='plays_time'>{plays.time}</span>
                        
                        <span className='plays_description mb-3'> {plays.description}</span>
                        <button className='btn btn-primary plays_btn ' onClick={handelClickOnDocumentBtn}> Till Dokument  </button>
                    </h4>

                </div>);
            })}
        </div>
    );

}


export default InfoList;