import React from 'react'
import Message from '../Message/Message'
import './listChat.css'

const ListChat = ({dataMessage}) => {
    return (
        <div className='chatBox'>
            {
                dataMessage.map((chat) => <Message 
                    author={chat.author} 
                    text={chat.text} 
                    state={chat.state} 
                    date={chat.date} 
                    key={chat.id}
                    />)
            }
        </div>
    )
}

export default ListChat
