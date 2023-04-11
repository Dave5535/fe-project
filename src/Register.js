import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';

const Singin = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const Form = () => {
        return (
            <>
                <br />
                <form className='rounded-4 p-3 m-2' onSubmit={handleSubmit(saveData)}>
                    <div className='row'>
                        <div className='col'>First Name
                            <input type='text' className='form-control' id='firstName' {...register("firstName", { required: true })} placeholder='Enter first name...' />
                            {errors.firstName && errors.firstName.type === "required" && (<span className='text-danger'>firstName is Required!</span>)}
                        </div>
                        <div className='col'>Last Name
                            <input type='text' className='form-control' id='lastName' {...register("lastName", { required: true })} placeholder='Enter last name...' />
                            {errors.lastName && errors.lastName.type === "required" && (<span className='text-danger'>lastName is Required!</span>)}
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col'>Email
                            <input type='text' className='form-control' id='email' {...register("email", { required: true })} placeholder='Enter email...' />
                            {errors.email && errors.email.type === "required" && (<span className='text-danger'>email is Required!</span>)}
                            <br />
                            Password
                            <input type='text' className='form-control ' id='password' {...register("password", { required: true })} placeholder='Enter password...' />
                            {errors.password && errors.password.type === "required" && (<span className='text-danger'>password is Required!</span>)}
                        </div>
                    </div>
                    <br />
                    <div className='col'>
                        <button type='submit' className='btn btn-success m-2' >Register</button>
                        <button type='button' className='btn btn-danger m-2' onClick={() => {
                            console.log('RESET:');
                            document.getElementById('firstName').value = '';
                            document.getElementById('lastName').value = '';
                            document.getElementById('email').value = '';
                            document.getElementById('password').value = '';
                        }} >Reset</button>
                        
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
    }


    return (
        <div className="container">
            <h4 className='text-center'>Register (ONLY FOR ADMINS AND TEACHERS!)</h4>
            <Form />
        </div>
    );
}



export default Singin;