import React, { createContext, useState } from "react"
import { connect } from "react-redux"

export const CommentsContext = createContext()

// This context provider is passed to any component requiring the context
const CommentsProvider = ({ children, user, loading, comments, hasErrors }) => {
    const [newCommentsList, setNewCommentsList] = useState([])

    return (
        <CommentsContext.Provider
            value={{
                user,
                loading, comments, hasErrors, 
                newCommentsList, setNewCommentsList
            }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.comments.loading,
    comments: state.comments.comments,
    hasErrors: state.comments.hasErrors
})
export default connect(mapStateToProps)(CommentsProvider)