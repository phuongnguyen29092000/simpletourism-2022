import * as types from './types'
import API from '../../../api/NewsAPI'
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil'

const addNews = (data, callback=()=>{}) =>{
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.CREATE_NEWS})
        API.addNews(data)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 201){
                dispatch({
                    type: types.CREATE_NEWS_SUCCESS,
                    payload: {...result.data.news}
                })
                callback()
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã thêm tin tức thành công!"
                })
            }else{
                dispatch({
                    type: types.CREATE_NEWS_FAIL
                })
            }
        })
        .catch((error)=>{
            useNotification.Error({
                title: "Lỗi!",
                message:"Server Error!"
            })
            dispatch({
                type: types.CREATE_NEWS_FAIL
            })
        })
    }
}

const getAllNews = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_NEWS_LIST})
        API.getAllNews()
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_NEWS_LIST_SUCCESS,
                    payload: [...result.data.news]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_NEWS_LIST_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_NEWS_LIST_FAIL
            })
        })
    }
}

const getNewsPerCompany = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_NEWS_COMPANY})
        API.getNewsPerCompany(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_NEWS_COMPANY_SUCCESS,
                    payload: [...result.data.news]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_NEWS_COMPANY_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_NEWS_COMPANY_FAIL
            })
        })
    }
}

const getNewsDetail = (id, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_NEWS_DETAIL})
        API.getNewById(id)
        // .then((response)=>response.json())
        .then((result)=>{
            console.log(result)
            if(result.status === 200){
                dispatch({
                    type: types.GET_NEWS_DETAIL_SUCCESS,
                    payload: {...result.data.newsSingle}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_NEWS_DETAIL_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_NEWS_DETAIL_FAIL
            })
        })
    }
}

const deleteNews = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.DELETE_NEWS})
        API.deleteNews(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 204){
                dispatch({
                    type: types.DELETE_NEWS_SUCCESS,
                    payload: id
                })
                callback(result)
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã xóa tin tức thành công!"
                })
            }else{
                dispatch({
                    type: types.DELETE_NEWS_FAIL
                })
            }
        })
        .catch((error)=>{
            useNotification.Success({
                title: "Lỗi!",
                message:"Lỗi server!"
            })
            dispatch({
                type: types.DELETE_NEWS_FAIL
            })
        })
    }
}


const updateNews = (id,data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.UPDATE_NEWS})
        API.updateNews(id, data)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.UPDATE_NEWS_SUCCESS,
                    payload: {
                        id: id,
                        news: result?.data?.newsSingle
                    }
                })
                callback(result)
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã cập nhật tin tức thành công!"
                })
            }else{
                dispatch({
                    type: types.UPDATE_NEWS_FAIL
                })
            }
        })
        .catch((error)=>{
            useNotification.Error({
                title: "Lỗi!",
                message:"Lỗi server!"
            })
            dispatch({
                type: types.UPDATE_NEWS_FAIL
            })
        })
    }
}

export {
    addNews,
    getAllNews,
    getNewsPerCompany,
    getNewsDetail,
    deleteNews,
    updateNews
}