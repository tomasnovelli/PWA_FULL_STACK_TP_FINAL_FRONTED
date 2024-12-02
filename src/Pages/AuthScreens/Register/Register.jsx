import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'
import useImageUpload from '../../../Hooks/useImageUpload'
import './register.css'
import '../authStyles.css'


const Register = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const nonImageProfile = '/images/newUserWhatsapp.jpg'
    const formShcema = {
        'userName': '',
        'email': '',
        'password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formShcema)
    const { handleChangeFile, imageErrors, newProfilePicture } = useImageUpload(nonImageProfile)
    form_values_state.profilePicture = newProfilePicture
    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/registration`, {
            headers: getUnnautenticatedHeaders(),
            body: JSON.stringify(form_values_state)
        })
        console.log({ response })
        if (!response.ok) {
            return setErrors(response.payload.detail)
        }
        if (!errors) {
            navigate('/login')
        }
    }

    return (
        <div className='authPage'>
            <div className='whatsAppAuthPage'>
                <img className='whatsAppAuthinIcon' src="/images/whatsApp.png" alt="whatsApp" />
            </div>
            <div className='authForm'>
                <h1 className='authTitle'>Register</h1>
                {
                    newProfilePicture &&
                    <div className='profilePictureImg'>
                        <img src={newProfilePicture} />
                    </div>

                }
                <form className='authFormContainer' onSubmit={handleSubmitRegisterForm}>
                    <div>
                        <label htmlFor='userName'>UserName:</label>
                        <input className='authInputsBorder' name='userName' id='userName' placeholder='pepe' onChange={handleChangeInputValue} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input className='authInputsBorder' name='email' id='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input className='authInputsBorder' name='password' id='password' placeholder='pepe123' onChange={handleChangeInputValue} />
                    </div>
                    <div className='profilePictureContainer'>
                        <label htmlFor='profilePicture'>Profile Picture</label>
                        <input className='profilePictureSelect' name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
                    </div>
                    <div className='errorContainer'>
                        {
                            imageErrors &&
                            <div className='authErrorMessageContainer'>
                                <span >{imageErrors}</span>
                            </div>
                        }
                        {
                            errors &&
                            <div className='authErrorMessageContainer'>
                                <span >{errors}</span>
                            </div>
                        }
                    </div>
                    <div className='btn-authContainer'>
                        <button className='btn-authSubmit' type='submit'>Registrar</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <span>If you already have an account <Link className='bold' to={"/login"}>Login</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Register
