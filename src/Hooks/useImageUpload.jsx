import react from 'react'
import { useState } from "react"

const useImageUpload = () => {

    const [profilePicture, setProfilePicture] = useState('')
    const [imageErrors, setImageErrors] = useState('')
    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
        const FILE_MB_LIMIT = 2
        const lector_archivos = new FileReader()
    
        if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
            setImageErrors('File must be less than 2 MB')
        } else{
            lector_archivos.onloadend = () => {
                console.log('carga finalizada')
                setProfilePicture(lector_archivos.result)
            }
            if (file_found) {
                lector_archivos.readAsDataURL(file_found)
            }
            setImageErrors('')
        }
    }
    return {
        handleChangeFile,
        profilePicture,
        imageErrors
    }
}

export default useImageUpload

