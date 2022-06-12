import * as types from './types'

const initialState = {
  account: {},
  listUserOwner: {
    users: [],
    loading: false,
  }
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNT_INFO :{
      console.log(action.payload)
      return {
        ...state,
        account: action.payload
      }
    }
    case types.RESET_ACCOUNT_INFO :{
      return {
        ...state,
        account: {}
      }
    }
    case types.GET_USER_OWNER :{
      return {
        ...state,
        listUserOwner: {
          users: [],
          loading: true
        }
      }
    }
    case types.GET_USER_OWNER_SUCCESS: {
      console.log('payload', action.payload);
      return {
        ...state,
        listUserOwner: {
          users: action.payload,
          loading: false
        }
      }
    }
    case types.GET_USER_OWNER_FAIL: {
      return {
        ...state,
        listUserOwner: {
          loading: false
        }
      }
    }
    default:
      return state
  }
}
export default reducer
