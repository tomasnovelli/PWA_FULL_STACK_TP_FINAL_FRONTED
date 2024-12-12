import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, PUT } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'
import './resetPassword.css'
import { useGlobalContext } from '../../../Components/GlobalContext/GlobalContext'
const ResetPassword = () => {

    const { reset_token } = useParams()
    const [errors, setErrors] = useState('')
    const {
        messageOk, 
        setMessageOk,
        isLoading, 
        setIsLoading
    } = useGlobalContext()

    const formSchema = {
        'password': '',
        'confirm_password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)

    const handleSubmitResetPasswordForm = async (e) => {
        try {
            e.preventDefault()
            setErrors('')
            setMessageOk('')
            setIsLoading(true)
            if (form_values_state.password !== form_values_state.confirm_password) {
                setIsLoading(false)
                return setErrors('Passwords do not match')
            } else {
                setErrors('')
            }
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/${reset_token}`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                setIsLoading(false)
                return setErrors(response.payload.detail)
            } else {
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
            <div className='authForm'>
                <h1 className='authTitle'>Reset Password</h1>
                <form className='authFormContainer' onSubmit={handleSubmitResetPasswordForm}>
                    <div className='inputsContainer'>
                        <label htmlFor='password'>Password:</label>
                        <input className='authInputsBorder' name='password' id='password' placeholder='Pepe1234' type='password' onChange={handleChangeInputValue} />
                    </div>
                    <div className='inputsContainer'>
                        <label htmlFor='confirm_password'>Confirm Password</label>
                        <input className='authInputsBorder' name='confirm_password' id='confirm_password' placeholder='Pepe1234' type='password' onChange={handleChangeInputValue} />
                    </div>
                    <span className='forgotPasswordInstruction'>
                        Must Contain:
                        8 - 15 characters,
                        1 uppercase letter,
                        1 lowercase letter,
                        1 number
                    </span>
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
                            errors ?
                                <div className='authErrorMessageContainer'>
                                    <span>{errors}</span>
                                </div>
                                :
                                (messageOk &&
                                    <div className='authSuccededMessage'>
                                        <div className='authSuccededMessageContainer'>
                                            <span>{messageOk}</span>
                                        </div>
                                        <div>
                                            Now you can go to <Link to='/login'>Login</Link>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                    <div className='btn-authContainer'>
                        <button className='btn-authSubmit' type='submit'>Reset Password</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ResetPassword
