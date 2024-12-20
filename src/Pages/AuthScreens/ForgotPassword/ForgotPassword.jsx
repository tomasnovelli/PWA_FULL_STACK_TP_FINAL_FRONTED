import React, { useState } from 'react'
import useForm from '../../../Hooks/useForm'
import ENVIROMENT from '../../../Enviroment/enviroment'
import { Link } from 'react-router-dom'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import '../authStyles.css'
import './forgotPasswordStyles.css'
import { useGlobalContext } from '../../../Components/GlobalContext/GlobalContext'
const ForgotPassword = () => {

    const [error, setError] = useState('')
    const {
        messageOk, 
        setMessageOk,
        isLoading, 
        setIsLoading
    } = useGlobalContext()

    const formSchema = {
        'email': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)
    const handleSubmitForgotPasswordForm = async (e) => {
        try {
            e.preventDefault()
            setError('')
            setMessageOk('')
            setIsLoading(true)
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                setIsLoading(false)
                setError(response.payload.detail)
            } else {
                setError('')
                setIsLoading(false)
                setMessageOk(response.message)
            }
        }
        catch (error) {
            error.message
        }
    }

    return (
        <div className='authPage'>
            <div className='whatsAppAuthPage'>
                <img className='whatsAppAuthinIcon' src="/images/whatsApp.png" alt="whatsApp" />
            </div>
            <div className='authForm forgot'>
                <div className='headerForm'>
                    <h1 className='authTitle'>Forgot Password</h1>
                    <p className='forgotPasswordInstruction'>We'll send you an email with the instructions to reset your password</p>
                </div>
                <form className='authFormContainer' onSubmit={handleSubmitForgotPasswordForm}>
                    <div className='inputsContainer'>
                        <label htmlFor='email'>Email</label>
                        <input className='authInputsBorder' name='email' id='email' placeholder='pepe@gmail.com' type='email' onChange={handleChangeInputValue} />
                    </div>
                    <div className='errorContainer'>
                        {
                            isLoading &&
                                <div className='authIsLoadingMessageContainer'>
                                    <span>Loading...</span>
                                </div>
                        }
                    </div>
                    <div className='errorContainer'>
                        {
                            error ?
                                <div className='authErrorMessageContainer'>
                                    <span>{error}</span>
                                </div>
                                :
                                (messageOk &&
                                    <div className='authSuccededMessageContainer'>
                                        <span>{messageOk}</span>
                                    </div>)
                        }
                    </div>
                    <div className='btn-authContainer'>
                        <button className='btn-authSubmit' type='submit'>Send Email</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <span>Remember your password?  <Link className='bold' to='/login'>Login</Link></span>
                    <span>Don't have an account?  <Link className='bold' to='/register'>Register</Link></span>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
