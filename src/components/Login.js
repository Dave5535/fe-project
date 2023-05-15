import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, selectUser, updatePhoto } from '../Store/userSlice';
import "./infolist.css";


const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
   // user info 
    const user = useSelector(selectUser);
    // redux
    const dispatch = useDispatch();
    // calling Api
    const API_URL = "http://localhost:8080/api/v1/person";
    const [alert, setAlert] = useState({ type: '', message: '' });

    // needed if user need a update
    useEffect(() => {
        if (user && user.photo === null) {
          giveDefaultProfilePic();
        }
      }, [user]);
      



    // pushing to main page 
    const history = useHistory();

    const Form = () => {
        return (
            <>
                <br />
                <div className='login'>
                    <form className='rounded-4 p-3 m-2' style={{ maxWidth: "500px" }} onSubmit={handleSubmit(checkData)}>

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
                </div>

            </>
        )
    };
    // giva a profile pic if you new 
    const giveDefaultProfilePic = () =>  {
const color = getRandomColor();
        dispatch(updatePhoto(color));

        

    };

    const getRandomColor = () => {
        const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };

    const checkData = async (data) => {

        const testLoginPerson = {
            id: "12345",
            firstName: "David",
            lastName: "Svantesson",
            email: "easy",
            role: "admin",
            userName: "Dave 5535",
            password: "pass",
            photo: null, //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGXkn6Eo8eeiFv7O-1QEaenXwr_EcqmxtnQ&usqp=CAU" 
            conversations: [],

            events: [],
        }
        const testLoginPerson2 = {
            id: "43573",
            firstName: "Mikael",
            lastName: "Svennson",
            email: "email",
            role: "teacher",
            userName: "M,S",
            password: "login",
            photo: "https://avatars.githubusercontent.com/u/113359307?s=120&v=4",
            conversations: [],
            events: [],
        }

        const email = data.email;
        const password = data.password;

        const loginPerson = { email, password }

        // send a login request for BE to check if Email and Password is simular ( AND SEND BACK USER DATA )
        if (loginPerson.email === testLoginPerson.email) {
            if (loginPerson.password === testLoginPerson.password) {
                dispatch(login(testLoginPerson))

            };

        } else return console.log("Wrong password or email ");
        setTimeout(() => {
            history.push('/');
          }, 10);
    }

    
    if (user !== null)
        return (
            <div className="text-success">Du har loggat in</div>

        );

    return (
        <div className="container">

            <h4 className='text-center pb-1 mb-5 bg-dark login-title'>Login</h4>
            <Form className="form_box" />

        </div>
    );
}



export default Login;