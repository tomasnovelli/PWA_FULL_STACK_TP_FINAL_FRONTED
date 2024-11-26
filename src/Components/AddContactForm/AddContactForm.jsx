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
/*     const selectCountryNumberOptions = [
        'AR +54',
        'MX +52',
        'CH +56',
        'ES +34',
        'US +1'
    ] */
/*     const formSchema = {
        nickName: {
            validate: (value) => {
                return Boolean(value) && value.length > 2 && value.length < 20
            },
            errorText: 'The nickName must be between 2 to 19 alphanumeric characters'
        },
        phoneCountryId: {
            validate: (value) => {
                return Boolean(value)
            },
            errorText: 'You must select a country'
        },
        phoneNumber: {
            validate: (value) => {
                return Boolean(value) && !isNaN(value) && value.length === 10
            },
            errorText: 'The phone number must be 10 numerical characters'
        },
        email: {
            validate: (value) => {
                return Boolean(value) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            },
            errorText: 'You must enter a valid email'
        }
    } */
    const formSchema = {
        'nickName': '',
/*         'phoneCountryId': '',
        'phoneNumber': '', */
        'email': ''
    }
    const {form_values_state, handleChangeInputValue} = useForm(formSchema)
    const [errors, setErrors] = useState({})
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
                    {errors.nickName && <span className='errorAlertName'>{errors.nickName}</span>}
                </div>
{/* 
                <div className='newUserPhoneNumberContainer'>
                    <div className='phoneNumberIconContainer formIconsSize'>
                        <MdOutlinePhone />
                    </div>
                    <div className='countrySelectContainer'>
                        <label className='countrySelectLabel' htmlFor="phoneCountryId">Country</label>
                        <select className='phoneCountryId inputsBorder' name="phoneCountryId" id="phoneCountryId" onChange={handleChangeInputValue}>
                            <option value={''} disabled>Select</option>
                            {selectCountryNumberOptions.map((option, index) => {
                                return <option
                                    key={index + option}
                                    value={option}>{option}</option>
                            })
                            }
                        </select>
                        {errors.phoneCountryId && <span className='errorAlertNCountry'>{errors.phoneCountryId}</span>}
                    </div>
                    <label htmlFor="phoneNumber"></label>
                    <input className='phoneNumber inputsBorder' type="text" placeholder='Phone Number' name="phoneNumber" id="phoneNumber" onChange={handleChangeInputValue} autoComplete="off" />
                    {errors.phoneNumber && <span className='errorAlertNumber'>{errors.phoneNumber}</span>}
                </div> */}

                <div className='newUserMailStorageContainer'>
                    <div className='mailStorageIcon formIconsSize'>
                        <MdOutlineSaveAlt />
                    </div>
                    <div className='mailStorageInputContainer'>
                        <label htmlFor="email">Contact Email</label>
                        <input className='inputsBorder' type="text" placeholder='name@gmail.com' name='email' id='email' onChange={handleChangeInputValue} />
                        {errors.email && <span className='errorAlertMail'>{errors.email}</span>}
                    </div>
                </div>
            </div>
            <div className='btn-addContactContainer'>
                <button className='btn-addContactSubmit' type='submit'>Save</button>
            </div>
        </form>
    )
}

export default AddContactForm
