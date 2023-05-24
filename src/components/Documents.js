import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Store/userSlice';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const Documents = () => {

   const user = useSelector(selectUser);

   if (user === null) window.location.href = "http://localhost:3000/login";
   
   const fileInputRef = useRef(null);

   const handleFileSelect = (e) => {
     // Handle the selected file(s) here
     const selectedFile = e.target.files[0];
     console.log(selectedFile);
   };

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
            <div className="card bg-dark shadow text-center me-3" style={{ width: "15rem", display: "inline-block" }}>
               <div className="card-body">
               <input
  type="file"
  ref={fileInputRef}
  style={{ display: 'none' }}
  onChange={handleFileSelect}
  id="file-upload"
/>
<input type="file" className="fas fa-plus-circle text-info" style={{ display: 'none',fontSize: "2rem" }} />
<label htmlFor="file-upload">
  <ControlPointIcon style={{ fontSize: '2rem', cursor: 'pointer' }} />
</label>
               </div>
            </div>
         </div>
      );

};

export default Documents;