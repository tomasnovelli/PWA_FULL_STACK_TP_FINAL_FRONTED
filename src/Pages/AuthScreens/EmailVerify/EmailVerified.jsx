import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GET, getUnnautenticatedHeaders } from '../../../Helpers/http.fetching'
import ENVIROMENT from '../../../Enviroment/enviroment'

const EmailVerify = () => {

    const { verificationToken } = useParams()
    const [statusMessage, setStatusMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const verifyEmail = async () => {
        try {
            const response = await GET(`${ENVIROMENT.URL_BACKEND}/api/auth/verify/${verificationToken}`, {
                headers: getUnnautenticatedHeaders()
            })
            if (!response.ok) {
                setStatusMessage(response.payload.detail)
                console.error(response.payload.detail || 'Error Verifying Email')
            }else{
                setStatusMessage(response.payload.detail)
            }
        }
        catch (error) {
            console.error(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    useEffect(
        () => {
            if (verificationToken) {
                verifyEmail()
            }
        }, [verificationToken])

    return (
        <div>
            <h2>Email Verification</h2>
            {
                isLoading
                    ?
                    <span>Loading...</span>
                    :
                    <div>
                        <span>{statusMessage}</span>
                        <p>Please go to <Link to={'/login'}>Login</Link> </p>
                    </div>
            }

        </div>
    )
}

export default EmailVerify
