import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddContact, Chat, Contacts, Login, NotFound404, Register, UserCall, UserInfo } from './Pages/index.js'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/contacts' element={<Contacts />} />
        <Route path='/contacts/chat/:contact_id' element={<Chat />}/>
        <Route path='/contacts/chat/:contact_id/info' element={<UserInfo />}/>
        <Route path='/contacts/chat/:contact_id/calling' element={<UserCall />}/>
        <Route path='/contacts/addContact' element={<AddContact />}/>
        <Route path='/*' element={<NotFound404/>}/>
      </Routes>
    </>
  )
}

export default App
