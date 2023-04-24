import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

const Social = () => {

    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";



    if (user !== null)
        return (
            <div className='container'>
                <h4 className='text-center'>Sociala medier!</h4>
                <div className='text-center' >här kan man länka se alla relaterade länkar till andra medier teaterstickorna har</div>
            </div>
        );

}

export default Social;