import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';

const Documents = () => {

   const user = useSelector(selectUser);

   if (user === null) window.location.href = "http://localhost:3000/login";
   if (user !== null)
      return (
         <div className='container'>
            <h3 className='text-center'>Dokument</h3><br />

            {/* Card */}
            <div className="card bg-dark shadow text-center me-3" style={{ width: "15rem", display: "inline-block" }}>
               <div className="card-body">
                  <a href="#">    {/* Remember to change the "#" */}
                     <h5 className="card-title text-info"> Öppna PDF </h5>
                  </a>
                  <a href="/File/Test.pdf" download>Ladda ner</a>     {/* Remember to change the "#" How to make it custom? */}
               </div>

            </div>             {/* Add */}
            <div className="card bg-dark shadow text-center me-3" style={{ width: "15rem", display: "none" }}>
               <div className="card-body">
                  <input type="file" className="fas fa-plus-circle text-info" style={{ fontSize: "2rem" }} />
               </div>
            </div>
         </div>
      );

};

export default Documents;