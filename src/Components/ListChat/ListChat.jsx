import React from 'react'
import Message from '../Message/Message'
import './listChat.css'

const ListChat = ({ conversation }) => {

    return (
        <div className='chatBox'>
            {
                conversation.map((chat) => <Message
                    author={chat.author}
                    receiver={chat.receiver}
                    content={chat.content}
                    created_at={chat.created_at}
                    key={chat._id}
                />)
            }
        </div>
    )
}

export default ListChat
