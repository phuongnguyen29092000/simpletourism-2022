import * as types from './types'

const initialState = {
  listTourDomestic: [],
  listTourInternational: [],
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
    case types.GET_TOUR_INTERNATIONAL: {
      return {
        ...state,
      }
    }
    case types.GET_TOUR_INTERNATIONAL_FAIL: {
      return {
        ...state,
      }
    }
    case types.GET_TOUR_INTERNATIONAL_SUCCESS: {
      return {
        ...state,
        listTourInternational: action.payload,
      }
    }
    default:
      return state
  }
}
export default reducer
