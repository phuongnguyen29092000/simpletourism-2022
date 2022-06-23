import * as types from './types'
import API from '../../../api/FeedbackAPI'
import { CheckExpiredToken } from 'ultis/authUtil'
import useNotification from 'hooks/notification'

const getFeedbackForTour = (idTour, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_FEEDBACK})
        API.getFeedbackForTour(idTour)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_FEEDBACK_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_FEEDBACK_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_FEEDBACK_FAIL
            })
        })
    }
}

const createFeedback = (data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.CREATE_FEEDBACK})
        API.createFeedback(data)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 201){
                dispatch({
                    type: types.CREATE_FEEDBACK_SUCCESS,
                    payload: result.data.data
                })
                callback()
                useNotification.Success({
                    title:'Thành công!',
                    message:'Cảm ơn bạn đã đánh giá!'
                })
            }else{
                dispatch({
                    type: types.CREATE_FEEDBACK_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.CREATE_FEEDBACK_FAIL
            })
            useNotification.Error({
                title:'Lỗi!',
                message:'Bạn chỉ có thể đánh giá tour khi đã đi tour và thanh toán!'
            })
        })
    }
}

const updateFeedback = (data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.UPDATE_FEEDBACK})
        API.updateFeedback(data)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.UPDATE_FEEDBACK_SUCCESS,
                    payload: [...result.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.UPDATE_FEEDBACK_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.UPDATE_FEEDBACK_FAIL
            })
        })
    }
}

const deleteFeedback = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.DELETE_FEEDBACK})
        API.deleteFeedback(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 204){
                dispatch({
                    type: types.DELETE_FEEDBACK_SUCCESS,
                    payload: id
                })
                useNotification.Success(({
                    message:'Thành công!',
                    title:'Xóa đánh giá thành công!'
                }))
                callback()
            }else{
                dispatch({
                    type: types.DELETE_FEEDBACK_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.DELETE_FEEDBACK_FAIL
            })
        })
    }
}

export {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackForTour
}