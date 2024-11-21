import { useState } from "react"


const useForm = (form_schema) =>{
    const [form_values_state, setFormValuesState] = useState(form_schema)
   

    const handleChangeInputValue = (e) =>{
        const input_name = e.target.name
        const input_value = e.target.value
        setFormValuesState(
            (prev_form_values_state) => {
                return {
                    ...prev_form_values_state, 
                    [input_name]: input_value}
            }
        )
    }
    return {
        form_values_state,
        handleChangeInputValue,
        setFormValuesState
    }
}

export default useForm