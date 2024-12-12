import { useState } from "react"
import { validateEmail, validatePassword, validateUserName } from "../Helpers/validationForm"

const useForm = (form_schema) => {
    const [form_values_state, setFormValuesState] = useState(form_schema)
    const [errorState, setErrorState] = useState('')

    const handleChangeInputValue = (e) => {
        const input_name = e.target.name
        const input_value = e.target.value
        setFormValuesState(
            (prev_form_values_state) => {
                return {
                    ...prev_form_values_state,
                    [input_name]: input_value
                }
            }
        )
    }
    
    const validateForm = (values) => {
        if (!validateUserName(values.userName)) {
            setErrorState('Username must be 3 - 20 characters, cant be empty, numbers & special characters arent allowed')
            return false
        }
        else if (!validateEmail(values.email)) {
            setErrorState('Email is not valid')
            return false
        }
        else if (!validatePassword(values.password)) {
            setErrorState('Password must be 8 to 15 character, at least 1 uppercase letter, 1 lowercase letter, and 1 number')
            return false
        } else {
            setErrorState('')
            return true
        }
    } 

    return {
        form_values_state,
        handleChangeInputValue,
        setFormValuesState,
        validateForm,
        setErrorState,
        errorState
    }
}

export default useForm