import React from 'react'
import './messageStyle.css'
import { useParams } from 'react-router-dom'

const Message = ({ author, content, created_at }) => {

    const { user_id } = useParams()
    const timestamp = new Date(created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    return (
        <>
            <div className='chatContainer'>
                {
                    author === user_id
                        ? <div className='chatContainerYo'>
                            <div className='yoMessage'>
                                <p className='messageContent'>{content}</p>
                                <div className='footerMessage'>
                                    <span className='date'>{timestamp}</span>
                                    <span className='checkDelivered'><i className="bi bi-check-all"></i></span>
                                </div>
                            </div>
                        </div>

                        :
                        <div className='chatContainerOther'>
                            <div className='otherMessage'>
                                <p className='messageContent'>{content}</p>
                                <div className='footerMessage'>
                                    <span className='date'>{timestamp}</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )

}

export default Message
