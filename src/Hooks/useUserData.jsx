import React, { useState } from 'react'
import { GET } from '../Helpers/http.fetching'
import ENVIROMENT from '../Enviroment/enviroment'

const useUserData = (user_id) => {
    const [userData, setUserData] = useState({})
    const response = GET(`${ENVIROMENT.URL_BACKEND}/api/auth/`)
    return
}

export default useUserData
