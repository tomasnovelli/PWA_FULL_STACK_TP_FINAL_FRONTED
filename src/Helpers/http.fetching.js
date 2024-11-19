
export const POST = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            ...params
        })
        return response.json()
    }
    catch (error) {
        throw error
    }

}

export const GET = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'GET',
            ...params
        })
        return response.json()
    }
    catch (error) {
        console.error(error)
        throw error
    }
}

export const PUT = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'PUT',
            ...params
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const DELETE = async(URL_API, params) =>{
    try{
        const response = await fetch(URL_API, {
            method: 'DELETE',
            ...params
        })
    }
    catch(error){
        console.log(error)
        throw error
    }
}

const getUnnautenticatedHeaders = () => {
    const unauthValue = new Headers()
    unauthValue.set('Content-Type', 'application/json')
    unauthValue.set('x-api-key', '57f02668-b607-40fd-9c64-acc1b9833b8e')
    return unauthValue
}

const getAuthenticatedHeaders = () => {
    const authValue = new Headers()
    authValue.set('Content-Type', 'application/json')
    authValue.set('x-api-key', '57f02668-b607-40fd-9c64-acc1b9833b8e')
    authValue.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
    return authValue
}

export {getAuthenticatedHeaders, getUnnautenticatedHeaders }