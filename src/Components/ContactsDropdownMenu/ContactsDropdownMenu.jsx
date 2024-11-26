import React from 'react'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { Link } from 'react-router-dom'

const ContactsDropdownMenu = ({user_id}) => {
    const {
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown
    } = useGlobalContext()


    return (
        <div>
            {
                dropdown &&
                <div className='chatDropdownMenu'>
                    <Link to={`/update-profile/${user_id}`}>
                        Update Your Profile
                    </Link>
                </div>
            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}


export default ContactsDropdownMenu
