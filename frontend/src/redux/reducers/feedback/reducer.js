import * as types from './types'

const initialState = {
    listFeedback: [],
    loading: false,
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FEEDBACK: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.GET_FEEDBACK_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.GET_FEEDBACK_SUCCESS: {
            return {
                ...state,
                //xem lai
                listFeedback: action.payload.data,
                loading: false,
            }
        }
        case types.CREATE_FEEDBACK: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.CREATE_FEEDBACK_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.CREATE_FEEDBACK_SUCCESS: {
            let listTemp = [...state?.listFeedback]
            return {
                ...state,
                //xem lai
                listFeedback: listTemp.push(action.payload),
                loading: false,
            }
        }
        case types.DELETE_FEEDBACK: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.DELETE_FEEDBACK_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.DELETE_FEEDBACK_SUCCESS: {
            let listTemp = [...state?.listFeedback]
            return {
                ...state,
                //xem lai
                listFeedback: listTemp?.filter((fb) => fb._id !== action.payload),
                loading: false,
            }
        }
        case types.UPDATE_FEEDBACK: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.UPDATE_FEEDBACK_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.UPDATE_FEEDBACK_SUCCESS: {
            let listTemp = [...state?.listFeedback]
            let indexUpdate = listTemp?.find((fb) => fb._id === action.payload._id)
            listTemp = listTemp?.splice(indexUpdate, 1, action.payload)
            return {
                ...state,
                //xem lai
                listFeedback: [...listTemp],
                loading: false,
            }
        }
        default:
            return state
    }
}
export default reducer
