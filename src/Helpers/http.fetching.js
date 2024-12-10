
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

export const DELETE = async (URL_API, params) => {
    try {
        const response = await fetch(URL_API, {
            method: 'DELETE',
            ...params
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

const getUnnautenticatedHeaders = () => {
    const unauthValue = new Headers()
    unauthValue.set('Content-Type', 'application/json')
    unauthValue.set('x-api-key', '2041ce70-cd77-43ca-bbff-50fc06756faf')
    return unauthValue
}

const getAuthenticatedHeaders = () => {
    const authValue = new Headers()
    authValue.set('Content-Type', 'application/json')
    authValue.set('x-api-key', '2041ce70-cd77-43ca-bbff-50fc06756faf')
    authValue.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
    return authValue
}

export { getAuthenticatedHeaders, getUnnautenticatedHeaders }