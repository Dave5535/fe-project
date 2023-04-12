import React, { useEffect, useState } from 'react'

const Group = ()=> {


    const [showlist, setShowlist] = useState(false);

    const update = () => {
        setShowlist(!showlist);
    }
    const chatlist = () => {


}

    return (
        <div className='container'>
            <h4 className='text-center'>Klasser!</h4>
            <div className='text-center'>Klasser/grupper skapade av lärare!</div>



            <div className="row">
        <div className="col-1 "><button type="button" className="icon rounded far fa-comment-dots " onClick={update}> chat</button></div>
       <div className="col-11 border border-dark rounded text-center">messages</div>
       
       
       </div>
       {showlist && <div className='bg-black col-3 border border-dark rounded'> here list will be</div>}
        </div>
    );
    
}

export default Group;