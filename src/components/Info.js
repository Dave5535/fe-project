import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

const Info = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    if (user !== null)
        return (
            <div className='container'>
                <h4 className='text-center'>Info!</h4>
                <div className='text-center'> här kan Möten och Event läggas up för att alla ska se. även script till de som ska vara med i pjäser</div>
            </div>
        );
}

export default Info;