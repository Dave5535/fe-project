import React from 'react';

const Documents = () => {
   return (
      <div className='container'>
         <h3 className='text-center'>Dokument</h3><br />

         {/* Card */}
         <div className="card bg-dark shadow text-center" style={{ width: "15rem" }}>

            <div className="card-body">
               <a href="#">                           {/* Remember to change the "#" */}
                  <h5 className="card-title text-info">Öppna PDF</h5>
               </a>
               <a href="#" download>Ladda ner</a>     {/* Remember to change the "#" */}
            </div>
         </div>
      </div>
   );
};

export default Documents;