import React from 'react'
import './comunityStyles.css'
import { FetchingCommunity } from '../../Components/index.js'
const Community = () => {
    return (
        <>
            <div className='communityTitle'>
                <h1>Comunity Post</h1>
            </div>
            <div className='communityPost'>
                <FetchingCommunity />
            </div>
        </>
    )
}

export default Community