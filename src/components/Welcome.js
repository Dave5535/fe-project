import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

const Welcome = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    if (user !== null)
        return (

            <div className='container'>
                <h4 className='text-center'>Välkommen!</h4>
                <div className='text-center'>Hit kommer nyanläda personer så ett Välkommande och den senaste nyheterna kan vara här.</div>
            </div>
        );

}

export default Welcome;