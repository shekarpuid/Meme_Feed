import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native'
import { Text, List, Spinner, Content, Item, Picker } from 'native-base'
import Comment from "./Comment"
import styles from '../../styles/common'
import { fetchComments } from "../../actions/commentsActions"
import { env } from "../../env"
import { encode } from 'base-64'

// This component displays name from Context
const CommentsList = ({ post, user, submit, setSubmit }) => {
    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [comments, setComments] = useState([])
    const [selected, setSelected] = useState('select')
    // const [touched, setTouched] = useState(false)

    useEffect(() => {
        fetchComments(post.id, selected)
    }, [submit])

    const fetchComments = async (id, value) => {
        setLoading(true)
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
            if (value === 'recent') {
                formData.append('postid', id)
                formData.append('most_recent', 'Y')
                formData.append('user_id', user.data.session_id)
            } else if (value === 'discussed') {
                formData.append('postid', id)
                formData.append('most_discussed', 'Y')
                formData.append('user_id', user.data.session_id)
            } else if (value === 'upvoted') {
                formData.append('postid', id)
                formData.append('most_upvoted', 'Y')
                formData.append('user_id', user.data.session_id)
            } else {
                formData.append('postid', id)
                formData.append('user_id', user.data.session_id)
            }

            const url = `${env.baseUrl}comments/commentList` // get post comments api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const data = await response.json()
            // alert(JSON.stringify(formData))
            // console.log("Comments List: " + JSON.stringify(data))
            setComments(data)
            setLoading(false)
            setSubmit(false)
        } catch (error) {
            setHasErrors(true)
            setLoading(false)
            setSubmit(false)
            alert(error)
            console.error(error)
        }
    }

    // Comment render
    const renderComments = () => {
        if (hasErrors) return <Text style={styles.error}>Unable to display comments.</Text>
        if (comments.length > 0) return comments.map(comment => <Comment key={comment.id} comment={comment} post={post} setComments={setComments} />)
        return <Text style={styles.noData}>No comments to display.</Text>
    }

    const onValueChange = value => {
        setSelected(value)
        fetchComments(post.id, value)
    }

    return (
        <Content>
            {comments.length > 0 ?
                <Item picker style={{ backgroundColor: '#ddd', paddingHorizontal: 10, width: 220, marginVertical: 20, marginLeft: 20, borderRadius: 5, borderStyle: 'solid', borderWidth: 1, borderColor: '#ddd' }}>
                    <Picker
                        mode="dropdown"
                        style={{ width: '100%' }}
                        selectedValue={selected}
                        onValueChange={(e) => onValueChange(e)}
                    >
                        <Picker.Item label="Select" value="select" />
                        <Picker.Item label="Most Recent" value="recent" />
                        <Picker.Item label="Most Discussed" value="discussed" />
                        <Picker.Item label="Most Upvoted" value="upvoted" />
                    </Picker>
                </Item> : null}

            <List>{renderComments()}</List>
            {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center' }} /> : null}
        </Content>
    )
}
const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.comments.loading,
    comments: state.comments.comments,
    hasErrors: state.comments.hasErrors
})
export default connect(mapStateToProps)(React.memo(CommentsList))