import React from 'react'
import './chat.css'
import { useParams } from 'react-router-dom'
import { Header, ListChat, WrittingText } from '../../Components'
import useGetContactChatData from '../../Hooks/useGetContactChatData'
import useGetConversation from '../../Hooks/useGetConversation'

const Chat = () => {

  const { contact_id } = useParams()

  const {
    contactChatData,
    contact_data_loading
  } = useGetContactChatData(contact_id)
  const {
    conversation,
    isLoadingConversation
  } = useGetConversation(contact_id)
  return (
    <div className='chat'>
      <Header {...contactChatData} contactLoading={contact_data_loading} />
      <ListChat conversation={conversation} />
      <WrittingText  />
    </div>
  )
}

export default Chat
