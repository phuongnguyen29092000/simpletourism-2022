import * as types from './types'

const initialState = {
  listTour: [],
  totalTour: 0,
  loading: false,
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOUR: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.GET_TOUR_SUCCESS: {
      return {
        ...state,
        listTour: action.payload.data,
        totalTour: action.payload.totalTour,
        loading: false,
      }
    }
    default:
      return state
    }
}
export default reducer
