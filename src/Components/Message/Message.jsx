import React from 'react'
import './messageStyle.css'

const Message = ({ author, text, date, state }) => {

    return (
        <>
            <div className='chatContainer'>
                {
                    author == 'Yo'
                        ? <div className='chatContainerYo'>
                            <div className='yoMessage'>
                                <p className='messageContent'>{text}</p>
                                <div className='footerMessage'>
                                    <span className='date'>{date}</span>
                                    {state == 'visto'
                                        ? <span className='checkSeen'><i className="bi bi-check-all"></i></span>
                                        : <span className='checkDelivered'><i className="bi bi-check-all"></i></span>
                                    }
                                </div>
                            </div>
                        </div>

                        :
                        <div className='chatContainerOther'>
                            <div className='otherMessage'>
                                <p className='messageContent'>{text}</p>
                                <div className='footerMessage'>
                                    <span className='date'>{date}</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )

}

export default Message
