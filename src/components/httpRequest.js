import * as React from "react" 
import { useState, useEffect } from "react" 
import axios from "axios"

const useApiRequest = (url, options) => {
    const [data, setData] = useState([]) 
    const [isLoaded, setIsLoaded] = useState(false) 
    const [error, setError] = useState(null) 

    useEffect(() => {
        
        // const fetchData = () => {
        //     axios({
        //         method: 'get',
        //         url: url,
        //         data: data
        //     })
        //         .then(response => {
        //             setIsLoaded(true) 
        //             setData(response.data) 
        //         })
        //         .catch(error => {
        //             setError(error) 
        //         }) 
        // } 
        const fetchData = async () => {
            setLoading(true)
            let username = 'memefeed'
            let password = 'Connect12345!'
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`
            )
            
            options.headers = myHeaders
            try {
                const res = await fetch(url, options)
                const json = await res.json()
                alert(JSON.stringify(json))
                
                setIsLoaded(true) 
                setData(response.data) 
            } catch (error) {
                alert(error)
                setError(error)
                setLoading(false)
            }
        }
        fetchData() 
    }, [url]) 

    return { error, isLoaded, data } 
} 

const Example = () => {
    const { data, error, isLoaded } = useApiRequest(
        "https://jsonplaceholder.typicode.com/todos"
    ) 

    if (error !== null) {
        return <div>Error: {error.message}</div> 
    }
    if (!isLoaded) {
        return <div>Loading...</div> 
    }
    return (
        <div>
            items
            {data.map(item => (
                <div>{item.id}</div>
            ))}
        </div>
    ) 
} 

export default Example 
