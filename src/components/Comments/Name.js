import React, { useContext, useEffect } from "react"
import {CommentsContext} from "./CommentsContext"
import { View } from 'react-native'
import { Text } from 'native-base'

// This component displays name from Context
const Name = () => {
    const user = useContext(CommentsContext)
    useEffect(() => {
        user.setName('Pardu')
    }, [])

    return (
        <View>
            <Text>{user.name}</Text>
            <Text>{user.comments.length}</Text>
        </View>
    )
}

export default Name 