import React, { useState, useEffect } from 'react'
import { Modal, View, Image, TouchableOpacity } from 'react-native'
import { Header, Right, Left, Body, Button, Title, Text, Content, Footer, Item, Input, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchChildComments, setCommentId } from '../../actions/childCommentsActions'
import { env } from '../../env'
import { encode } from 'base-64'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import ImagePicker from 'react-native-image-picker'
import styles from '../../styles/common'
import defaultAvatar from '../../../assets/grayman.png'

import { fetchComments } from "../../actions/commentsActions"

const SubCommentReplyModal = (props) => {
    const { showReply, setShowReply, childComment, user, post } = props
    const StatusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'light-content'
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)
    const [avatarSource, setAvatarSource] = useState('')
    const profileImage = `${env.baseUrl}${childComment.profile_image}`
    const imageUrl = `${env.baseUrl}${childComment.comment_image}`
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        setHeight(45)
        // console.log(JSON.stringify(childComment.comment_image))
    }, [])

    const submitComment = async () => {
        let data = {
            user_id: user.data.session_id,
            post_id: post.id,
            comment_id: childComment.id,
            comment_text: value,
            comment_image: avatarSource,
            name: user.data.name,
            handle_name: user.data.handle_name,
            profile_image: user.data.profile_image
        }
        // console.log(JSON.stringify("Form data: " + data))
        // dispatch(addComment(data))
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

            // console.log("formData: " + JSON.stringify(formData))
            const url = `${env.baseUrl}comments/commentList` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // alert(JSON.stringify(res))
            setValue('')
            setAvatarSource('')
            setHeight(45)
            // handleFetchChildComments(childComment.id)
            // handleFetchComments(post.id)
            setShowReply(false)
            setDisable(true)
        } catch (error) {
            alert(error)
            console.error(error)
            setValue('')
            setHeight(45)
            setAvatarSource('')
            setDisable(true)
        }
    }

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

    return (
        <>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={showReply}
                onRequestClose={() => {
                    setShowReply(false)
                }}>
                <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                    <Left style={{ flex: 0.5 }}>
                        <Button
                            transparent
                            onPress={() => setShowReply(false)}>
                            <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Sub Comment Reply</Title>
                    </Body>
                    <Right style={{ flex: 0.3 }}>
                        <Button
                            transparent
                            onPress={() => setShowReply(false)}>
                            <Ionicon name="close" color="#fff" style={styles.fs25} />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/* Comment */}
                    <View style={{ flex: 1, flexDirection: 'row',marginLeft: 10,marginTop: 10 }}>
                        <Thumbnail
                            source={childComment.profile_image.length > 0 ? { uri: profileImage } : childComment.profile_image === null || childComment.profile_image === undefined ? defaultAvatar : defaultAvatar}
                        />
                        <View style={{ padding: 10, backgroundColor: '#f7f7f7', borderRadius: 5, width: '81%' }}>

                            {/* Comment header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>{childComment.name}</Text>
                                <Text style={{ fontSize: 12, color: '#808080' }}>
                                    {childComment.cdate_date}
                                </Text>
                            </View>
                            <Text style={{ color: '#039bd4', fontSize: 13 }}>{childComment.handle_name}</Text>

                            {/* Comment image */}
                            {childComment.comment_image === null || childComment.comment_image === '' ? null :
                            <View style={{ height: 180 }}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    resizeMode="stretch"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>}

                            {/* Comment description */}
                            <Text style={{ fontSize: 14 }}>{childComment.comment_text}</Text>
                        </View>
                    </View>

                </Content>

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
                            // onChangeText={(value) => setValue(value)}
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
                        // autoFocus="true"
                        />
                        <TouchableOpacity disabled={disable} onPress={submitComment}>
                            <Ionicon active name='send' style={[styles.fs20, styles.themeColor, {opacity: disable ? 0.6 : 1}]} />
                        </TouchableOpacity>
                        {/* <Ionicon active name='send' style={[styles.fs20, styles.themeColor]} onPress={() => submitComment()} /> */}
                    </Item>
                </Footer>

            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        commentId: state.postComments.commentId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleCommentId: setCommentId,
        handleFetchChildComments: fetchChildComments,
        handleFetchComments: fetchComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCommentReplyModal)