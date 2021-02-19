import React from 'react' 
import CommentsProvider from './CommentsContext' 
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
// import { Comment } from './Comment'
// import { CommentDisLike } from './CommentDisLike'
// import { CommentLike } from './CommentLike'
// import { CommentShare } from './CommentShare'

// This component updates with data from context
const CommentsIndex = ({post}) => {
    return (
        <CommentsProvider>
            <CommentsList post={post} />
            {/* <Comment post={post} />
            <CommentLike />
            <CommentDisLike />
            <CommentShare /> */}
            <CommentForm post={post} />
        </CommentsProvider>
    )
}

export default CommentsIndex