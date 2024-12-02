import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthContext'
import './contactsDropdownMenuStyles.css'
import { DELETE, getAuthenticatedHeaders } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'
const ContactsDropdownMenu = ({ user_id }) => {
    const navigate = useNavigate()
    
    const {
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown,
        setErrors
    } = useGlobalContext()
    const { logOut } = useAuthContext()
    const [deleteAccountState, setDeleteAccountState] = useState(false)
    const handleDeleteYourAccount = async () => {
        try{
            
            const response = await DELETE(`${ENVIROMENT.URL_BACKEND}/api/user/delete-user-account/${user_id}`, {
                headers: getAuthenticatedHeaders()
            })
            if(!response){
                logOut()
            }
            
        }
        catch(error){
            console.error(error.message)
        }
    }

    return (
        <div>
            {
                dropdown &&
                <div>
                    <div className='chatDropdownMenu'>
                        <Link onClick={handleCloseDropdown} className='btn-cleanChat' to={`/update-profile/${user_id}`}>
                            <span>Update Your Profile</span>
                        </Link>
                        <Link className='btn-cleanChat' onClick={logOut}>
                            <span>Log Out</span>
                        </Link>
                        <Link  className='btn-cleanChat btn-deleteAccount' onClick={() => setDeleteAccountState(!deleteAccountState)}>
                            <span>Delete Account</span>
                        </Link>
                    </div>
                    {
                        deleteAccountState &&
                        <div className='chatDropdownMenu'>
                            <span>Are you sure you want to delete your account?</span>
                            <div className='btnsDeleteAccount'>
                                <button className='btn-selectOptions' onClick={() => setDeleteAccountState(!deleteAccountState)}>Cancel</button>
                                <button className='btn-selectOptions' onClick={handleDeleteYourAccount}>Confirm</button>
                            </div>
                        </div>
                    }
                </div>

            }
            <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                <i className="bi bi-three-dots-vertical"></i>
            </button>
        </div>
    )
}


export default ContactsDropdownMenu
