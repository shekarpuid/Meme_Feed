import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChildComment } from './ChildComment'
import { fetchChildComments } from '../../actions/childCommentsActions'
import { env } from '../../env'
import { encode } from 'base-64'

const ChildCommentsList = (props) => {
    const { comment, user, loading, hasErrors, handleFetchChildComments,  showReply, post } = props
    const commentId = comment.id
    const [childComments, setChildComments] = useState([])

    useEffect(() => {
        // handleFetchChildComments(commentId)

        fetchComments()
        // alert("Child Comments: " + childComments.length)
    }, [commentId, showReply])

    const fetchComments = useCallback(async () => {
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
            formData.append('parent_id', commentId)
            formData.append('user_id', user.data.session_id)
            
            const url = `${env.baseUrl}comments/get_child_comment_list` // get child comments api
            const response = await fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
            const data = await response.json()
            setChildComments(data)
            // console.log("Child Comments List: ", JSON.stringify(data))

            // dispatch(getChildCommentsSuccess(data))
        } catch (error) {
            // dispatch(getChildCommentsFailure())
            // alert("Child comments list: " + error)
            console.error(error)
        }
    }, [commentId])



    // const childComments = [
    //     {id: 1, title: "Child Comment", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'},
    //     // {id: 2, title: "Child Comment 2", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'}
    // ]
    const renderChildComments = () => {
        if (hasErrors) return <Text style={styles.error}>Unable to display comments.</Text>
        if(childComments.status === 0) return null
        return childComments.map(childComment => <ChildComment key={childComment.id} childComment={childComment} user={user} post={post} comment={comment} setChildComments={setChildComments} />)
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 20, paddingTop: 0 }}>
            {/* {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center', height: 25, width: 25 }} /> : null} */}
            {renderChildComments()}
        </View>
    )
}

// const mapStateToProps = (state) => ({
//     loading: state.comments.loading,
//     comments: state.comments.comments,
//     hasErrors: state.comments.hasErrors
// })
// export default connect(mapStateToProps)(ChildCommentsList)

function mapStateToProps(state) {
    return {
        // childComments: state.childComments.childComments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleIncrease: increaseCount,
        // handleDecrease: decreaseCount,
        // handleReset: resetCount,
        handleFetchChildComments: fetchChildComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildCommentsList)