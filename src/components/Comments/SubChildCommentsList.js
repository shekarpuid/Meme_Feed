import React, { useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChildComment } from './ChildComment'
import { fetchChildComments } from '../../actions/childCommentsActions'
import { env } from '../../env'
import { encode } from 'base-64'

const SubChildCommentsList = (props) => {
    const { childComment, user, hasErrors, handleFetchChildComments,  showReply, post } = props
    const childCommentId = childComment.id
    const [childComments, setChildComments] = useState([])

    useEffect(() => {
        // handleFetchChildComments(commentId)

        fetchComments()
        // alert("Child Comments: " + childComments.length)
        // console.log("childCommentId: " + childCommentId + " Child Comments List")
    }, [childCommentId, showReply])

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
            formData.append('parent_id', childCommentId)
            
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
    }, [childCommentId])



    // const childComments = [
    //     {id: 1, title: "Child Comment", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'},
    //     // {id: 2, title: "Child Comment 2", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'}
    // ]
    const renderChildComments = () => {
        if (hasErrors) return <Text style={styles.error}>Unable to display comments.</Text>
        if(childComments.status === 0) return null
        return childComments.map(childComment => <ChildComment key={childComment.id} childComment={childComment} user={user} post={post} />)
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 0, paddingTop: 0, borderLeftColor: '#333', borderLeftWidth: 0, borderStyle: 'solid' }}>
            {/* {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center', height: 25, width: 25 }} /> : null} */}
            {renderChildComments()}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        // childComments: state.childComments.childComments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleFetchChildComments: fetchChildComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubChildCommentsList)