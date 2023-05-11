import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectPlays } from '../Store/playSlice';
import "./infolist.css";

const InfoList = () => {
    const [allplays, setAllPlays] = useState([]);
    const plays = useSelector(selectPlays); // empty from begining 

    useEffect(() => {
        setAllPlays(plays);
    }, [plays]);


    return (
        <div>
            {allplays.map((plays) => {
                return (
                    <div key={plays.playId} className='plays_list'>
                        <h4>
                            {plays.playName}
                            <span className='plays_time'>{plays.time}</span>
                            <br /><br />
                            <span className='plays_description'> {plays.description}</span>
                            <button className='btn btn-primary plays_btn '> till dukument  </button>
                        </h4>

                    </div>);

            })}
        </div>
    );

}


export default InfoList;