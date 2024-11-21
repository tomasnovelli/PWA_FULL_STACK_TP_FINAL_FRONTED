import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../../Hooks/useForm'
import { getUnnautenticatedHeaders, POST } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'



const Register = () => {

    const navigate = useNavigate()
    const [profilePicture, setprofilePicture] = useState('')

    const formShcema = {
        'userName': '',
        'email': '',
        'password': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formShcema)
    form_values_state.profilePicture = profilePicture
    const handleSubmitRegisterForm = async (e) => {
        e.preventDefault()
        const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/auth/registration`, {
            headers: getUnnautenticatedHeaders(),
            body: JSON.stringify(form_values_state)
        })
        console.log({response})
        navigate('/login')
    }
    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
        const FILE_MB_LIMIT = 2
        if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
            //crear estado de errores
            alert(`Error el archivo es muy grande (limite ${FILE_MB_LIMIT}mb)`)
            return
        }
        const lector_archivos = new FileReader()
        lector_archivos.onloadend = () => {
            console.log('carga finalizada')
            setprofilePicture(lector_archivos.result)
        }
        if (file_found) {
            lector_archivos.readAsDataURL(file_found)
        }
        if (!file_found) {
            setprofilePicture('/images/newUserWhatsapp.jpg')
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
                        profilePicture && <img src={profilePicture} />
                    }
                    <label htmlFor='profilePicture'>Select Your Profile Picture</label>
                    <input name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />

                </div>
                <button type='submit'>Registrar</button>
            </form>
            <span>Si ya tienes cuenta puedes <Link to={"/login"}>loguear</Link></span>
        </div>
    )
}

export default Register
