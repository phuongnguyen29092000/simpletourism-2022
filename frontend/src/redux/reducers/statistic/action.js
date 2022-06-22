import * as types from './types'
import API from '../../../api/StatisticAPI'
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil'

const getStatisticPerMonth = ({year, month}, callback = ()=>{}) => {
    return async (dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_STATISTIC_PER_MONTH})
        API.getStatisticPerMonth(year,month)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_STATISTIC_PER_MONTH_SUCCESS,
                    payload: {...result.data}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_STATISTIC_PER_MONTH_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_STATISTIC_PER_MONTH_FAIL
            })
            useNotification.Error({
                title:'Lỗi',
                message: 'Server Error!'
            })
        })
    }
}

const getStatisticPerYear = ({year}, callback = ()=>{}) => {
    return async (dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_STATISTIC_PER_YEAR})
        API.getStatisticYear(year)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_STATISTIC_PER_YEAR_SUCCESS,
                    payload: {...result.data}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_STATISTIC_PER_YEAR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_STATISTIC_PER_YEAR_FAIL
            })
            useNotification.Error({
                title:'Lỗi',
                message: 'Server Error!'
            })
        })
    }
}

export {
    getStatisticPerMonth,
    getStatisticPerYear
}