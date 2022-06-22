import * as types from './types'

const initialState = {
  list_ticket: [],
  listTicketPerTour: [],
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
    case types.GET_TICKET_PER_TOUR: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_TICKET_PER_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.GET_TICKET_PER_TOUR_SUCCESS: {
      return {
        ...state,
        ////
        listTicketPerTour: action.payload,
        list_ticket: [],
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
    case types.SET_COMPLETE_TICKET: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.SET_COMPLETE_TICKET_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case types.SET_COMPLETE_TICKET_SUCCESS: {
      return {
        ...state,
        //xử lí xóa
        listTicketPerTour: [],
        loading: false,
      }
    }
    case types.RESET_TICKET: {
      return {
        ...state,
        listTicketPerTour: []
      }
    }
    default:
      return state
  }
}
export default reducer
