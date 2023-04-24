import React from "react";
import { logout, selectUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";


    const dispatch = useDispatch();
    const handellogout = () => {
        dispatch(logout());
    }
    if (user !== null)
        return (

            <div className='container'>

                <h4 className='text-center'>Inställningar!</h4>
                <div className='text-center'>make changes to account ,etc.</div>
                <br />
                <h1>{user.firstName} {user.lastName}</h1>
                <h6># {user.id} { }</h6>

                <div>change password ? // change email ?</div>


                <button type="button" className="btn btn-danger" onClick={handellogout} >logout</button>


            </div>


        );

}

export default Settings;