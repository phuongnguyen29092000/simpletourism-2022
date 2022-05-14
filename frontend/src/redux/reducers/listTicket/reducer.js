import * as types from './types'

const initialState = {
  list_ticket: [],
  loading: false,
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TICKET: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_TICKET_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.GET_TICKET_SUCCESS: {
      return {
        ...state,
        ////
        list_ticket: action.payload,
        loading: false,
      }
    }
    case types.DELETE_TICKET: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.DELETE_TICKET_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.DELETE_TICKET_SUCCESS: {
      return {
        ...state,
        //xử lí xóa
        list_ticket: [
          ...state.list_ticket,
          action.payload
        ],
        loading: false,
      }
    }
    default:
      return state
  }
}
export default reducer
