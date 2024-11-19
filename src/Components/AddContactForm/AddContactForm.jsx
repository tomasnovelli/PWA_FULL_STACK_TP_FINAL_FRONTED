import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext/GlobalContext'
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import './AddContactFormStyles.css'
import { updateContactDataBase } from '../../Helpers/chatData';
import { v4 as uuid } from 'uuid'
const AddContactForm = () => {
    
    const { contactListData, setContactListData } = useGlobalContext()
    const navigate = useNavigate()
    const selectCountryNumberOptions = [
        'AR +54',
        'MX +52',
        'CH +56',
        'ES +34',
        'US +1'
    ]
    const formSchema = {
        name: {
            validate: (value) => {
                return Boolean(value) && value.length > 2 && value.length < 20
            },
            errorText: 'The name must be between 2 to 19 alphanumeric characters'
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
        mailStorage: {
            validate: (value) => {
                return Boolean(value) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)
            },
            errorText: 'You must enter a valid email'
        }
    }
    const [errors, setErrors] = useState({})
    const addError = (error, origin) => {
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
    }
    const handleCreateContact = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        if (isFormValid(formData)) {
            const newContactValues = {
                id: uuid(),
                thumbnail: '/images/newUserWhatsapp.jpg',
                lastConection: 'ayer',
                message: []
            }
            for (const prop in formSchema) {
                newContactValues[prop] = formData.get(prop)
            }
            setContactListData([...contactListData, newContactValues])
            updateContactDataBase(newContactValues)
            navigate('/contacts')
        }
    }

    return (
        <form className='addContactForm' onSubmit={handleCreateContact}>
            <div className='addContactInputsContainer'>
                <div className='newUserNameContainer'>
                    <div>
                        <i className="formIconsSize bi bi-person-fill"></i>
                    </div>
                    <label htmlFor="name"></label>
                    <input className='inputsBorder' type="text" placeholder='name' name='name' id='name' autoComplete="off" />
                    {errors.name && <span className='errorAlertName'>{errors.name}</span>}
                </div>

                <div className='newUserPhoneNumberContainer'>
                    <div className='phoneNumberIconContainer formIconsSize'>
                        <MdOutlinePhone />
                    </div>
                    <div className='countrySelectContainer'>
                        <label className='countrySelectLabel' htmlFor="phoneCountryId">Country</label>
                        <select className='phoneCountryId inputsBorder' name="phoneCountryId" id="phoneCountryId">
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
                    <input className='phoneNumber inputsBorder' type="text" placeholder='Phone Number' name="phoneNumber" id="phoneNumber" autoComplete="off" />
                    {errors.phoneNumber && <span className='errorAlertNumber'>{errors.phoneNumber}</span>}
                </div>

                <div className='newUserMailStorageContainer'>
                    <div className='mailStorageIcon formIconsSize'>
                        <MdOutlineSaveAlt />
                    </div>
                    <div className='mailStorageInputContainer'>
                        <label htmlFor="mailStorage">Save In</label>
                        <input className='inputsBorder' type="text" placeholder='name@gmail.com' name='mailStorage' id='mailStorage' />
                        {errors.mailStorage && <span className='errorAlertMail'>{errors.mailStorage}</span>}
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
