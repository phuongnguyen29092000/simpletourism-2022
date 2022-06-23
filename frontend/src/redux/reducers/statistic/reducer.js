import * as types from './types'

const initialState = {
    statisticPerYear: [],
    statisticAdminPerMonth: {},
    statisticAdminPerYear : {},
    loading: false
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_STATISTIC_PER_YEAR: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.GET_STATISTIC_PER_YEAR_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.GET_STATISTIC_PER_YEAR_SUCCESS: {
            return {
                ...state,
                statisticPerYear: action.payload,
                loading: false,
            }
        }

        case types.GET_STATISTIC_ADMIN_PER_MONTH: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.GET_STATISTIC_ADMIN_PER_MONTH_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.GET_STATISTIC_ADMIN_PER_MONTH_SUCCESS: {
            return {
                ...state,
                statisticAdminPerMonth: action.payload,
                loading: false,
            }
        }

        case types.GET_STATISTIC_ADMIN_PER_YEAR: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.GET_STATISTIC_ADMIN_PER_YEAR_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }
        case types.GET_STATISTIC_ADMIN_PER_YEAR_SUCCESS: {
            return {
                ...state,
                statisticAdminPerYear: action.payload,
                loading: false,
            }
        }
        default:
            return state
    }
}
export default reducer