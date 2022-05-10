import * as types from './types'

const initialState = {
  listTypePlace: [],
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TYPEPLACE: {
      return {
        ...state,
      }
    }
    case types.GET_TYPEPLACE_FAIL: {
      return {
        ...state,
      }
    }
    case types.GET_TYPEPLACE_SUCCESS: {
      return {
        ...state,
        listTypePlace: action.payload,
      }
    }
    default:
      return state
  }
}
export default reducer
