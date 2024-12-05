import React from 'react'
import './header.css'
import { Link, useParams } from 'react-router-dom'
import { MdOutlinePhone } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import ChatDropdownMenu from '../ChatDropdownMenu/ChatDropdownMenu';
import { useGlobalContext } from '../GlobalContext/GlobalContext';
import ContactsDropdownMenu from '../ContactsDropdownMenu/ContactsDropdownMenu';


const User = ({ nickName, profilePicture, contactId}) => {
    const { 
        dropdown,
        setDropdown,
        handleOpenCloseDropDownMenu,
        handleCloseDropdown
    } = useGlobalContext()
    console.log(nickName)
    const {contact_Id} = useParams()

    return (
        <header>
            {
                contactId !== contact_Id
                    ?
                    <div className='userInfoChat'>

                        <div className='interactiveButtons'>
                            <img className='whatsappIcon' src="/images/whatsApp.png" alt="whatsApp" width='100px' />
                        </div>
                        <ContactsDropdownMenu />
                    </div>

                    :
                    <div className='userInfoChat'>
                        <div className='userData'>
                            <Link to='/contacts' onClick={handleCloseDropdown}><i className="backArrow bi bi-arrow-left-short"></i></Link>
                            <div className='imgContainer'>
                                <img className='userImg' src={profilePicture} alt={nickName + 'Img'} />
                            </div>
                            <Link to={'/contacts/chat/' + contactId + '/info'} className='nameConection' onClick={handleCloseDropdown}>
                                <span className='userName'>{nickName}</span>
                            </Link>
                        </div>
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
