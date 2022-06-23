import * as types from './types'
import API from '../../../api/StatisticAPI'
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil'

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
                    payload: result.data.statistic
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


const getStatisticAdminPerYear = (year, callback = ()=>{}) => {
    return async (dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_STATISTIC_ADMIN_PER_YEAR})
        API.getStatisticAdminYear(year)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_STATISTIC_ADMIN_PER_YEAR_SUCCESS,
                    payload: {...result.data.statisticYear}
                })
                callback(result.data.statisticYear)
            }else{
                dispatch({
                    type: types.GET_STATISTIC_ADMIN_PER_YEAR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_STATISTIC_ADMIN_PER_YEAR_FAIL
            })
            useNotification.Error({
                title:'Lỗi',
                message: 'Server Error!'
            })
        })
    }
}


const getStatisticAdminPerMonth = (year, month, callback = ()=>{}) => {
    return async (dispatch) => {
        console.log("xxxx", month);
        await CheckExpiredToken()
        dispatch({type: types.GET_STATISTIC_ADMIN_PER_MONTH})
        API.getStatisticAdminPerMonth(year, month)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_STATISTIC_ADMIN_PER_MONTH_SUCCESS,
                    payload: {...result.data.statisticMonth}
                })
                callback(result.data.statisticMonth)
            }else{
                dispatch({
                    type: types.GET_STATISTIC_ADMIN_PER_MONTH_FAIL
                })
            }
        })
        .catch((error)=>{
            console.log(error);
            dispatch({
                type: types.GET_STATISTIC_ADMIN_PER_MONTH_FAIL
            })
            useNotification.Error({
                title:'Lỗi',
                message: 'Server Error!'
            })
        })
    }
}

export {
    getStatisticPerYear,
    getStatisticAdminPerYear,
    getStatisticAdminPerMonth
}