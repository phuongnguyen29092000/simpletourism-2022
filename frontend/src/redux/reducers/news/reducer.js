import * as types from "./types";

const initialState = {
  listNews: [],
  listNewsCompany: [],
  totalNews: 0,
  newsDetail: {},
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NEWS_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_NEWS_LIST_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.GET_NEWS_LIST_SUCCESS: {
      return {
        ...state,
        listNews: action.payload,
        loading: false,
      };
    }
    case types.CREATE_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.CREATE_NEWS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.CREATE_NEWS_SUCCESS: {
      let listNewTemp = [...state?.listNews];
      return {
        ...state,
        listNews: listNewTemp.push(action.payload),
        loading: false,
      };
    }
    case types.DELETE_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.DELETE_NEWS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.DELETE_NEWS_SUCCESS: {
      let listNewsTemp = [...state?.listNews];
      return {
        ...state,
        listNews: listNewsTemp?.filter((news) => news._id !== action.payload),
        loading: false,
      };
    }
    case types.UPDATE_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.UPDATE_NEWS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.UPDATE_NEWS_SUCCESS: {
      let listNewsTemp = [...state?.listNews];
      let indexUpdate = listNewsTemp?.find(
        (news) => news._id === action.payload._id
      );
      listNewsTemp = listNewsTemp?.splice(indexUpdate, 1, action.payload);
      return {
        ...state,
        listNews: [...listNewsTemp],
        loading: false,
      };
    }
    case types.GET_NEWS_DETAIL: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_NEWS_DETAIL_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.GET_NEWS_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        newsDetail: action.payload.newsSingle,
      };
    }
    case types.GET_NEWS_COMPANY: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_NEWS_COMPANY_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.GET_NEWS_COMPANY_SUCCESS: {
      return {
        ...state,
        loading: false,
        listNewsCompany: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
