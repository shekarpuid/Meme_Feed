import React, { useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../../env'
import Down from '../../../assets/Down_Arrow.png'
import DownColor from '../../../assets/Down_Arrow_Colour.png'
import styles from '../../styles/common'

export const CommentDisLike = ({ comment, user, selectedVote, setSelectedVote, response, setResponse }) => {
    
    const handleDisLike = async (id) => {
        setSelectedVote('dislike')

        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append('Authorization', `Basic ${encode(`${username}:${password}`)}`)

            let formData = new FormData() 
            formData.append('id', id)
            formData.append('type', 'downvote')
            formData.append('up_vote', 0)
            formData.append('down_vote', user.data.session_id)

            const api = `${env.baseUrl}comments/commentvotes`
            const res = await fetch(api, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            }) 
            let responseJson = await res.json()
            // alert(JSON.stringify(responseJson))
            setResponse(responseJson)
        } catch (err) {
            console.log('err', err.toString()) 
        }
    }
    
    return (
        <TouchableOpacity
            onPress={() => handleDisLike(comment.id)}
            disabled={Object.keys(response).length > 0 && selectedVote === 'dislike' ? true : false}
            // disabled={selectedVote === 'dislike' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
            <Image source={
                    Object.keys(response).length > 0 && selectedVote === 'dislike' ? DownColor : Down
                // selectedVote === '' || selectedVote === 'dislike' ? Up : DownColor
                } resizeMode="stretch" style={styles.commentFooterImage} />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {response.down_vote_count == 0 ? null : Object.keys(response).length > 0 ? response.down_vote_count : comment.down_vote_count == 0 || response.down_vote_count == 0 ? null : comment.down_vote_count}
                </Text>
            </View>
        </TouchableOpacity>
    )
}