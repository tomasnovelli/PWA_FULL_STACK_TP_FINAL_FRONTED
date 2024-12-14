import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useImageUpload from '../../Hooks/useImageUpload'
import { getAuthenticatedHeaders, PUT } from '../../Helpers/http.fetching'
import ENVIROMENT from '../../Enviroment/enviroment'
import './updateUserProfileStyles.css'


const UpdateUserProfile = () => {
    const { user_id } = useParams()
    const [errors, setErrors] = useState('')

    const { userName, profilePicture } = JSON.parse(sessionStorage.getItem('user_info'))

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
        catch (error) {
            error.message
        }
    }

    return (
        <div className='updateUserInfoContainer'>
            <div className='updateUserInfoHeader'>
                <Link to={`/contacts/${user_id}`}><i className="backArrow bi bi-arrow-left-short"></i>
                </Link>
                <h2 className='updateUserInfoTitle'>Update Your Profile</h2>
            </div>
            <div className='updateUserInfoForm'>
                <form className='updateUserInfoFormContainer' onSubmit={handleSubmitUpdateProfileForm}>
                    <div className='selectProfilePicture'>
                        {
                            newProfilePicture &&
                            <div className='newProfilePicture'>
                                <img src={newProfilePicture} />
                            </div>
                        }
                        <label htmlFor='profilePicture'>Select Your Profile Picture</label>
                        <input className='' name='profilePicture' id='profilePicture' type='file' onChange={handleChangeFile} accept='image/*' />
                    </div>
                    <div>
                        <label htmlFor='userName'>Change Username:</label>
                        <input className='inputsBorder' name='userName' id='userName' placeholder='Pepe Juarez' defaultValue={form_values_state.userName} onChange={handleChangeInputValue} />
                    </div>
                    <div className='changePasswordContainer'>
                        <h3 className='changePasswordText'>Change Password</h3>
                        <span>To change password please enter your actual password</span>
                        <div>
                            <label htmlFor='actualPassword'>Actual Password:</label>
                            <input className='inputsBorder' name='actualPassword' id='actualPassword' placeholder='Pepe1234' type='password' onChange={handleChangeInputValue} />
                        </div>
                        <div>
                            <label htmlFor='password'>New Password:</label>
                            <input className='inputsBorder' name='password' id='password' placeholder='Pepe1234' type='password' onChange={handleChangeInputValue} />
                        </div>
                    </div>
                    <div className='updateUserInfoErrorContainer'>
                        {
                            errors &&
                            <div className='updateUserInfoErrorMessageContainer'>
                                <span>{errors}</span>
                            </div>
                        }
                    </div>
                    <div className='updateUserInfoErrorContainer'>
                            {
                                imageErrors &&
                                <div className='updateUserInfoErrorMessageContainer'>
                                    <span>{imageErrors}</span>
                                </div>
                            }
                        </div>
                    <div className='btn-UpdateUserProfileContainer'>
                        <button className='btn-UpdateUserProfileSubmit' type='submit'>Update</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default UpdateUserProfile
