import * as types from './types'

const initialState = {
  listTypePlace: [],
  loading: false,
  error: {}
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
    case types.CREATE_TYPEPLACE: {
      return {
        ...state,
        loading: true
      }
    }
    case types.CREATE_TYPEPLACE_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
    case types.CREATE_TYPEPLACE_SUCCESS: {
      return {
        ...state,
        listTypePlace: [...state.listTypePlace, action.payload],
        loading: false
      }
    }

    case types.UPDATE_TYPEPLACE: {
      return {
        ...state,
        loading: true
      }
    }
    case types.UPDATE_TYPEPLACE_FAIL: {
      return {
        ...state,
        loading: false
      }
    }
    case types.UPDATE_TYPEPLACE_SUCCESS: {
      let listTemp = [...state?.listTypePlace];
      let indexUpdate = listTemp?.map((item) => item._id).indexOf(action.payload.id);
      let result = listTemp?.splice(indexUpdate, 1, action.payload.data);
      return {
        ...state,
        listTypePlace: listTemp,
        loading: false
      }
    }
    case types.DELETE_TYPEPLACE: {
      return {
        ...state,
        loading: true
      }
    }
    case types.DELETE_TYPEPLACE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    case types.DELETE_TYPEPLACE_SUCCESS: {
      let listTemp = [...state?.listTypePlace];
      return {
        ...state,
        listTypePlace: listTemp?.filter((item) => item._id.toString() !== action.payload),
        loading: false,
      };
    }

    default:
      return state
  }
}
export default reducer
