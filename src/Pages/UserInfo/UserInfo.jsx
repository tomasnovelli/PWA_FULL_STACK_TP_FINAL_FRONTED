import React from 'react'
import './userInfoStyle.css'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Link, useParams } from 'react-router-dom'
import { FaRegBell } from "react-icons/fa";
import { FavoriteButton, SwitchButton } from '../../Components/index.js';
import { AiOutlineLock } from "react-icons/ai";

const UserInfo = () => {
    
    const {
        getContactDataById,
        handleOpenCloseDropDownMenu,
        dropdown,
        handleCloseDropdown } = useGlobalContext()
    const params = useParams()
    const contactData = getContactDataById(params.contact_id)
    const {
        name,
        thumbnail,
        id,
        phoneNumber,
        phoneCountryId,
        userStateText } = contactData

    return (
        <div className='userInfo'>
            <div className='userInfoHeader'>
                <Link to={'/contacts/chat/' + id} onClick={handleCloseDropdown}><i className="backArrow bi bi-arrow-left-short"></i></Link>
                <div className='userInfoCard'>
                    <div className='imgUser'>
                        <img src={thumbnail} alt="" />
                    </div>
                    <h2>{name}</h2>
                    <span>{phoneCountryId + phoneNumber}</span>
                    <div className='btnFunctionContainer'>
                        <Link to={'/contacts/chat/' + id + '/calling'} onClick={handleCloseDropdown}>
                            <button className='btnFunction'>
                                <i className="telephoneUser bi bi-telephone"></i>
                                <span>Call</span>
                            </button>
                        </Link>
                    </div>
                </div>
                {
                    dropdown &&
                    <div className='chatDropdownMenu'>
                        <Link className='contactInfoLink' to={'/contacts'} onClick={handleCloseDropdown}>Contact List</Link>
                    </div>
                }
                <button className='burgerMenu' onClick={handleOpenCloseDropDownMenu}>
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
            </div>
            <div className='userStateText'>
                <span>{userStateText}</span>
            </div>
            <div className='notificationsState'>
                <div className='notifications'>
                    <FaRegBell />
                    <span>Notifications</span>
                </div>
                <div className="switch-button">
                    <SwitchButton />
                </div>
            </div>
            <div className='messageEncryption'>
                <AiOutlineLock className='lockIcon' />
                <div className='messageEncryptionText'>
                    <h2 className='encryptionTitle'>
                        Encryption</h2>
                    <p className='encryptionText'>Messages are end-to-end encrypted. Click to verify it..</p>
                </div>
            </div>
            <FavoriteButton />
        </div>
    )
}

export default UserInfo
