import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useImageUpload from '../../Hooks/useImageUpload'
import { getAuthenticatedHeaders, PUT } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'

const UpdateUserProfile = () => {
    const { user_id } = useParams()
    const [errors, setErrors] = useState('')
    const {userName, profilePicture} = JSON.parse(sessionStorage.getItem('user_info')) 
    const navigate = useNavigate()
    const formSchema = {
        'userName': userName,
        'actualPassword': '',
        'password': '',
        'profilePicture': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)
    const { newProfilePicture, handleChangeFile, imageErrors } = useImageUpload(profilePicture)
    form_values_state.profilePicture = newProfilePicture
    const handleSubmitUpdateProfileForm = async (e) => {
        try {
            e.preventDefault()
            const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/user/update-profile/${user_id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if (!response.ok) {
                console.log({ response })
                setErrors(response.payload.detail)
            } else {
                sessionStorage.setItem('user_info', JSON.stringify(response.payload.detail))
                setErrors('')
                navigate(`/contacts/${user_id}`)
            }
        }
        catch(error){
            error.message
        }
    }
    
    return (
        <div>
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmitUpdateProfileForm}>
                <div>
                    {
                        newProfilePicture && <img src={newProfilePicture} width={200} />
                    }
                    <label htmlFor='profilePicture'>Select Your Profile Picture</label>
                    <input name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
                    {
                        imageErrors && <span>{imageErrors}</span>
                    }
                </div>
                <div>
                    <label htmlFor='userName'>Change Username:</label>
                    <input name='userName' id='userName' placeholder='pepe' defaultValue={form_values_state.userName} onChange={handleChangeInputValue} />
                </div>

                <div>
                    <h3>Change Password</h3>
                    <span>To change password please enter your actual password</span>
                    <div>
                        <label htmlFor='actualPassword'>Actual Password:</label>
                        <input name='actualPassword' id='actualPassword' placeholder='pepe123' onChange={handleChangeInputValue} />
                    </div>
                    <div>
                        <label htmlFor='password'>New Password:</label>
                        <input name='password' id='password' placeholder='pepe123' onChange={handleChangeInputValue} />
                    </div>
                </div>
                {
                    errors && <span>{errors}</span>
                }
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateUserProfile
