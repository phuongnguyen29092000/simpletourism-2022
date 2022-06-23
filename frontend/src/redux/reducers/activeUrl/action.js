import * as types from './types'

const setActiveUrl = (page) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_ACTIVE_URL,
            payload: page
        })
    }
}

export {
    setActiveUrl
}