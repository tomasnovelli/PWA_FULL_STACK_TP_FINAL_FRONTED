import React from 'react'
import './header.css'
import { Link, useParams } from 'react-router-dom'
import { MdOutlinePhone } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import ChatDropdownMenu from '../ChatDropdownMenu/ChatDropdownMenu';
import { useGlobalContext } from '../GlobalContext/GlobalContext';
import ContactsDropdownMenu from '../ContactsDropdownMenu/ContactsDropdownMenu';


const User = ({ profilePicture, contactId, nickName, contactLoading }) => {

    const {
        handleCloseDropdown
    } = useGlobalContext()
    const { contact_id } = useParams()
    const { user_id } = useParams()

    return (
        <header>
            {
                !contact_id
                    ?
                    <div className='userInfoChat'>
                        <div className='interactiveButtons'>
                            <img className='whatsappIcon' src="/images/whatsApp.png" alt="whatsApp" width='100px' />
                        </div>
                        <ContactsDropdownMenu user_id={user_id} />
                    </div>

                    :
                    <div className='userInfoChat'>
                        {
                            contactLoading
                                ?
                                <span className='userName'>Loading...</span>
                                :
                                <div className='userData'>
                                    <Link to={`/contacts/${user_id}`} onClick={handleCloseDropdown}><i className="backArrow bi bi-arrow-left-short"></i></Link>
                                    <div className='imgContainer'>
                                        <img className='userImg' src={profilePicture} alt={nickName + 'Img'} />
                                    </div>
                                    <span className='userName'>{nickName}</span>
                                </div>
                        }
                        <div className='interactiveButtons'>
                            <HiOutlineVideoCamera className='camera' />
                            <MdOutlinePhone className='telephone' />
                            <ChatDropdownMenu contactId={contactId} />
                        </div>
                    </div>
            }
        </header>
    )
}

export default User
