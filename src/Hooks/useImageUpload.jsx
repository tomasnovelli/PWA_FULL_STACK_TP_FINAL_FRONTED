import react from 'react'
import { useState } from "react"

const useImageUpload = (userProfilePicture) => {

    const [newProfilePicture, setNewProfilePicture] = useState(userProfilePicture)
    
    const [imageErrors, setImageErrors] = useState('')
    const handleChangeFile = (e) => {
        const file_found = e.target.files[0]
        const FILE_MB_LIMIT = 2
        const lector_archivos = new FileReader()
        if (file_found && file_found.size > FILE_MB_LIMIT * 1024 * 1024) {
            setImageErrors('Image must be less than 2 MB')
        } else {
            lector_archivos.onloadend = () => {
                console.log('carga finalizada')
                setNewProfilePicture(lector_archivos.result)
            }
            if (file_found) {
                lector_archivos.readAsDataURL(file_found)
            }
            setImageErrors('')
        }
    }
    return {
        handleChangeFile,
        newProfilePicture,
        imageErrors,
        setNewProfilePicture
    }
}

export default useImageUpload

