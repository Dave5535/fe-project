import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./chatHeader.css"
const ChatHeader = () => {
    return (
        <div className='chatHeader'>

            <div className='chatHeader_left'>
                <h4>
                    <span className='chatHeader_hash'>#</span>
                    Test channel Name
                </h4>
            </div>
            <div className='chatHeader_right'>
                <div className='chatHeader_search'>
                    <input placeholder='Search' /> 
                    <SearchIcon className='search_icon' />
                </div>
            </div>


        </div>
    )
}

export default ChatHeader