import React, { useState, useEffect } from 'react'
import { encode } from 'base-64'
import { env } from '../env'

const UseFetch = (url, method) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    // const [url, setUrl] = useState(initialUrl)

    useEffect(() => {
        const username = 'memefeed'
        const password = 'Connect12345!'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append(
            'Authorization',
            `Basic ${encode(`${username}:${password}`)}`
        )
        setLoading(true)
        fetch(`${env.baseUrl}${url}`, {
            method: method,
            headers: myHeaders
        })
            .then(res => res.json())
            .then(json => {
                console.log("Usefetch Response: ", JSON.stringify(json))
                setLoading(false)
                setData(json)
            })
            .catch(error => {
                setLoading(false)
                setError(error)
            })
    }, [url])

    return { loading, error, data }
}

export default UseFetch