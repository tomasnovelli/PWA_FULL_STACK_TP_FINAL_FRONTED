import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useImageUpload from '../../Hooks/useImageUpload'
import { getAuthenticatedHeaders, PUT } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'

const UpdateUserProfile = () => {
    const { user_id } = useParams()
    const [errors, setErrors] = useState('')
    const navigate = useNavigate() 
    const formSchema = {
        'userName': '',
        'actualPassword': '',
        'password': '',
        'profilePicture': ''
    }
    const { form_values_state, handleChangeInputValue } = useForm(formSchema)
    const { profilePicture, handleChangeFile, imageErrors } = useImageUpload()
    if (imageErrors) {
        setErrors(imageErrors)
    } else {
        form_values_state.profilePicture = profilePicture
    }
    const handleSubmitUpdateProfileForm = async (e) => {
        e.preventDefault()
        const response = await PUT(`${ENVIROMENT.URL_BACKEND}/api/user/update-profile/${user_id}`, {
            headers: getAuthenticatedHeaders(),
            body: JSON.stringify(form_values_state)
        })
        if (!response.ok) {
            console.log({ response })
        } else {
            console.log({ response })
            setErrors('')
            navigate(`/contacts/${user_id}`)
        }
    }

    return (
        <div>
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmitUpdateProfileForm}>
                <div>
                    {
                        profilePicture && <img src={profilePicture} width={200} />
                    }
                    <label htmlFor='profilePicture'>Select Your Profile Picture</label>
                    <input name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
                </div>
                <div>
                    <label htmlFor='userName'>Change Username:</label>
                    <input name='userName' id='userName' placeholder='pepe' onChange={handleChangeInputValue} />
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
