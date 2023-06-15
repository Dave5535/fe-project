import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';

const locales = {
    "sv": require("date-fns/locale/sv")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Test",
        allday: true,
        start: new Date(2023, 5, 1),
        end: new Date(2023, 5, 1)
    },
    {
        title: "Test 2",
        start: new Date(2023, 5, 7),
        end: new Date(2023, 5, 10)
    }
]
const CalendarApp = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
    const [allEvents, setAllEvents] = useState(events)

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent])
    }
    if (user !== null)
        return (
            <div className='container'>
                <h4 className='text-center'>Kalender</h4><br />
                <h5 className='text-center'>Lägg Till Inlägg</h5>
                <div className='text-center'>
                    <input type="text" placeholder='Titel' className='calendarInput'
                        value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker placeholderText="Startdatum" className='calendarInput'
                        selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    <DatePicker placeholderText="Slutdatum"
                        selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} className='calendarInput' />
                    <button onClick={handleAddEvent} className='btn btn-primary mt-3'>Lägg Till</button>
                </div>
                <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500 }} className='bg-light text-dark mt-3 rounded' />
            </div>
        );
};

export default CalendarApp;