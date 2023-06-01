import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";
import axios from 'axios';
const Welcome = () => {

    const API_URL = 'http://localhost:8080/api/v1/user/';
    const [alert, setAlert] = useState({ type: '', message: '' });
    const persons = [];
    const [personList, setPersonList] = useState(persons);
    const [showDetails, setShowDetails] = useState(false);
    const [person, setPerson] = useState({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      title: "",
    });
    const user = useSelector(selectUser);
    if (user === null) window.location.href = "http://localhost:3000/login";


      
    const findAllusers = async () => {
        
            
            await axios.get(API_URL).then(response => {
                if (response.status === 200) {
                  setPersonList(response.data);
                  setAlert({ type: 'success', message: 'Objekt hittad!' })
                } else {
                  setAlert({ type: 'warning', message: 'Visa API Felmeddelande...' });
                }
              }).catch(error => {
                console.log("ERROR: ", error);
                setAlert({ type: 'danger', message: error.message })
              });
      

              setTimeout(() => {
                console.log(personList);
              }, 2000);
          }
    

    if (user !== null)
        return (

            <div className='container'>

<div className="home-Page" > 
<h4 className='text-center'>Välkommen!</h4>
                <div className='text-center m-3'>Hit kommer nyanläda personer så ett Välkommande och den senaste nyheterna kan vara här.</div>
                picture here maybe 
<br/>
 </div>

 <div className="home-About">
   <h4>About us</h4> 
    <div className="m-3">hello </div>
 </div>
<div className="home-Social">
   <h4>Social</h4> 
    <div className="m-3">hello</div>
</div>

<div className="home-Contacts">
   <h4>Constacts information</h4> 
    <div className="m-3">hello</div>
</div>
              <button className='btn btn-info' onClick={() => findAllusers()}>FindAll users</button>
            </div>
        );

}

export default Welcome;