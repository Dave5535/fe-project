import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const Form = () => {
        return (
            <>
                <br />
                <form className='rounded-4 p-3 m-2' onSubmit={handleSubmit(saveData)}>
                   
                    
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


    const saveData = async (data) => {
        const firstName = data.firstName;
        const lastName = data.lastName;
        const email = data.email;
        const title = data.title;

        const newPerson = { firstName, lastName, email, title }
        console.log("SAVED_PERSON", newPerson);

        reset();

        window.location.href ="http://localhost:3000/";  // link change when it is running on server
    }


    return (
        <div className="container">
            <h4 className='text-center'>Login!</h4>
            <Form />
        </div>
    );
}



export default Login;