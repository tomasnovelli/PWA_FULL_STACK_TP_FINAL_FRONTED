import React from 'react'
import './writtingText.css'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { useParams } from 'react-router-dom'
import { getAuthenticatedHeaders, POST } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'
import useGetContactChatData from '../../Hooks/useGetContactChatData'
const WrittingText = () => {

    const { contact_id } = useParams()
    const { textInput, setTextInput, setConversation, handleChangeContentValue } = useGlobalContext()

    const handleSendNewMessage = async (e) => {
        try {
            e.preventDefault()
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/messages/send/${contact_id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ content: textInput })
            })
            if (response.ok) {
                setTextInput('')
                setConversation(response.payload.conversation)
            }
        }
        catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className='writtingText'>
            <form className='form' onSubmit={handleSendNewMessage}>
                <div className='textArea'>
                    <div className='textAreaChild'>
                        <label htmlFor="text"></label>
                        <i className="bi bi-emoji-smile smileFace"></i>
                        <input className='textInput' placeholder='Message' type="text" name='text' id='text' onChange={handleChangeContentValue} value={textInput} autoComplete="off" />
                    </div>
                    <div className='textAreaChild'>
                        <i className="bi bi-paperclip"></i>
                        <i className="bi bi-camera"></i>
                    </div>
                </div>
                {
                    !textInput.trim()
                        ? <button className='disabled btn-submit ' type="submit" disabled><i className="bi bi-send-fill"></i></button>
                        :
                        <button className='btn-submit' type="submit"><i className="bi bi-send-fill"></i></button>
                }
            </form>
        </div>
    )
}

export default WrittingText
