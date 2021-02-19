import React, { useEffect, useRef, useState } from 'react'
import { Linking, FlatList, View, Image, ScrollView, RefreshControl, TouchableWithoutFeedback, Pressable } from 'react-native'
import { Text, Spinner, Button } from 'native-base'
import { connect } from 'react-redux'
import Post from '../../components/Post'
import CreatePost from '../../components/CreatePost/CreatePost'
import styles from '../../styles/common'
import { env } from "../../env"
import { encode } from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MenuProvider } from 'react-native-popup-menu'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}
const Home = (props) => {
    const { onHomePostSend, showPosts, setShowPosts, postTypes, user } = props

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    const [error, setError] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(9)
    const [refreshing, setRefreshing] = useState(false)
    const [editing, setEditing] = useState(false)
    const [menuId, setMenuId] = useState(0)
    const [newPost, setNewPost] = useState(0)

    useEffect(() => {
        fetchData()
        const res = AsyncStorage.getItem('posts')
        console.log("Log fetchData")
        // const jsonValue = JSON.parse(res)
        // alert(JSON.stringify(res))
    }, [])

    // useEffect(() => {
    //     if (newPost) {
    //         console.log("setNewPost: ", newPost)
    //         fetchData()
    //         setNewPost(false)
    //     }
    // }, [newPost])


    const renderPosts = () => {
        if (error) return <Text>Unable to display memes.</Text>
        if (data !== null && data.status === 0) return <Text style={styles.noData}>No memes found to display.</Text>
        return data.map((post) => <Post key={post.id} post={post} user={user} start={start} end={end} data={data}
            setData={setData} setShowPosts={setShowPosts} setEditing={setEditing} menuId={menuId} setMenuId={setMenuId} />)
    }

    const fetchData = () => {
        setIsLoading(true)
        const username = 'memefeed'
        const password = 'Connect12345!'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append(
            'Authorization',
            `Basic ${encode(`${username}:${password}`)}`
        )
        let formData = new FormData()
        formData.append('from', start)
        formData.append('to', end)
        formData.append('user_id', user.data.session_id)
        console.log("fetch more formdata: ", JSON.stringify(formData))

        const api = `${env.baseUrl}posts/postlist`
        fetch(api, {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(resJson => {
                // alert('hi' + JSON.stringify(resJson))
                // console.log('start', start, 'end', end)
                if (resJson.status === 0) {
                    // console.log(JSON.stringify(resJson))
                    setData(data)
                    setIsLoading(false)
                    setLoading(false)
                    setNoData(true)
                    setNewPost(false)
                } else {
                    setData(data.concat(resJson))
                    // const jsonValue = JSON.stringify(resJson)
                    // AsyncStorage.setItem('posts', JSON.stringify(jsonValue))

                    // console.log(JSON.stringify(jsonValue))
                    setStart(start + 10)
                    setEnd(end + 10)
                    setPage(page + 1)
                    setIsLoading(false)
                    setLoading(false)
                    setNewPost(false)
                }
            })
            .catch(err => {
                setIsLoading(false)
                setError(true)
                setLoading(false)
                alert(err)
                setNewPost(false)
            })
    }
    const postsScrollViewRef = useRef()

    const newPostFetch = () => {
        postsScrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
        })
        setLoading(true)
        const username = 'memefeed'
        const password = 'Connect12345!'
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'multipart/form-data')
        myHeaders.append(
            'Authorization',
            `Basic ${encode(`${username}:${password}`)}`
        )
        let formData = new FormData()
        formData.append('from', 0)
        formData.append('to', 9)
        formData.append('user_id', user.data.session_id)
        // console.log(JSON.stringify(formData))

        const api = `${env.baseUrl}posts/postlist`
        fetch(api, {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(resJson => {
                // alert('hi' + JSON.stringify(resJson))
                // console.log('start', start, 'end', end)
                if (resJson.status === 0) {
                    // console.log(JSON.stringify(resJson))
                    setData(data)
                    setIsLoading(false)
                    setLoading(false)
                    setNoData(true)
                    setNewPost(false)
                } else {
                    setData(resJson)
                    // const jsonValue = JSON.stringify(resJson)
                    // AsyncStorage.setItem('posts', JSON.stringify(jsonValue))

                    console.log(JSON.stringify("New Post Data: ", resJson))
                    setStart(10)
                    setEnd(19)
                    setPage(page + 1)
                    setIsLoading(false)
                    setLoading(false)
                    setNewPost(false)
                }
            })
            .catch(err => {
                setIsLoading(false)
                setError(true)
                setLoading(false)
                alert(err)
                setNewPost(false)
            })

        // alert("newPostFetch")
    }

    const handleLoadMore = () => {
        // alert("Load more")
        setIsLoading(true)
        fetchData()
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 70; //Distance from the bottom you want it to trigger.
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setLoading(true)
        fetchData()

        wait(1600).then(() => setRefreshing(false))
    }, [])




    return (
        <>
            {showPosts ?
                <CreatePost
                    onPostSend={(data) => onHomePostSend(data)} setStart={setStart} setEnd={setEnd}
                    postTypes={postTypes} user={user} fetchData={fetchData} editing={editing} setEditing={setEditing}
                    setNewPost={setNewPost} newPostFetch={newPostFetch}
                /> :
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            if (!noData) {
                                handleLoadMore()
                            }
                        }
                    }}
                    scrollEventThrottle={1}
                    // onPress={() => setMenuId(0)}
                    ref={postsScrollViewRef}
                // onContentSizeChange={() => postsScrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    <>
                        {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
                        <Pressable onPress={() => {
                            setMenuId(0)
                        }}>
                            <View>
                                {renderPosts()}
                            </View>
                        </Pressable>
                        {isLoading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
                        {noData && data.length > 0 ? <Text style={{ marginVertical: 25, alignSelf: 'center', color: 'red' }}>No more memes found.</Text> : null}
                    </>
                </ScrollView>
            }


            {/* <FlatList
                // ref={scrollViewRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={true}
                ListFooterComponent={() => renderFooter()}
                onEndReached={() => handleLoadMore()}
                onEndReachedThreshold={0}
                // onMomentumScrollEnd={() => {
                //     // scrollViewRef.current.scrollToEnd({ animated: true })
                //     handleLoadMore()
                // }}
            /> */}
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    postTypes: state.postTypes
})
export default connect(mapStateToProps)(Home)