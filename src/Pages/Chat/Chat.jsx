import React from 'react'
import './chat.css'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Header, ListChat, WrittingText } from '../../Components'

const Chat = () => {

  const { contactListData } = useGlobalContext()
  
  const {
    nickName,
    profilePicture,
    contactId
  } = contactListData

  return (
    <div className='chat'>
      <Header nickName={contactListData.nickName}
              profilePicture={contactListData.profilePicture} 
              contactId={contactListData.contactId}
      />
{/*       <ListChat dataMessage={contactData.message} />
      <WrittingText contactData={contactData} /> */}
    </div>
  )
}

export default Chat
