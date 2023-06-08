import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, selectUser, updatePhoto } from '../Store/userSlice';
import "./infolist.css";


const Login = () => {
    // list of all users 
    const [userList, setUserList] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // user info 
    const user = useSelector(selectUser);
    // redux
    const dispatch = useDispatch();
    // calling Api
    const API_URL = "http://localhost:8080/api/v1/user/";
    const [alert, setAlert] = useState({ type: '', message: '' });

    // give a random color to  a user 
    useEffect(() => {
        if (user && user.photo === null) {
            giveDefaultProfilePic();
        }
    }, [user]);
    // get ListOfUsers
    useEffect(() => {
        GetData();
    }, []);

    // pushing to main page 
    const history = useHistory();


    // giva a profile pic if you new 
    const giveDefaultProfilePic = () => {
        const color = getRandomColor();
        dispatch(updatePhoto(color));
    };
    const getRandomColor = () => {
        const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    // before login
    const GetData = async () => {
        await axios.get(API_URL).then(response => {
            if (response.status === 200) {
                setUserList(response.data);
                setAlert({ type: 'success', message: 'Objekt hittad!' })
            } else {
                setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
            }
        }).catch(error => {
            console.log("ERROR: ", error);
            setAlert({ type: 'danger', message: error.message })
        });

    }
    // while login
    const checkData = async (data) => {
        // davidsvantesson@mail.com
        //  password2

        // data from loginform
        const email = data.email;
        const password = data.password;

        const loginPerson = { email, password }

        // if loginperson matches a person from userList then that user will be loged in
        const matchedUser = userList.find(user => user.email === loginPerson.email && user.password === loginPerson.password);

        if (matchedUser) {
            dispatch(login(matchedUser));
        } else return console.log("Wrong password or email ");
        setTimeout(() => {
            history.push('/');
        }, 10);
    }

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

    if (user !== null)
        return (
            <div className="text-success">Du har loggat in</div>

        );

    return (
        <div className="container">

            <h4 className='text-center pb-1 mb-5 bg-light login-title'>Login</h4>
            <Form className="form_box" />

        </div>
    );
}



export default Login;