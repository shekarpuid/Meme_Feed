import React, { useEffect, useState } from 'react'
import { encode } from 'base-64'
import { env } from '../env'
import { Footer, Item, Input } from 'native-base'
import Ionicon from 'react-native-vector-icons/dist/Ionicons'
import styles from '../styles/common'
import { connect } from 'react-redux'
import { fetchComments } from '../actions/commentsActions'

const CommentForm = ({ dispatch, user, comments, post }) => {
    const [value, setValue] = useState('')
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(45)
    }, [])

    const submitComment = async () => {
        let data = {
            user_id: user.data.session_id,
            post_id: post.id,
            comment_id: 0,
            comment_text: value,
            comment_image: '',
            name: user.data.name,
            handle_name: user.data.handle_name,
            profile_image: user.data.profile_image
        }
        // console.log(JSON.stringify(data))
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

            const url = `${env.baseUrl}comments/commentList` // --> add comment api for post
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const res = await response.json()
            // alert(JSON.stringify(res))
            setValue('')
            setHeight(45)
            const obj = data[0]
            // setCommentsList([obj, ...commentsList])
            dispatch(fetchComments(post.id))
        } catch (error) {
            alert(error)
            console.error('Error: ' + error)
            setValue('')
            setHeight(45)
        }
    }
    return (
        <Footer style={{ backgroundColor: '#fff', paddingHorizontal: 5, height: height, maxHeight: 120 }}>
            <Item rounded style={styles.commentInput} style={[styles.footerItem, { height: height }]}>
                <Input placeholder='Comment here..'
                    multiline={true}
                    style={[styles.input, { minHeight: 45 ,height: height, maxHeight: 120 }]}
                    onChangeText={(value) => setValue(value)}
                    value={value}
                    editable={true}
                    onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
                />
                <Ionicon active name='send' style={[styles.fs20, styles.themeColor]} onPress={submitComment} />
            </Item>
        </Footer>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    comments: state.comments.comments
})
export default connect(mapStateToProps)(CommentForm)