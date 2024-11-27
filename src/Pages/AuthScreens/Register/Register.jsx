import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'
import useImageUpload from '../../../Hooks/useImageUpload'



const Register = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState('') 
    
    const formShcema = {
        'userName': '',
        'email': '',
        'password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formShcema)
    const { handleChangeFile, imageErrors, newProfilePicture } = useImageUpload()

    form_values_state.profilePicture = newProfilePicture
    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/registration`, {
            headers: getUnnautenticatedHeaders(),
            body: JSON.stringify(form_values_state)
        })
        console.log({response})
        if(!response.ok) {
            return setErrors(response.payload.detail)
        }
        if(!errors){
            navigate('/login')
        }
    }

    return (
        <div>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmitRegisterForm}>
                <div>
                    <label htmlFor='userName'>Enter Your UserName:</label>
                    <input name='userName' id='userName' placeholder='pepe' onChange={handleChangeInputValue} />
                </div>
                <div>
                    <label htmlFor='email'>Enter Your Email:</label>
                    <input name='email' id='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                </div>
                <div>
                    <label htmlFor='password'>Enter Your Password:</label>
                    <input name='password' id='password' placeholder='pepe123' onChange={handleChangeInputValue} />
                </div>
                <div>
                    {
                        newProfilePicture && <img src={newProfilePicture} width={200}/>
                    }
                    <label htmlFor='profilePicture'>Select Your Profile Picture</label>
                    <input name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
                    {
                        imageErrors && <span>{imageErrors}</span>
                    }
                    {
                        errors && <span>{errors}</span>
                    }
                </div>
                <button type='submit'>Registrar</button>
            </form>
            <span>Si ya tienes cuenta puedes <Link to={"/login"}>loguear</Link></span>
        </div>
    )
}

export default Register
