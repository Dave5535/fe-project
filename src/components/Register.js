import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';

const Register = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const Form = () => {
        return (
            <>
                <br />
                <form className='rounded-4 p-3 m-2' onSubmit={handleSubmit(saveData)}>
                    <div className='row'>
                        <div className='col'>Förnamn
                            <input type='text' className='form-control' id='firstName' {...register("firstName", { required: true })} placeholder='Ange förnamn...' />
                            {errors.firstName && errors.firstName.type === "required" && (<span className='text-danger'>Förnamn är ett krav!</span>)}
                        </div>
                        <div className='col'>Efternamn
                            <input type='text' className='form-control' id='lastName' {...register("lastName", { required: true })} placeholder='Ange efternamn...' />
                            {errors.lastName && errors.lastName.type === "required" && (<span className='text-danger'>Efternamn är ett krav!</span>)}
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col'>Email
                            <input type='text' className='form-control' id='email' {...register("email", { required: true })} placeholder='Ange email...' />
                            {errors.email && errors.email.type === "required" && (<span className='text-danger'>Email är ett krav!</span>)}
                            <br />
                            Lösenord
                            <input type='text' className='form-control ' id='password' {...register("password", { required: true })} placeholder='Ange lösenord...' />
                            {errors.password && errors.password.type === "required" && (<span className='text-danger'>Lösenord är ett krav!</span>)}
                        </div>
                    </div>
                    <br />
                    <div className='col'>
                        <button type='submit' className='btn btn-success m-2' >Registrera</button>
                        <button type='button' className='btn btn-danger m-2' onClick={() => {
                            console.log('RESET:');
                            document.getElementById('firstName').value = '';
                            document.getElementById('lastName').value = '';
                            document.getElementById('email').value = '';
                            document.getElementById('password').value = '';
                        }} >Återställ</button>
                        
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
            <h4 className='text-center'>Registrera (ONLY FOR ADMINS AND TEACHERS!)</h4>
            <Form />
        </div>
    );
}



export default Register;
