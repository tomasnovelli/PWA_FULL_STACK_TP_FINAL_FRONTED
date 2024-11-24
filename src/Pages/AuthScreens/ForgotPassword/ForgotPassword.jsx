import React, { useState } from 'react'
import useForm from '../../../Hooks/useForm'
import ENVIROMENT from '../../../Enviroment/enviroment'
import { Link } from 'react-router-dom'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'

const ForgotPassword = () => {
    const formSchema = {
        'email': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)
    const handleSubmitForgotPasswordForm = async (e) => {
        try {
            e.preventDefault()
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/forgot-password`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            console.log({ response })
        }
        catch (error) {
            error.message
        }
    }
    return (
        <div>
            <h1>Reset Password</h1>
            <p>We'll send you an email with the instructions to reset your password</p>
            <form onSubmit={handleSubmitForgotPasswordForm}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                </div>
                <button type='submit'>Send Email</button>
            </form>
            <span>Remember your password?<Link to='/login'>Login</Link></span>
            <span>Don't have an account?<Link to='/register'>Register</Link></span>
        </div>
    )
}

export default ForgotPassword
