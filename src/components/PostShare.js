import React from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import { env } from '../env'
import RNFetchBlob from 'rn-fetch-blob'
import ShareImg from '../../assets/Share.png'
import ShareColour from '../../assets/Share_Colour.png'
import Share from 'react-native-share'

export const PostShare = ({ post, user, shared, setShared }) => {
    // const imageUrl = `${env.baseUrl}static/images/${post.post_image}`
    const imageUrl = `${env.baseUrl}${post.post_image}`

    const shareContent = async () => {        
        let base64Image = ''
        await RNFetchBlob.fetch('GET', imageUrl)
            .then(res => base64Image = res.base64())
            .catch(errorMessage => console.log(errorMessage))

        // const imgSplt = post.post_image.split('.')
        // let url = ''
        // if (imgSplt[1] === 'jpg' || imgSplt[1] === 'jpeg') {
        //     url = `data:image/jpeg;base64,${base64Image}`
        // } else if (imgSplt[1] === 'png') {
        //     url = `data:image/png;base64,${base64Image}`
        // } else {
        //     url = ''
        // }

        const shareOptions = {
            subject: 'Meme Image',
            title: "Meme Image",
            message: post.post_description,
            url: `data:image/png;base64,${base64Image}` 
            // 'app://memefeed'
        }
        Share.open(shareOptions)
            .then((res) => {
                console.log(res)
                setShared('share')
            })
            .catch((err) => {
                err && console.log(err)
                setShared('')
            })
    }

    return (
        <TouchableOpacity
            onPress={() => shareContent(post)}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={
                    shared === 'share' ? ShareColour : ShareImg
                }
                resizeMode="stretch"
                style={{ width: 30, height: 30 }}
            />
            <View>
                {/* <Text style={{ marginLeft: 2 }}>36</Text> */}
            </View>
        </TouchableOpacity>
    )
}