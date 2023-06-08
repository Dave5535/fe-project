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

        <div className="home-Page mb-5" >
          <h4 className='text-center'>Välkommen!</h4>
          <div className='text-center m-3'>Ronja</div>
          <img src="https://h24-original.s3.amazonaws.com/266725/30438315-2YR3Z.png" alt="Ronja" />
          <br />
        </div>

        <div className="home-About mb-5">
          <h4>Om Oss</h4>
          <div className="m-3">Teaterstickorna är en amatörteaterförening i Jönköping. <br />
            Vill du veta <b><a href="https://www.teaterstickorna.se/om-oss-41141837">mer om oss</a></b> och vad vi gör?</div>
        </div>

        <div className="home-Social mb-5">
          <h4>Socialmedia</h4>
          <div className="m-3"><a href="https://www.facebook.com/teaterstickorna/">facebook</a></div>
          <div className="m-3"><a href="https://www.instagram.com/teaterstickorna/">Instagram</a></div>
          <div className="m-3"><a href="https://www.youtube.com/channel/UCXcx6Sxs50K0_6Jz6hE26KQ">Youtube</a></div>
        </div>

        <div className="home-Contacts">
          <h4>Kontaktuppgifter</h4>
          <div className="m-3"><b>Besöksadress</b><br />
            Myntgatan 7 <br />
            553 32 Jonköping
          </div>
        </div>
        <button className='btn btn-info' onClick={() => findAllusers()}>FindAll users</button>
      </div>
    );

}

export default Welcome;