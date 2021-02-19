import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Linking, FlatList, View, Image, ScrollView } from 'react-native'
import { Text, Spinner, Button } from 'native-base'
import { connect } from 'react-redux'
import { Post } from '../../components/Post'
import CreatePost from '../../components/CreatePost/CreatePost'
import styles from '../../styles/common'
import { env } from "../../env"
import { encode } from 'base-64'

const Home = (props) => {
    const { loading, posts, hasErrors, onHomePostSend, showPosts, postTypes, user } = props

    useEffect(() => {
        // alert(JSON.stringify("Home: ", posts))
        // setData(posts)
        // getData()
        console.log("use effect")
    }, [])

    // Show loading, error, or success state
    const renderPosts = () => {
        if (hasErrors) return <Text>Unable to display memes.</Text>
        if (posts === undefined || posts.length === 0) return <Text style={styles.noData}>No memes found to display.</Text>
        return posts.map((post) => <Post key={post.id} post={post} user={user} />)
    }
    if (showPosts)
        return (
            <CreatePost
                onPostSend={(data) => onHomePostSend(data)}
                postTypes={postTypes} user={user}
            />
        )

    return (
        <>
            {/* <Button  onPress={()=>{Linking.openURL('app://memefeed')}}><Text>Click me to open Memefeed</Text></Button> */}
            {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
            {renderPosts()}

            {/* <ScrollView onMomentumScrollEnd={() => alert("End")}>
                {renderPosts()}
            </ScrollView> */}

            
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    postTypes: state.postTypes
})
export default connect(mapStateToProps)(Home)