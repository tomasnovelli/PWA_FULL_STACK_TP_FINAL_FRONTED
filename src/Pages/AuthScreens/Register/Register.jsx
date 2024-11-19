import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'



const Register = () => {
    const navigate = useNavigate()

    const formShcema = {
        'name': '',
        'email': '',
        'password': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(formShcema)
    
    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const form_html = e.target
        const body = await POST('http://localhost:3000/api/auth/add-new-user', {
            headers: getUnnautenticatedHeaders(),
            body: JSON.stringify(form_values_state)
        })
        console.log(body)
        navigate('/login')
    }
    return (
        <div>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmitRegisterForm}>
                <div>
                    <label htmlFor='name'>Ingresa tu nombre:</label>
                    <input name='name' id='name' placeholder='pepe' onChange={handleChangeInputValue}/>
                    
                </div>
                <div>
                    <label htmlFor='email'>Ingresa tu email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                </div>
                <div>
                    <label htmlFor='password'>Ingresa tu contraseña</label>
                    <input name='password' id='password' placeholder='pepe123' onChange={handleChangeInputValue} />
                </div>
                <button type='submit'>Registrar</button>
            </form>
            <span>Si ya tienes cuenta puedes <Link to={"/login"}>loguear</Link></span>
        </div>
    )
}

export default Register
