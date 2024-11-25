import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddContact, Chat, Contacts, EmailVerify, ForgotPassword, Login, NotFound404, Register, ResetPassword, UserCall, UserInfo } from './Pages/index.js'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password/:reset_token' element={<ResetPassword />} />
        <Route path='/email-verify/:verificationToken' element={<EmailVerify />}/>

        <Route path='/contacts/:user_id' element={<Contacts />} />
        <Route path='/contacts/chat/:contact_id' element={<Chat />}/>
        <Route path='/contacts/chat/:contact_id/info' element={<UserInfo />}/>
        <Route path='/contacts/chat/:contact_id/calling' element={<UserCall />}/>
        <Route path='/contacts/:user_id/addContact' element={<AddContact />}/>

        <Route path='/*' element={<NotFound404/>}/>
      </Routes>
    </>
  )
}

export default App
