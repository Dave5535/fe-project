import React, { useState } from "react";
import { logout, selectUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import "./settings.css";
import { green } from "@mui/material/colors";

const Settings = () => {

    const user = useSelector(selectUser); if (user === null) window.location.href = "http://localhost:3000/login";
    const dispatch = useDispatch();

    const handellogout = () => {
        window.location.href = "http://localhost:3000/login"
        setTimeout(() => {
            dispatch(logout());
        }, 2000);
    }
    return (

        <div className='container'>
            <h4 className='text-center'>Inställningar</h4>
            <div className="profile_pic_container shadow">
                <Avatar sx={{ bgcolor: green }}>{user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}</Avatar>
            </div>
            <br />
            <div className="container card-body bg-light p-3 rounded shadow">
                <h1>{user.firstName} {user.lastName}</h1>
                <h3>{user.role.roleTitle}</h3>
                <h6>ID: {user.id} </h6>

                <button type="button" className="btn btn-danger" onClick={handellogout} >logout</button>
            </div>
        </div>

    );


}

export default Settings;