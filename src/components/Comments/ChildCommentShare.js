import React, {useEffect} from 'react'
import { Text } from 'native-base'
import { View, Image, TouchableOpacity } from 'react-native'
import Share from 'react-native-share'
import { env } from '../../env'
import RNFetchBlob from 'rn-fetch-blob'
import ShareImg from '../../../assets/Share.png'
import ShareColour from '../../../assets/Share_Colour.png'
import styles from '../../styles/common'

export const ChildCommentShare = ({ childComment, user, shared, setShared }) => {
    const imageUrl = `${env.baseUrl}${childComment.comment_image}`

    useEffect(() => {
        // alert(JSON.stringify(comment))
    }, [])

    const shareContent = async() => {
        let base64Image = ''
        await RNFetchBlob.fetch('GET', imageUrl)
            .then(res => base64Image = res.base64())
            .catch(errorMessage => console.log(errorMessage))

        const shareOptions = {
            subject: 'Meme Image',
            title: "Meme Image",
            message: childComment.comment_text,
            url: `data:image/png;base64,${base64Image}`
            // 'app://memefeed'
        }
        Share.open(shareOptions)
            .then((res) => {
                alert(res)
                setShared('share')
            })
            .catch((err) => {
                err && console.log(err)
                setShared('')
            })
    }

    return (
        <TouchableOpacity
            onPress={() => shareContent()}
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, }}>
            <Image source={shared === '' ? ShareImg : ShareColour} resizeMode="stretch" style={styles.childCommentFooterImage} />
            <View>
                {/* <Text style={{ marginLeft: 2, fontSize: 12 }}>45</Text> */}
            </View>
        </TouchableOpacity>
    )
}