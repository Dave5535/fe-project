import React from 'react';

const Documents = () => {
   return (
      <div className='container'>
         <h3 className='text-center'>Dokument</h3><br />

         {/* Card */}
         <div className="card bg-dark shadow text-center" style={{ width: "15rem" }}>
            {/* Header */}
            <div className="card-header">
               <h5 className="card-title">Dokument 1</h5>
            </div>
            {/* Body */}
            <div className="card-body">
               <a href="./Image/Big-Sur-Shore-Rocks.png">
                  <img src="./Image/Big-Sur-Shore-Rocks.png" target="_blank" alt="document_img" className='rounded shadow' style={{ width: "12rem" }} />
               </a>
            </div>
            {/* Footer */}
            <div className="card-footer">
               <a href="#" download>Ladda ner</a>     {/* Remember to change the "#" */}
            </div>
         </div>
      </div>
   );
};

export default Documents;