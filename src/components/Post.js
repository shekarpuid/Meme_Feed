import React, { useState, useEffect, useRef } from 'react'
import { Text, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { View, Image, TouchableOpacity, Platform } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { env } from '../env'
import { encode } from 'base-64'
import Comment from '../../assets/Comment.png'
import CommentColor from '../../assets/Comment_Colour.png'
import defaultAvatar from '../../assets/grayman.png'
import { PostLike } from './PostLike'
import { PostDisLike } from './PostDisLike'
import { PostShare } from './PostShare'
import ParentComment from './ParentComment'

import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';
import styles from '../styles/common'
import { sendPostData } from '../actions/editPostActions'
import PostReportModal from './PostReportModal'
import PostSaveModal from './PostSaveModal'

const Post = ({ post, user, start, end, data, setData, setShowPosts, dispatch, setEditing, menuId, setMenuId }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedVote, setSelectedVote] = useState('')
    const [shared, setShared] = useState('')
    const [response, setResponse] = useState({})
    const [share, setShare] = useState('')
    const profileImage = `${env.baseUrl}${post.profile_image}`
    const imageUrl = `${env.baseUrl}${post.post_image}`
    const [showReport, setShowReport] = useState(false)
    const [postSaveModal, setPostSaveModal] = useState(false)
    const [value, setValue] = useState('')
    const [textLength, setTextLength] = useState(55)
    let str = post.post_description;
    let shortenedText = str.slice(0, textLength)

    useEffect(() => {
        // console.log(post.user_id)
        // value.current = value
        
        console.log(post.id)
    }, [])

    const postHandler = async (value) => {
        console.log(value)
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
            if (value === 'hide') {
                formData.append('hide_post_id', post.id)
                formData.append('user_id', user.data.session_id)
                formData.append('from', start)
                formData.append('to', end)
            } else if (value === 'delete') {
                formData.append('post_del_id', post.id)
                formData.append('user_id', user.data.session_id)
                formData.append('from', start)
                formData.append('to', end)
            }
            console.log(JSON.stringify(formData))

            const url = `${env.baseUrl}posts/postlist` // get post posts api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()

            const filterData = data.filter(item => item.id !== post.id)
            setData(filterData)
            // alert(JSON.stringify(data))
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    // Render description
    function renderItemContent(post) {
        const HASHTAG_FORMATTER = string => {
            // console.log(string.split(/((?:^|\s)(?:#[a-z\d-]+)|(?:^|\s)(?:@[a-z\d-]+))/gi))
            return string.split(/((?:^|\s)(?:#[a-z\d-]+)|(?:^|\s)(?:@[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
                if (v.includes('#')) {
                    return <TouchableOpacity onPress={() => console.log('Hashtag pressed!')}>
                        <Text key={i} style={{ color: '#00639c', fontWeight: 'bold' }}>{v}</Text>
                    </TouchableOpacity>
                } else if (v.includes('@')) {
                    return <TouchableOpacity onPress={() => console.log('At the rate pressed!')}>
                        <Text key={i} style={{ color: '#00639c', fontWeight: 'bold' }}>{v}</Text>
                    </TouchableOpacity>
                } else {
                    return <Text key={i}>{v}</Text>
                }
            })
        }

        return (
            <View style={{ padding: 14, backgroundColor: '#ffffff' }}>
                {str.length > 55 ?
                    <>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'stretch' }}>
                            {HASHTAG_FORMATTER(shortenedText)}
                        </View>
                        {shortenedText.length === 55 ?
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setTextLength(str.length)}>
                                    <Text style={{ fontSize: 13, color: '#00639c', color: '#808080' }}>...See More</Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setTextLength(55)}>
                                    <Text style={{ fontSize: 13, color: '#00639c', color: '#808080' }}>...See Less</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        {HASHTAG_FORMATTER(str)}
                    </View>
                }
            </View>
        )
    }

    // Post footer
    function renderFooterContent(post) {
        return (
            <View style={{ height: 70, backgroundColor: '#ffffff', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', borderTopWidth: 0.8, borderBottomWidth: 0.8 }}>
                <PostLike post={post} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} response={response} setResponse={setResponse} />
                <PostDisLike post={post} user={user} selectedVote={selectedVote} setSelectedVote={setSelectedVote} response={response} setResponse={setResponse} />
                <TouchableOpacity
                    onPress={() => setIsVisible(true)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={
                            share !== '' && share === 'comment'
                                ? CommentColor
                                : Comment
                        }
                        resizeMode="stretch"
                        style={{ width: 30, height: 30 }}
                    />
                    <View>
                        <Text style={{ marginLeft: 2 }}>{post.comment_count !== null || post.comment_count !== undefined ? post.comment_count : null}</Text>
                    </View>
                </TouchableOpacity>
                <PostShare post={post} user={user} shared={shared} setShared={setShared} />
            </View>
        )
    }

    const editPost = () => {
        setShowPosts(true)
        setEditing(true)
        dispatch(sendPostData(post))
    }

    function timesAgo(date) {
        // console.log(date) // 2021-02-17 13:17:30
        let strDate = date
        let dateFormat = strDate.split(' ')
        let dateStr = dateFormat[0].split('-').join('/')
        let timeStr = dateFormat[1]
        let formatedDate = dateStr + " " + timeStr
        let datum = Date.parse(formatedDate)
        // let dateDatum =  datum/1000
        // console.log(dateDatum)
        const NOW = new Date()
        const times = [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]]

        let diff = Math.round((NOW - datum) / 1000)
        for (let t = 0; t < times.length; t++) {
            if (diff < times[t][1]) {
                if (t == 0) {
                    return "Just now"
                } else {
                    diff = Math.round(diff / times[t - 1][1])
                    return diff + " " + times[t - 1][0] + (diff == 1 ? " ago" : "s ago")
                }
            }
        }
    }

    return (
        <View style={{ width: '100%' }}>
            {/* Post header */}
            <View style={{ height: 70, flexDirection: 'row', paddingLeft: 2, paddingRight: 2, backgroundColor: '#ffffff' }}>
                <View style={{ flex: 0.3, paddingLeft: 4, justifyContent: 'center' }}>
                    <Thumbnail
                        source={post.profile_image.length > 0 ? { uri: profileImage } : post.profile_image === null || post.profile_image === undefined ? defaultAvatar : defaultAvatar}
                    />
                    {/* 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70', */}

                </View>

                <View style={{ flex: 0.7, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>{post.name}</Text>
                    <Text style={{ fontSize: 12, color: '#808080' }}>{post.handle_name}</Text>
                </View>
                <View style={{ flex: 0.6, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
                    {/* <Ionicon name="home" /> */}
                    <View style={{ alignSelf: 'flex-end', paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => setMenuId(post.id)} style={{ padding: 5, marginRight: -5 }}>
                            <Ionicon name="ellipsis-horizontal-sharp" size={18} style={{ alignSelf: 'flex-end' }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: '#808080' }}>
                            {timesAgo(post.cdate)}
                        </Text>
                    </View>

                </View>
            </View>

            {/* Post image */}
            <View style={{ height: 250 }}>
                <Image
                    source={{ uri: imageUrl }}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            {/* Post content */}
            {renderItemContent(post)}

            {/* Post footer */}
            {renderFooterContent(post)}


            {/* more menu */}
            {menuId === post.id ?
                <View style={styles.moreMenuWrap}>
                    <View style={styles.triangle}></View>
                    <View style={styles.triangle2}></View>
                    {post.user_id === user.data.session_id ?
                        <TouchableOpacity onPress={() => {
                            setMenuId(0)
                            editPost()
                        }} style={styles.postMenuOption}>
                            <Ionicon name={Platform.OS === 'ios' ? 'ios-create-outline' : 'md-create-outline'} size={20} color='#333' />
                            <Text style={styles.postMenuLink}>Edit Post</Text>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity onPress={() => {
                        setMenuId(0)
                        setShowReport(true)
                    }} style={styles.postMenuOption}>
                        <Ionicon name={Platform.OS === 'ios' ? 'ios-document-text-outline' : 'md-document-text-outline'} size={20} color='#333' />
                        <Text style={styles.postMenuLink}>Report Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setMenuId(0)
                        setPostSaveModal(true)
                    }} style={styles.postMenuOption}>
                        <Ionicon name={Platform.OS === 'ios' ? 'ios-save-outline' : 'md-save-outline'} size={20} color='#333' />
                        <Text style={styles.postMenuLink}>Save Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => {
                        setMenuId(0)
                        postHandler('hide')
                    }} style={styles.postMenuOption}>
                        <Ionicon name={Platform.OS === 'ios' ? 'ios-eye-off-outline' : 'md-eye-off-outline'} size={20} color='#333' />
                        <Text style={styles.postMenuLink}>Hide Post</Text>
                    </TouchableOpacity>
                    {post.user_id === user.data.session_id ?
                        <TouchableOpacity value='delete' onPress={() => {
                            setMenuId(0)
                            postHandler('delete')
                            // setValue('delete')
                            // value.current = 'delete'
                        }} style={styles.postMenuOption}>
                            <Ionicon name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash-outline'} size={20} color='#333' />
                            <Text style={styles.postMenuLink}>Delete</Text>
                        </TouchableOpacity> : null
                    }
                </View> : null}

            <ParentComment isVisible={isVisible} setIsVisible={setIsVisible} post={post} user={user} />

            <PostReportModal post={post} start={start} end={end} showReport={showReport} setShowReport={setShowReport} />
            <PostSaveModal postSaveModal={postSaveModal} setPostSaveModal={setPostSaveModal} post={post} user={user} start={start} end={end} />

        </View>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Post)