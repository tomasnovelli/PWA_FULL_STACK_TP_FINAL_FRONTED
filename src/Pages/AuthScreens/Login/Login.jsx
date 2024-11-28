import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import useForm from '../../../Hooks/useForm'
import ENVIROMENT from '../../../Enviroment/enviroment'


const Login = () => {

    const navigate = useNavigate()
    const [error, setErrors] = useState('')

    const formShcema = {
        'email': '',
        'password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formShcema)
    
    const handleSubmitLoginForm = async (e) => {
        try {
            e.preventDefault()
            console.log(ENVIROMENT.URL_BACKEND)
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/login`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                console.log({response})
                return setErrors(response.payload.detail)
            }
            
            const access_token = response.payload.token
            sessionStorage.setItem('access_token', access_token)
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user)) 
            navigate(`/contacts/${response.payload.user.id}`)
        }
        catch (error) {
            error.message
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' id='password' placeholder='pepe123'onChange={handleChangeInputValue} />
                </div>
                {
                    error && 
                        <div>
                        <br/>
                        <span>{error}</span>
                        </div>
                }
                <button type='submit'>Login</button>
            </form>
            <span>If you don't have an account yet, you can<Link to={"/register"}>Register here</Link></span>
            <br />
            <span>Forgot your password?  <Link to={'/forgot-password'}>Reset password here</Link></span>
        </div>
    )
}

export default Login