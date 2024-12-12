import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'
import useImageUpload from '../../../Hooks/useImageUpload'
import './register.css'
import '../authStyles.css'
import { useGlobalContext } from '../../../Components/GlobalContext/GlobalContext'



const Register = () => {

    const navigate = useNavigate()
    const {
        isLoading, 
        setIsLoading
    } = useGlobalContext()

    const nonImageProfile = '/images/newUserWhatsapp.jpg'
    const formShcema = {
        'userName': '',
        'email': '',
        'password': ''
    }

    const { form_values_state, handleChangeInputValue, validateForm, errorState, setErrorState } = useForm(formShcema)
    const { handleChangeFile, imageErrors, newProfilePicture } = useImageUpload(nonImageProfile)
    form_values_state.profilePicture = newProfilePicture
    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const validationForm = validateForm(form_values_state)
        if(validationForm && !imageErrors){
            setIsLoading(true)
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/registration`, {
                headers: getUnnautenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if(!response.ok){
                setIsLoading(false)
                return setErrorState(response.payload.detail)
            }
            if(!errorState){
                setIsLoading(false)
                navigate('/login')
            }
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
                    <div className='inputsContainer'>
                        <label htmlFor='userName'>UserName:</label>
                        <input className='authInputsBorder' name='userName' id='userName' placeholder='pepe' autoComplete='off' type='text' onChange={handleChangeInputValue} />
                        <span className='inputsInstruction'>
                        Must Contain: 
                        3 - 20 characters, 
                        cant be empty, 
                        numbers & special characters arent allowed
                        </span>
                    </div>
                    <div className='inputsContainer'>
                        <label htmlFor='email'>Email:</label>
                        <input className='authInputsBorder' name='email' id='email' type='email' placeholder='pepe@gmail.com' onChange={handleChangeInputValue} />
                    </div>
                    <div className='inputsContainer'>
                        <label htmlFor='password'>Password:</label>
                        <input className='authInputsBorder' name='password' id='password' placeholder='pepe123' type='password' onChange={handleChangeInputValue} />
                        <span className='inputsInstruction'>
                        Must Contain:
                        8 - 15 characters,
                        1 uppercase letter,
                        1 lowercase letter,
                        1 number
                    </span>
                    </div>
                    <div className='profilePictureContainer'>
                        <label htmlFor='profilePicture'>Profile Picture</label>
                        <input className='profilePictureSelect' name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
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
                            imageErrors &&
                            <div className='authErrorMessageContainer'>
                                <span >{imageErrors}</span>
                            </div>
                        }
                        {
                            errorState &&
                                <div className='authErrorMessageContainer'>
                                    <span>{errorState}</span>
                                </div>
                        }
                    </div>
                    <div className='btn-authContainer'>
                        <button className='btn-authSubmit' type='submit'>Registrar</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <span>
                        If you already have an account <Link className='bold' to={"/login"}>Login</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register
