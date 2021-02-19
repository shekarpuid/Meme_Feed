import React, { useState } from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { encode } from 'base-64'
import { env } from '../env'
import Down from '../../assets/Down_Arrow.png' 
import DownColor from '../../assets/Down_Arrow_Colour.png' 

export const PostDisLike = ({ post, user, selectedVote, setSelectedVote, response, setResponse }) => {

    const handleDisLike = async (id) => {
        setSelectedVote('dislike')
        let likeData = {
            id: id,
            type: 'downvote',
            up_vote: 0,
            down_vote: user.data.session_id
        }

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

            console.log("Down vote formData: " + JSON.stringify(formData))

            const api = `${env.baseUrl}posts/votes`
            const res = await fetch(api, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            let responseJson = await res.json()
            setResponse(responseJson)
            // alert(JSON.stringify(responseJson))
        } catch (err) {
            console.log('err', err.toString()) 
        }
    }
    return (
        <TouchableOpacity
            onPress={() => handleDisLike(post.id)} 
            disabled={Object.keys(response).length > 0 && selectedVote === 'dislike' ? true : false}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Object.keys(response).length > 0 && selectedVote === 'dislike' ? DownColor : Down}
                resizeMode="stretch"
                style={{ width: 30, height: 30 }}
            />
            <View>
                <Text style={{ marginLeft: 2 }}>
                    {/* {Object.keys(response).length > 0 ? response.downvote_count : post.down_vote_count == '0' ? null : post.down_vote_count} */}
                    {post.down_vote_count == '0' ? null : Object.keys(response).length === 0 ? post.down_vote_count : Object.keys(response).length > 0 && response.down_vote_count == 0 ? null : Object.keys(response).length > 0 && response.down_vote_count > 0 ? response.down_vote_count : post.down_vote_count}
                </Text>
            </View>
        </TouchableOpacity>
    )
}