import React from 'react'
import './chat.css'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../../Components/GlobalContext/GlobalContext'
import { Header, ListChat, WrittingText } from '../../Components'
import useGetContactChatData from '../../Hooks/useGetContactChatData'
import useGetConversation from '../../Hooks/useGetConversation'

const Chat = () => {

  const { contactListData } = useGlobalContext()
  const { contact_id } = useParams()

  const {
    contactChatData,
    contact_data_loading,
    contact_data_error
  } = useGetContactChatData(contact_id)
  const {
    conversation,
    conversationError,
    isLoadingConversation
  } = useGetConversation(contact_id)

  return (
    <div className='chat'>
      <Header {...contactChatData} contactLoading={contact_data_loading} />
      <ListChat conversation={conversation} conversationLoading={isLoadingConversation} />
      <WrittingText  />
    </div>
  )
}

export default Chat
