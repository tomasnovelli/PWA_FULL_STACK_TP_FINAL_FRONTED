import React from 'react'
import './chat.css'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Header, ListChat, WrittingText } from '../../Components'

const Chat = () => {

  const { getContactDataById } = useGlobalContext()
  const params = useParams()
  const contactData = getContactDataById(params.contact_id)

  return (
    <div className='chat'>
      <Header userName={contactData.name} 
              userImg={contactData.thumbnail} 
              userId={contactData.id} 
              userConection={contactData.lastConection} 
      />
      <ListChat dataMessage={contactData.message} />
      <WrittingText contactData={contactData} />
    </div>
  )
}

export default Chat
