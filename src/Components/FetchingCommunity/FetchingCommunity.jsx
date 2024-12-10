import React, { useEffect, useState } from 'react'
import FetchingPostList from '../FetchingPostList/FetchingPostList'

const FetchingCommunity = () => {

    const [info, setInfo] = useState()
    const fetchInfo = async () => {
        const URL_API = 'https://jsonplaceholder.typicode.com/'
        const answer = await fetch(URL_API + '/posts', {
            method: 'GET',
        })
        setInfo(await answer.json())
    }
    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <>
            {info && <FetchingPostList info={info} />}
        </>
    )
}

export default FetchingCommunity
