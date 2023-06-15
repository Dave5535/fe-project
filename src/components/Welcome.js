import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

const Welcome = () => {
  const user = useSelector(selectUser); if (user === null) window.location.href = "http://localhost:3000/login";
  
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
            Vill du veta <b><a href="https://www.teaterstickorna.se/om-oss-41141837" target='_blank'>mer om oss</a></b> och vad vi gör?</div>
        </div>

        <div className="home-Social mb-5">
          <h4>Socialmedia</h4>
          <div className="m-3"><a href="https://www.facebook.com/teaterstickorna/" target='_blank'>facebook</a></div>
          <div className="m-3"><a href="https://www.instagram.com/teaterstickorna/" target='_blank'>Instagram</a></div>
          <div className="m-3"><a href="https://www.youtube.com/channel/UCXcx6Sxs50K0_6Jz6hE26KQ" target='_blank'>Youtube</a></div>
        </div>

        <div className="home-Contacts">
          <h4>Kontaktuppgifter</h4>
          <div className="m-3"><b>Besöksadress</b><br />
            Myntgatan 7 <br />
            553 32 Jonköping
          </div>
        </div>
      </div>
    );


}

export default Welcome;