import React, { useCallback, useEffect, useState } from 'react'
import {Image, TouchableOpacity} from 'react-native'
import { encode } from 'base-64'
import { env } from '../../env'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Footer, Item, Input } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../../styles/common'
import { fetchComments } from '../../actions/commentsActions'
import { setCommentId } from '../../actions/childCommentsActions'

const CommentForm = ({ post, user, scrollToBottom, setSubmit }) => {
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)
    const [avatarSource, setAvatarSource] = useState('')
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        setHeight(45)
        // alert(JSON.stringify(user))
    }, [])

    const handleImageUpload = () => {
        const options = {
            title: 'Select Image',
            // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                setAvatarSource('')
                setDisable(true)
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                setAvatarSource('data:image/png;base64,' + response.data)
                setDisable(false)
            }
        })
    }

    const submitComment = async () => {
        let data = {
            user_id: user.data.session_id,
            post_id: post.id,
            comment_id: 0,
            comment_text: value,
            comment_image: avatarSource,
            name: user.data.name,
            handle_name: user.data.handle_name,
            profile_image: user.data.profile_image
        }
        // console.log("Data: " + JSON.stringify(data))
        try {
            const username = 'memefeed'
            const password = 'Connect12345!'
            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'multipart/form-data')
            myHeaders.append(
                'Authorization',
                `Basic ${encode(`${username}:${password}`)}`
            )

            let formData = new FormData()
            formData.append('user_id', data.user_id)
            formData.append('post_id', data.post_id)
            formData.append('parent_id', data.comment_id)
            formData.append('comment_text', data.comment_text)
            formData.append('comment_image', data.comment_image)
            formData.append('name', data.name)
            formData.append('handle_name', data.handle_name)
            formData.append('profile_image', data.profile_image)

            // alert("Form data: " + JSON.stringify(formData))

            const url = `${env.baseUrl}comments/commentList` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // console.log("Comment response: " + JSON.stringify(res))
            setValue('')
            setHeight(45)
            setAvatarSource('')
            // handleFetchComments(post.id)
            setSubmit(true)
            setDisable(true)
            scrollToBottom()
        } catch (error) {
            alert(error)
            console.error(error)
            setValue('')
            setHeight(45)
            setDisable(true)
        }
    }

    return (
        <>
        {avatarSource.length > 0 ?
            <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 10, minHeight: 120, maxHeight: 120 }}>
                {avatarSource.length > 0 ? <Image source={{ uri: avatarSource }} style={[styles.uploadAvatar]} resizeMode="stretch" /> : null}
            </Footer> : null}
            <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 5, height: height, maxHeight: 120 }}>
                <Item rounded style={styles.commentInput} style={[styles.footerItem, { height: height }]}>
                    <Ionicon active name='camera' style={[styles.fs20, styles.darkGreyColor]} onPress={() => handleImageUpload()} />
                    <Input placeholder='Comment here..'
                        multiline={true}
                        style={[styles.input, { minHeight: 45, height: height, maxHeight: 120 }]}
                        onChangeText={(value) => {
                            setValue(value)
                            if(value.length > 0 || avatarSource.length > 0){
                                setDisable(false)
                            }else{
                                setDisable(true)
                            }
                        }}
                        value={value}
                        editable={true}
                        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                        selectTextOnFocus={true}
                    // autoFocus={commentId > 0 ? true : false}
                    // defaultValue={commentId}
                    />
                    <TouchableOpacity disabled={disable} onPress={submitComment}>
                        <Ionicon active name='send' style={[styles.fs20, styles.themeColor, {opacity: disable ? 0.6 : 1}]} />
                    </TouchableOpacity>
                </Item>
            </Footer>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        storeCommentId: state.postComments.commentId,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleCommentId: setCommentId,
        handleFetchComments: fetchComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
// const mapStateToProps = (state) => ({
//     user: state.user
// })
// export default connect(mapStateToProps)(CommentForm)