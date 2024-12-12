import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import useForm from '../../../Hooks/useForm'
import ENVIROMENT from '../../../Enviroment/enviroment'
import '../authStyles.css'
import { useGlobalContext } from '../../../Components/GlobalContext/GlobalContext'

const Login = () => {

    const [error, setErrors] = useState('')
    const {
        isLoading, 
        setIsLoading
    } = useGlobalContext()
    
    const formShcema = {
        'email': '',
        'password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formShcema)

    const handleSubmitLoginForm = async (e) => {
        try {
            e.preventDefault()
            setErrors('')
            setIsLoading(true)
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                setIsLoading(false)
                return setErrors(response.message)
            }
            const access_token = response.payload.token
            sessionStorage.setItem('access_token', access_token)
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user))
            setIsLoading(false)
            window.location.reload()
        }
        catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div className='authPage'>
            <div className='whatsAppAuthPage'>
                <img className='whatsAppAuthinIcon' src="/images/whatsApp.png" alt="whatsApp" />
            </div>
            <div className='authForm'>
                <h1 className='authTitle'>Login</h1>
                <form className='authFormContainer' onSubmit={handleSubmitLoginForm}>
                    <div className='inputsContainer'>
                        <label htmlFor='email'>Email:</label>
                        <input className='authInputsBorder' name='email' id='email' placeholder='pepe@gmail.com' type='email' onChange={handleChangeInputValue} />
                    </div>
                    <div className='inputsContainer'>
                        <label htmlFor='password'>Password:</label>
                        <input className='authInputsBorder' name='password' id='password' placeholder='Pepe1234' type='password' onChange={handleChangeInputValue} />
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
                            error &&
                            <div className='authErrorMessageContainer'>
                                <span>{error}</span>
                            </div>
                        }
                    </div>
                    <div className='btn-authContainer'>
                        <button className='btn-authSubmit' type='submit'>Login</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <span>If you don't have an account yet, you can  <Link className='bold' to={"/register"}>Register here</Link></span>
                    <span>Forgot your password?  <Link className='bold' to={'/forgot-password'}>Reset password here</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login