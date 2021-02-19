import React, { useState, useEffect } from 'react'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, RefreshControl, BackHandler, ScrollView, Platform } from 'react-native'
import { Notification } from '../../tabs/index'
import { Search } from './Search'
import Profile from './Profile'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import Faicon from 'react-native-vector-icons/dist/FontAwesome'
import styles from '../../styles/common'
import FooterTabs from './FooterTabs'

import Headers from './Headers'
import Home from './Home'
import CreatePost from '../../components/CreatePost/CreatePost'
import { fetchPosts } from '../../actions/postsActions'
import { loadPostTypes } from '../../actions/postTypes'
import { createNewPost } from '../../actions/createPost'
import DoubleTapToClose from '../../components/DoubleTapToClose'
import HashTags from './HashTags'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}
const Main = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const {
        loading, posts, hasErrors, postTypes, user,
        handleLoadPostTypes, handleFetchPosts, handleCreateNewPost,
        navigation, route
    } = props
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [showPosts, setShowPosts] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        handleFetchPosts()
        handleLoadPostTypes()
        return () => {
            // alert("Unmount")
            BackHandler.removeEventListener()
        }
    }, [])

    useEffect(() => {
        const getData = async () => {
            const res = await AsyncStorage.getItem('userData')
            const jsonValue = JSON.parse(res)
            setProfile(jsonValue)
            if (jsonValue === null) {
                props.navigation.navigate('BasicLogin')
            }
        }
        getData()
    }, [selectedTabIndex, profile])

    useEffect(() => {
        const getData = async () => {
            const res = await AsyncStorage.getItem('userData')
            const jsonValue = JSON.parse(res)
            if (route.params !== undefined) {
                if (route.params.profile) {
                    setSelectedTabIndex(4)
                    getaActive(4)
                    route.params.profile = false
                }
            } else if (jsonValue === null) {
                props.navigation.navigate('BasicLogin')
            }
        }
        getData()
    }, [route.params])

    async function handlePostCreate(info) {
        info.userId = await user.data.session_id
        // alert(info.userId)
        await handleCreateNewPost(info)
        // await props.createNewPost(info)
        // alert('Succesfully Created New Post')
        handleFetchPosts()
        setShowPosts(false)
        setSelectedTabIndex(0)
    }

    function renderTabs() {
        if (selectedTabIndex === 0)
            return (
                <Home
                    loading={loading}
                    posts={posts}
                    hasErrors={hasErrors}
                    onHomePostSend={(data) => handlePostCreate(data)}
                    showPosts={showPosts} setShowPosts={setShowPosts}
                    postTypes={postTypes}
                />
            )
        if (selectedTabIndex === 2) return <Search />
        if (selectedTabIndex === 3) return <Notification />
        if (selectedTabIndex === 4) return <Profile user={user} setSelectedTabIndex={setSelectedTabIndex} getaActive={getaActive} />
        return <HashTags />
    }


    function getaActive(index) {
        if (index === selectedTabIndex)
            return styles.activeIcon
        return styles.icon
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        handleFetchPosts()

        wait(1600).then(() => setRefreshing(false))
    }, [])

    // if (showPosts)
    //     return (
    //         <CreatePost
    //             onPostSend={(data) => handlePostCreate(data)}
    //             postTypes={postTypes} user={user}
    //         />
    //     )

    return (
        <>
            <Container>
                {/* <DoubleTapToClose /> */}

                {/* App header */}
                {selectedTabIndex === 0 || selectedTabIndex === 2 || selectedTabIndex === 3 || selectedTabIndex === 4 ? <Headers selectedTabIndex={selectedTabIndex} setShowPosts={setShowPosts} showPosts={showPosts} /> : null}

                {/* App tab */}
                {/* <Content refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {renderTabs()}
                </Content> */}

                <View style={{ flex: 1 }} >
                    {renderTabs()}
                    {Platform.OS === 'android' &&
                    <Content>
                        <View></View>
                    </Content>}
                </View>

                <FooterTabs setSelectedTabIndex={setSelectedTabIndex} getaActive={getaActive} />

                {/* <Footer style={styles.common}>
                    <FooterTab style={styles.common}>
                        <Button onPress={() => setSelectedTabIndex(0)}>
                            <Ionicon name="home" style={getaActive(0)} />
                        </Button>
                        <Button onPress={() => setSelectedTabIndex(1)}>
                            <Faicon name="hashtag" style={getaActive(1)} />
                        </Button>
                        <Button onPress={() => setSelectedTabIndex(2)}>
                            <Ionicon name="search-outline" style={getaActive(2)} />
                        </Button>
                        <Button
                            badge
                            vertical
                            onPress={() => setSelectedTabIndex(3)}>
                            <View style={{ position: 'absolute', top: 2 }}>
                                <Badge>
                                    <Text>52</Text>
                                </Badge>
                            </View>
                            <Ionicon name="notifications-outline" style={getaActive(3)} />
                        </Button>
                        <Button onPress={() => setSelectedTabIndex(4)}>
                            <Ionicon name="person-outline" style={getaActive(4)} />
                        </Button>
                    </FooterTab>
                </Footer> */}
            </Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        loading: state.posts.loading,
        posts: state.posts.posts,
        hasErrors: state.posts.hasErrors,
        createPost: state.createPost,
        postTypes: state.postTypes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleFetchPosts: fetchPosts,
        handleLoadPostTypes: loadPostTypes,
        handleCreateNewPost: createNewPost
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)