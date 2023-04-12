import React, { useEffect, useState } from 'react'

const Chat = ()=> {

    const [showlist, setShowlist] = useState(false);

    const update = () => {
        setShowlist(!showlist);
    }
    
    return (

        <div className='container'>

            <h4 className='text-center'>Chat!</h4>
            <div className='text-center'>Chater mellan en person eller grup av personer.</div>
            <br/>
       <div className="row">
       <div className="col-1 "><button type="button" className="icon rounded far fa-comment-dots " onClick={update}> chat</button></div>
       <di className="col-11 border border-dark rounded text-center">message</di>
       
       </div>
       
       {showlist && <div className='bg-black col-3 border border-dark rounded'> here list will be</div>}

        </div>
    );
    
}

export default Chat;