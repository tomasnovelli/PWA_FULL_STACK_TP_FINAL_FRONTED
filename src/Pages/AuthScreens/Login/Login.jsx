import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import extractFormData from '../../../utils/extracFormData'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'

const Login = () => {

    const navigate = useNavigate()
    const [error, setErrors] = useState('')
    const handleSubmitLoginForm = async (e) => {
        try {
            e.preventDefault()
            const valoresFormulario = new FormData(e.target)
            const formShcema = {
                'email': '',
                'password': ''
            }
            const form_values_object = extractFormData(formShcema, valoresFormulario)
            const response = await POST('http://localhost:3000/api/auth/login', {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_object)
            })
            if (!response.ok) {
                return setErrors(response.message)
            }
            console.log({ response })
            const access_token = response.payload.token
            sessionStorage.setItem('access_token', access_token)
            sessionStorage.setItem('user_info', JSON.stringify(response.payload.user)) 
            navigate('/contacts')
        }
        catch (error) {
            error.message
        }

    }
    return (
        <div>
            <h1>Inicia Sesion</h1>
            <form onSubmit={handleSubmitLoginForm}>
                <div>
                    <label htmlFor='email'>Ingresa tu email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' />
                </div>
                <div>
                    <label htmlFor='password'>Ingresa tu contraseña</label>
                    <input name='password' id='password' placeholder='pepe123' />
                </div>
                {
                    error && 
                        <div>
                        <br/>
                        <span>{error}</span>
                        </div>
                }
                <button type='submit'>Iniciar Sesion</button>
            </form>
            <span>Si aun no tienes cuenta puedes <Link to={"/register"}>registrare</Link></span>
            <br />
            <span>Olvidaste tu contraseña?  <Link to={'/forgot-password'}>Restablecer Contraseña</Link></span>
        </div>
    )
}

export default Login