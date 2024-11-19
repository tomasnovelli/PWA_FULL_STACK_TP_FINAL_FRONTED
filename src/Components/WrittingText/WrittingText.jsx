import React from 'react'
import './writtingText.css'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { v4 as uuid } from 'uuid'
const WrittingText = ({ contactData }) => {

  const { textInput, handleChangeContentValue, setTextInput, updateContact } = useGlobalContext()
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevoMensaje = {
      author: 'Yo',
      text: textInput,
      state: 'entregado',
      date: currentTime, 
      id: uuid()
    }
    const updatedContactData = {
      ...contactData,
      message: [
        ...contactData.message,
        nuevoMensaje
      ]
    }
    updateContact(updatedContactData)
    setTextInput('')
  }

  return (
    <div className='writtingText'>
      <form className='form' onSubmit={handleSubmit}>
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
