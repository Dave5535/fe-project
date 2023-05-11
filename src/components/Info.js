import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";
import { addPlays, setPlayinfo, setPlaysInfo } from "../Store/playSlice";
import InfoList from "./InfoList";

const Info = () => {

    const dispatch = useDispatch();

    const handelSetPlay = () => { // maybe good for kalender

        const play = {
            play: {
                playName: "PlayName ",
                description: "This is the description! It sould have a max and a minimun number of characters",
                time: "time ",
                script: "Hello Everyone and wellcome",
                plays: [],
            },
        }
        dispatch(setPlayinfo(play));
    };

    const handelAddPlay = () => {
        const play = {
            plays: [{
                playName: "Möte eller en pjäs ",
                description: "Här går det att beskriva lite kort vad det är för något event ",
                time: "t,ex 20 / 05 / 2023 ",
                script: "Hello Everyone and welcome",

            }],
        }
        dispatch(setPlaysInfo(play));
    }


    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    if (user !== null)
        return (
            <div className='container'>
                <h4 className='text-center'>Info!</h4>
                <div className='text-center'> här kan Möten och Event läggas up för att alla ska se. även script till de som ska vara med i pjäser</div>

                <br />

                <div className="mb-3">  <button className="btn btn-primary" onClick={handelAddPlay}>Set Plays (array of items) </button> {"<- is going to be replaced with array from BE "}</div>


                <div className="info_event_list"> <InfoList /> </div>




            </div>
        );
}

export default Info;