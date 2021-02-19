// Create Redux action types
export const GET_FUSER_INFO = 'GET_FUSER_INFO'

// Create Redux action creators that return an action
export const forgotPasswordUserInfo = (data) => ({
    type: GET_FUSER_INFO,
    payload: data
})