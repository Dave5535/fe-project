import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../Store/userSlice';

const Login = () => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // redux
    const dispatch = useDispatch();
    // calling Api
    const API_URL = "http://localhost:8080/api/v1/person";
    const [alert, setAlert] = useState({ type: '', message: '' });


    const Form = () => {
        return (
            <>
                <br />
                <form className='rounded-4 p-3 m-2' onSubmit={handleSubmit(checkData)}>


                    <div className='row'>
                        <div className='col'>Email
                            <input type='text' className='form-control' id='email' {...register("email", { required: true })} placeholder='Ange email...' />
                            {errors.email && errors.email.type === "required" && (<span className='text-danger'>Email är ett krav!</span>)}
                            <br />
                            Password
                            <input type='text' className='form-control' id='password' {...register("password", { required: true })} placeholder='Ange lösenord...' />
                            {errors.password && errors.password.type === "required" && (<span className='text-danger'>Lösenord är ett krav!</span>)}
                        </div>
                        <a href='/#'>Glömt lösenordet?</a>
                    </div>

                    <br />
                    <div className='col'>
                        <button type='submit' className='btn btn-success m-2' >Login</button>



                    </div>

                </form>
            </>
        )
    };


    const checkData = async (data) => {


        const email = data.email;
        const password = data.password;

        const loginPerson = { email, password }
        console.log("INLOGED PERSON", loginPerson);




        // send a login request for BE to check if Email and Password is simular ( AND SEND BACK USER DATA )
        
        dispatch(login("User"));

      //  window.location.href = "http://localhost:3000/";  // link change when it is running on server updating the page ( removing the user ? )

    }





    return (
        <div className="container">
            <h4 className='text-center'>Login!</h4>
            <Form />
        </div>
    );
}



export default Login;