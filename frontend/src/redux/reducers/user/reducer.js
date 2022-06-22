import * as types from './types'

const initialState = {
  account: {},
  listUserOwner: {
    users: [],
    loading: false,
  },
  listCustomerAdmin: {
    customers: [],
    loading: false
  },
  listOwnerAdmin: {
    owners: [],
    loading: false
  }
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNT_INFO :{
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
    case types.GET_CUSTOMER_ADMIN :{
      return {
        ...state,
        listCustomerAdmin: {
          customers: [],
          loading: true
        }
      }
    }
    case types.GET_CUSTOMER_ADMIN_SUCCESS: {
      return {
        ...state,
        listCustomerAdmin: {
          customers: action.payload,
          loading: false
        }
      }
    }
    case types.GET_CUSTOMER_ADMIN_FAIL: {
      return {
        ...state,
        listCustomerAdmin: {
          loading: false
        }
      }
    }
    case types.GET_OWNER_ADMIN :{
      return {
        ...state,
        listOwnerAdmin: {
          owners: [],
          loading: true
        }
      }
    }
    case types.GET_OWNER_ADMIN_SUCCESS: {
      return {
        ...state,
        listOwnerAdmin: {
          owners: action.payload,
          loading: false
        }
      }
    }
    case types.GET_OWNER_ADMIN_FAIL: {
      return {
        ...state,
        listOwnerAdmin: {
          loading: false
        }
      }
    }
    case types.BECOME_OWNER :{
      return {
        ...state,
        listCustomerAdmin: {
          customers: [...state.listCustomerAdmin.customers],
          loading: true
        },
        listOwnerAdmin: {
          owners: [...state.listOwnerAdmin.owners],
          loading: true
        }
      }
    }
    case types.BECOME_OWNER_SUCCESS: {
      let customerTemp = [...state?.listCustomerAdmin.customers]
      return {
        ...state,
        listOwnerAdmin: {
          owners: [...state?.listOwnerAdmin?.owners, action.payload.data],
          loading: false
        },
        listCustomerAdmin: {  
          customers: customerTemp?.filter((customer) => customer._id.toString() !== action.payload.id),
          loading: false
        }
      }
    }
    case types.BECOME_OWNER_FAIL: {
      return {
        ...state,
        listCustomerAdmin: {
          loading: false
        },
        listOwnerAdmin: {
          loading: false
        }
      }
    }
    case types.SET_ACTIVE_OWNER :{
      return {
        ...state,
        listOwnerAdmin: {
          ...state.listOwnerAdmin,
          loading: true
        }
      }
    }
    case types.SET_ACTIVE_OWNER_SUCCESS: {
      let listOwnerTemp = [...state?.listOwnerAdmin?.owners];
      let indexUpdate = listOwnerTemp?.map((owner) => owner._id).indexOf(action.payload.id)
      let result = listOwnerTemp?.splice(indexUpdate, 1, action.payload.data);
      return {
        ...state,
        listOwnerAdmin: {
          owners: listOwnerTemp,
          loading: false
        }
      }
    }
    case types.SET_ACTIVE_OWNER_FAIL: {
      return {
        ...state,
        listOwnerAdmin: {
          ...state.listOwnerAdmin,
          loading: false
        }
      }
    }

    default:
      return state
  }
}
export default reducer
