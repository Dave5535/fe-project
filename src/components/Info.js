import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { selectUser } from "../Store/userSlice";
import { addPlays, setPlayinfo, setPlaysInfo } from "../Store/playSlice";
import InfoList from "./InfoList";
import { useState } from "react";
import "./infolist.css"
import { useForm } from "react-hook-form";

const Info = () => {


    const [showForm, setShowForm] = useState(false);
    const [showPage, setShowPage] = useState(true);
    const dispatch = useDispatch();

    const handelSetPlay = () => { // maybe good for kalender

        const play = {
            play: {
                playId: "3",
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
                playId: "2",
                playName: "Möte eller en pjäs ",
                description: "Här går det att beskriva lite kort vad det är för något event ",
                time: "t,ex 20 / 05 / 2023 ",
                script: "Hello Everyone and wellcome",
            }],
        }
        dispatch(setPlaysInfo(play));
    }
    const handelswitch = () => {
        setShowForm(!showForm);
        setShowPage(!showPage);
    }
    const savePlay = async (data) => {

        const playName = data.playName;
        const description = data.description;
        const time = data.time;
        const script = data.script;


        const newPlay = { playName, description, time, script }

        // Save Play to BE 

    }

    const user = useSelector(selectUser);
    const [userRole, setUserRole] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const errors = formState?.errors || {};


    useEffect(() => {
        handelAddPlay();
        if (user !== null && user.role === "admin") {
            setUserRole(true);
        }
        if (user !== null && user.role === "teacher") {
            setUserRole(true);
        }

    }, []);


    if (user === null) window.location.href = "http://localhost:3000/login";


    if (user !== null)
        return (<>
            {showPage && <div className='container'>
                <h4 className='text-center'>Info!</h4>
                <div className='text-center'> här kan Möten och Event läggas up för att alla ska se. även script till de som ska vara med i pjäser</div>
                {userRole && <button className="btn btn-success mb-1" onClick={handelswitch}>Lägg till event</button>}
                <div className="mb-3">  <button className="btn btn-primary" onClick={handelAddPlay}>Set Plays (array of items) </button> {"<- is going to be replaced with array from BE "}</div>
                <div className="info_event_list"> <InfoList /> </div>
            </div>}
            {showForm && <div className="form_container">
                <form onSubmit={handleSubmit(savePlay)}> <h4>Lägg till ett event</h4>
                    Eventets Namn
                    <div className='col'>   <input
                        type="text"
                        className="info_input"
                        placeholder="Ange event/pjäsnamn..."
                        id="playName"
                        {...register('playName', { required: true })} />
                        {errors.playName && errors.playName.type === 'required' && (
                            <span className='text-danger'>Namn på pjäsen/mötet krävs!</span>
                        )}
                    </div>
                    tid på event

                    <div className='col'>   <input
                        type="text"
                        className="info_input"
                        placeholder="yyyy-mm-dd"
                        id="time"
                        {...register('time', { required: true })} />
                        {errors.time && errors.time.type === 'required' && (
                            <span className='text-danger'>Tid då pjäsen/mötet börjar krävs!</span>
                        )}
                    </div>

                    Beskrivning
                    <div className='col'>  <input
                        type="text"
                        className="info_input"
                        placeholder="Beskrivning.."
                        id="description"
                        {...register('description', { required: false })} />
                        {errors.description && errors.description.type !== 'required' && (
                            <span className='text-danger'>Beskrivning krävs!</span>
                        )}
                    </div>
                    Manus
                    <div className='col'>   <input
                        type="text"
                        className="info_input"
                        placeholder="Manus ( dok? ).."
                        id="script"
                        {...register('script', { required: false })} />
                        {errors.firstName && errors.firstName.type !== 'required' && (
                            <span className='text-danger'>Manus krävs!</span>
                        )}
                    </div>
                    <div className='col'>
                        <button className="btn btn-danger" onClick={handelswitch}>Avbryt</button>
                        <button type="submit" className="btn btn-success m-2" >Verkställ</button>
                        <button
                            type='button'
                            className='btn btn-danger m-2'
                            onClick={() => {

                                document.getElementById('playName').value = '';
                                document.getElementById('time').value = '';
                                document.getElementById('description').value = '';
                                document.getElementById('script').value = '';
                            }}
                        >
                            Återställ
                        </button>
                    </div>
                </form>

            </div>
            }

        </>
        );
}

export default Info;
