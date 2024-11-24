import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, PUT } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'

const ResetPassword = () => {
    const {reset_token} = useParams()
    console.log(reset_token)
    const [errors, setErrors] = useState('')
    const [responseFetch, setResponseFetch] = useState('')

    const formSchema = {
        'password': '',
        'confirm_password': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(formSchema)
    
    const handleSubmitResetPasswordForm = async (e) => {
        try {
            e.preventDefault()
            if(form_values_state.password !== form_values_state.confirm_password) {
                return setErrors('Passwords do not match')
            } else{
                setErrors('')
            } 
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/auth/reset-password/${reset_token}`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if(!response.ok) {
                return setErrors(response.payload.detail)
            } else{
                setResponseFetch(response)
            }
            console.log({response})
        }
        catch (error) {
            error.message
        }
    }
    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmitResetPasswordForm}>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' id='password' placeholder='Pepe1234' onChange={handleChangeInputValue} />
                </div>
                <div>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input name='confirm_password' id='confirm_password' onChange={handleChangeInputValue} />
                </div>
                {
                    errors && <span>{errors}</span>
                }
                <p>Password must be at least 8 characters and must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number</p>
                {
                    responseFetch.ok && <span>{responseFetch.payload.detail} go to <Link to='/login'>Login</Link></span>
                }
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword
