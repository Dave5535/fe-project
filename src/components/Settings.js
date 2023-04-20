import React from "react";
import { logout, selectUser } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {

    const user =  useSelector(selectUser);
    const dispatch = useDispatch();
const handellogout = () => {
   dispatch(logout());
}

    return (

        <div className='container'>

            <h4 className='text-center'>Inställningar!</h4>
            <div className='text-center'>make changes to account ,etc.</div>
            <br />
            <h1>{user}</h1>
<button type="button" className="btn btn-danger" onClick={handellogout} >logout</button>


        </div>


    );

}

export default Settings;