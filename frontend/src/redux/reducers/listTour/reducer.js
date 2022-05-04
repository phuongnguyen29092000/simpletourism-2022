import * as types from './types'

const initialState = {
  listTour: [],
  totalTour: 0,
  loading: false,
}
export const reducer = (state = initialState, action) => {
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
    case types.ADD_TOUR: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.ADD_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.ADD_TOUR_SUCCESS: {
      return {
        ...state,
        listTour: [
          ...state.listTour,
          action.payload
        ],
        totalTour: state.totalTour + 1,
        loading: false,
      }
    }
    case types.DELETE_TOUR: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.DELETE_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.DELETE_TOUR_SUCCESS: {
      return {
        ...state,
        //xử lí xóa
        listTour: [
          ...state.listTour,
          action.payload
        ],
        totalTour: state.totalTour-1,
        loading: false,
      }
    }
    default:
      return state
  }
}
export default reducer
