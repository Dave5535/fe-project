import React, { useState } from "react";
import { logout, selectUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "./settings.css";

const Settings = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";

    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const handellogout = () => {
        dispatch(logout());
    }

    const handeleditbtn = () => {
        setShowEdit(!showEdit);
    }
    const editSubmit = () => {
        // send request about to change the profile pic 
    }



    if (user !== null)
        return (

            <div className='container'>

                <h4 className='text-center'>Inställningar</h4>


                <div className="profile_pic_container">
                    <Avatar src={user.photo} className="settings_profile_pic" />
                    <EditIcon className="edit_pic" onClick={handeleditbtn} />
                    {showEdit && <div>

                        <input className="edit_pic_input" placeholder="link till en bild" onSubmit={editSubmit} />
                        <br />
                        ex : https//www.någon.bild.du.valt
                    </div>}
                </div>

                <br />
                <h1>{user.firstName} {user.lastName}</h1>
                <h3>{user.role}</h3>
                <h6># {user.id} </h6>


                <div className="mb-3">change password (send a request, user get an email and then change the password) ? <br /> change email (only admin can do if user needs to) ?</div>

                <button type="button" className="btn btn-danger" onClick={handellogout} >logout</button>

            </div>


        );

}

export default Settings;