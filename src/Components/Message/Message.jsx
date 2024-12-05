import React from 'react'
import './messageStyle.css'

const Message = ({ senderId, receiverId, content, timestamp}) => {

    return (
        <>
            <div className='chatContainer'>
                {
                    senderId === user_id
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
