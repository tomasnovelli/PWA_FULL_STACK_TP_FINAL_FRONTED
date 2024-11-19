import React from 'react'
import { Link } from 'react-router-dom'
import './notFound404.css'

const NotFound404 = () => {
  return (
    <div className='errorNotFound'>
      <h2 className='error404'>OHH.. Error 404</h2>
      <img className='backTotheFutureImg' src="/images/back-to-future.jpeg" alt="backToTheFuture" />
      <h3 className='wrongTimeLine'>Wrong Time Line</h3>
      <Link className='backToTheFutureLink' to='/contacts'>Back To The Future</Link>
    </div>
  )
}

export default NotFound404
