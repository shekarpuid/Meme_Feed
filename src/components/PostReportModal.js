import React, { useState, useEffect } from 'react'
import { Modal, View, Image, TouchableOpacity } from 'react-native'
import { Header, Right, Left, Body, Button, Title, Text, Content, Footer, Item, Input, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { env } from '../env'
import { encode } from 'base-64'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../styles/common'
import defaultAvatar from '../../assets/grayman.png'

const PostReplyModal = (props) => {
    const { user, post, start, end, showReport, setShowReport } = props
    const StatusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'light-content'
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)
    const [avatarSource, setAvatarSource] = useState('')
    const profileImage = `${env.baseUrl}${post.profile_image}`
    const imageUrl = `${env.baseUrl}${post.post_image}`
    const [disable, setDisable] = useState(true)

    useEffect(() => {
        setHeight(45)
        // alert(JSON.stringify(post))
    }, [])

    const submitHandler = async () => {
        let data = {
            from: start - 10,
            to: end - 10,
            user_id: user.data.session_id,
            post_id: post.id,
            report_text: value,
        }
        // console.log(JSON.stringify(data))
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
            formData.append('from', data.from)
            formData.append('to', data.to)
            formData.append('user_id', data.user_id)
            formData.append('post_id', data.post_id)
            formData.append('report_text', data.report_text)
            
            // console.log("formData: " + JSON.stringify(formData))
            const url = `${env.baseUrl}posts/postlist` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // console.log(JSON.stringify(res))
            alert(res.msg)  // "Successfully reported on comment!!"
            setValue('')
            setHeight(45)
            setShowReport(false)
            setDisable(true)
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
            <Modal
                animationType="slide"
                // transparent={true}
                visible={showReport}
                onRequestClose={() => {
                    setShowReport(false)
                }}>
                <Header style={{ backgroundColor: '#00639c' }} androidStatusBarColor="#00639c" iosBarStyle={StatusBarStyle}>
                    <Left style={{ flex: 0.5 }}>
                        <Button
                            transparent
                            onPress={() => setShowReport(false)}>
                            <Ionicon name="arrow-back-outline" color="#fff" style={styles.fs25} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontWeight: 'bold', alignSelf: 'center', marginLeft: -40 }}>Report Comment</Title>
                    </Body>
                    <Right style={{ flex: 0.3 }}>
                        <Button
                            transparent
                            onPress={() => setShowReport(false)}>
                            <Ionicon name="close" color="#fff" style={styles.fs25} />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/* post */}
                    <View style={{ flex: 1, flexDirection: 'row',marginLeft: 10,marginTop: 10 }}>
                        <Thumbnail
                            source={post.profile_image.length > 0 ? { uri: profileImage } : post.profile_image === null || post.profile_image === undefined ? defaultAvatar : defaultAvatar}
                        />
                        <View style={{ padding: 10, backgroundColor: '#f7f7f7', borderRadius: 5, width: '81%' }}>

                            {/* post header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>{post.name}</Text>
                                <Text style={{ fontSize: 12, color: '#808080' }}>
                                    {post.cdate_date}
                                </Text>
                            </View>
                            <Text style={{ color: '#039bd4', fontSize: 13 }}>{post.handle_name}</Text>

                            {/* post image */}
                            {post.post_image === null || post.post_image === '' ? null :
                            <View style={{ height: 180, marginTop: 10 }}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    resizeMode="stretch"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>}

                            {/* post description */}
                            <Text style={{ fontSize: 14, paddingTop: 10 }}>{post.post_description}</Text>
                        </View>
                    </View>

                </Content>

                <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 5, height: height, maxHeight: 120 }}>
                    <Item rounded style={styles.commentInput} style={[styles.footerItem, { height: height }]}>
                        {/* <Ionicon active name='camera' style={[styles.fs20, styles.darkGreyColor]} onPress={() => handleImageUpload()} /> */}
                        <Input placeholder='Report here..'
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
                        <TouchableOpacity disabled={disable} onPress={submitHandler}>
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
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleCommentId: setCommentId,
        // handleFetchChildComments: fetchChildComments,
        // handleFetchComments: fetchComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostReplyModal)