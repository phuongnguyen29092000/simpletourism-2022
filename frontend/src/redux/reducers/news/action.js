import * as types from './types'
import API from '../../../api/NewsAPI'

const addNews = (data, callback=()=>{}) =>{
    console.log(data)
    return (dispatch) => {
        dispatch({type: types.CREATE_NEWS})
        API.addNews(data)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 201){
                dispatch({
                    type: types.CREATE_NEWS_SUCCESS,
                    payload: {...data}
                })
                callback()
            }else{
                dispatch({
                    type: types.CREATE_NEWS_FAIL
                })
            }
        })
        .catch((error)=>{
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
    return (dispatch) => {
        dispatch({type: types.GET_NEWS_COMPANY})
        API.getNewsPerCompany(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_NEWS_COMPANY_SUCCESS,
                    payload: [...result.data]
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
            if(result.status === 200){
                dispatch({
                    type: types.GET_NEWS_DETAIL_SUCCESS,
                    payload: {...result.data.news}
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
    return (dispatch) => {
        dispatch({type: types.DELETE_NEWS})
        API.deleteNews(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.DELETE_NEWS_SUCCESS,
                    payload: {...result}
                })
                callback()
            }else{
                dispatch({
                    type: types.DELETE_NEWS_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.DELETE_NEWS_FAIL
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

}