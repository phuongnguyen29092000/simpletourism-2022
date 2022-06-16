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
      return {
        ...state,
        listNewsCompany: [...state.listNewsCompany, action.payload],
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
      let listNewsTemp = [...state?.listNewsCompany];
      return {
        ...state,
        listNewsCompany: listNewsTemp?.filter((news) => news._id.toString() !== action.payload),
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
      let listNewsTemp = [...state?.listNewsCompany];
      console.log(listNewsTemp);
      let indexUpdate = listNewsTemp?.map((news) => news._id).indexOf(action.payload.id);
      let result = listNewsTemp?.splice(indexUpdate, 1, action.payload.news);
      return {
        ...state,
        listNewsCompany: listNewsTemp,
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
        newsDetail: action.payload,
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
