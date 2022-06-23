import * as types from './types'

const initialState = {
    activePage: '',
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ACTIVE_URL: {
            return {
                ...state,
                activePage: action.payload
            }
        }
        default:
            return state
    }
}
export default reducer
