import React, { useState } from 'react'
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom'
import './AddContactFormStyles.css'
import useForm from '../../Hooks/useForm';
import { getAuthenticatedHeaders, POST } from '../../Helpers/http.fetching';
import ENVIROMENT from '../../Enviroment/enviroment';

const AddContactForm = () => {
    const {user_id} = useParams()
    const navigate = useNavigate()

    const formSchema = {
        'nickName': '',
        'email': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(formSchema)
    const [errors, setErrors] = useState('')
/*     const addError = (error, origin) => {
        setErrors((prevState) => ({ ...prevState, [origin]: error }))
    }
    const cleanError = (origin) => {
        setErrors((prevState) => {
            const updatedErrors = { ...prevState }
            delete updatedErrors[origin]
            return updatedErrors
        })
    }
    const isFormValid = (formData) => {
        let isValid = true
        for (const prop in formSchema) {
            const validateResult = formSchema[prop].validate(formData.get(prop))
            if (validateResult) {
                cleanError(prop)
            } else {
                addError(formSchema[prop].errorText, prop)
                isValid = false
            }
        }
        return isValid
    } */
    const handleCreateContactForm = async (e) => {
        try{
            e.preventDefault()
            const response = await POST(`${ENVIROMENT.URL_BACKEND}/api/user/contacts/${user_id}/add-new-contact`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(form_values_state)
            })
            if(!response.ok) {
                console.log({response})
                return setErrors(response.payload.detail)
            }else{
                navigate(`/contacts/${user_id}`)
            }
            console.log({response})
        }
        catch (error) {
            error.message
        }
    }

    return (
        <form className='addContactForm' onSubmit={handleCreateContactForm}>
            <div className='addContactInputsContainer'>
                <div className='newUserNameContainer'>
                    <div>
                        <i className="formIconsSize bi bi-person-fill"></i>
                    </div>
                    <label htmlFor="nickName"></label>
                    <input className='inputsBorder' type="text" placeholder='nickName' name='nickName' id='nickName' onChange={handleChangeInputValue} autoComplete="off" />
                </div>

                <div className='newUserMailStorageContainer'>
                    <div className='mailStorageIcon formIconsSize'>
                        <MdOutlineSaveAlt />
                    </div>
                    <div className='mailStorageInputContainer'>
                        <label htmlFor="email">Contact Email</label>
                        <input className='inputsBorder' type="text" placeholder='name@gmail.com' name='email' id='email' onChange={handleChangeInputValue} />
                    </div>
                </div>
            </div>
            {   
                errors && 
                <span className='errorAlert'>{errors}</span>
            }
            <div className='btn-addContactContainer'>
                <button className='btn-addContactSubmit' type='submit'>Save</button>
            </div>
        </form>
    )
}

export default AddContactForm
