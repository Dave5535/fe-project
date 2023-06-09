import React, { useState } from "react";
import { logout, selectUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "./settings.css";
import { green } from "@mui/material/colors";

const Settings = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";
    console.log(user);
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);

    const handellogout = () => {
        window.location.href = "http://localhost:3000/login"
        setTimeout(() => {
            dispatch(logout());
        }, 2000);
    }

    const handeleditbtn = () => {
        setShowEdit(!showEdit);
    }
    const editSubmit = () => {
        // send request about to change the profile pic 
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
                <div className="mb-3">change password (send a request, user get an email and then change the password) ? <br /> change email (only admin can do if user needs to) ?</div>
                <button type="button" className="btn btn-danger" onClick={handellogout} >logout</button>
            </div>
        </div>

    );


}

export default Settings;