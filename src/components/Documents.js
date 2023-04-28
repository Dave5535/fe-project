import React from 'react';

const Documents = () => {
   return (
      <div className='container'>
         <h3 className='text-center'>Dokument</h3><br />

         <div className="card bg-dark shadow text-center" style={{ width: "15rem" }}>

            <div className="card-header">
               <h3 className="card-title">Titel</h3>
            </div>

            <div className="card-body">
               <a href="./Image/Big-Sur-Shore-Rocks.png"><img src="./Image/Big-Sur-Shore-Rocks.png" target="_blank" alt="document_img" className='rounded shadow' style={{ width: "12rem" }} /></a>
            </div>

            <div className="card-footer"><a href="#" download>Ladda ner</a></div>
         </div>
      </div>
   );
};

export default Documents;