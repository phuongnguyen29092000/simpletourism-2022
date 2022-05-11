import * as types from './types'

const initialState = {
  listTourDomestic: [],
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOUR_DOMESTIC: {
      return {
        ...state,
      }
    }
    case types.GET_TOUR_DOMESTIC_FAIL: {
      return {
        ...state,
      }
    }
    case types.GET_TOUR_DOMESTIC_SUCCESS: {
      return {
        ...state,
        listTourDomestic: action.payload,
      }
    }
    default:
      return state
  }
}
export default reducer
