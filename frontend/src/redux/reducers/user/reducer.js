import * as types from './types'

const initialState = {
  account: {}
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
    default:
      return state
  }
}
export default reducer
