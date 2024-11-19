import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { MdOutlinePhone } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import ChatDropdownMenu from '../ChatDropdownMenu/ChatDropdownMenu';
import { FaCaretDown } from "react-icons/fa";
import { useGlobalContext } from '../GlobalContext/GlobalContext';

const User = ({ userName, userImg, userConection, userId }) => {
  const {
    dropdown,
    setDropdown,
    handleOpenCloseDropDownMenu,
    clearLocalStorage,
    handleCloseDropdown
  } = useGlobalContext()

  return (
    <header>
      {
        userName === undefined
          ?
          <div className='userInfoChat'>
            <div className='imgContainer user'>
              <img className='userImg' src={'/images/tomasUserImg.jpg'} alt={'yourImg'} />
            </div>
            <div className='interactiveButtons'>
                <img className='whatsappIcon' src="/images/whatsApp.png" alt="whatsApp" width='100px' />
            </div>
          </div>
          
          :
          <div className='userInfoChat'>
            <div className='userData'>
              <Link to='/contacts' onClick={handleCloseDropdown}><i className="backArrow bi bi-arrow-left-short"></i></Link>
              <div className='imgContainer'>
                <img className='userImg' src={userImg} alt={userName + 'Img'} />
              </div>
              <Link to={'/contacts/chat/' + userId + '/info'} className='nameConection' onClick={handleCloseDropdown}>
                <span className='userName'>{userName}</span>
                <span className='userConection'>{userConection}</span>
              </Link>
            </div>
            <div className='interactiveButtons'>
              <HiOutlineVideoCamera className='camera' />
              <MdOutlinePhone className='telephone' />
              <ChatDropdownMenu userId={userId} />
            </div>
          </div>
      }
    </header>
  )
}

export default User
