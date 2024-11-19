import React, { useState } from 'react'
import { IoHeartDislikeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import './favoriteButtonStyles.css'

const FavoriteButton = () => {
    const [favoriteState, setFavortieState] = useState(true)
    const handleChangeFavoriteState = (e) => {
        setFavortieState(!favoriteState)
    }

    return (
        <>
            {
                favoriteState
                    ?
                    <div className='addToFavorite'>
                        <button className='btn-addToFavorite' onClick={handleChangeFavoriteState}>
                            <IoMdHeartEmpty />
                            <span className='addToFavoriteText'>Add to favorite</span>
                        </button>
                    </div>
                    :
                    <div className='addToFavorite'>
                        <button className='btn-addToFavorite' onClick={handleChangeFavoriteState}>
                            <IoHeartDislikeOutline />
                            <span className='addToFavoriteText'>Remove from favorites</span>
                        </button>
                    </div>
            }
        </>
    )
}

export default FavoriteButton
