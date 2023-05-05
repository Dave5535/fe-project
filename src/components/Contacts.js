import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

const Contacts = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    if (user !== null)
        return (
            <div className='container'>
                <h4 className='text-center'>Kontakter saknas!</h4>
            </div>
        );

}

export default Contacts;