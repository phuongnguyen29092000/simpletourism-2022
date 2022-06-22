import * as types from './types'
import API from '../../../api/TypePlaceAPI'
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil'

const getTypePlace = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TYPEPLACE})
        API.getAllTypePlace()
        // .then((response)=>response.json())
        .then((result=>{
            // console.log(result)
            if(result.status === 200){
                dispatch({
                    type: types.GET_TYPEPLACE_SUCCESS,
                    payload: [...result.data.typePlaces]
                })
                callback([...result.data.typePlaces])
            }else{
                dispatch({
                    type: types.GET_TYPEPLACE_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_TYPEPLACE_FAIL
            })
        })
    }
}

const createTypePlace = (data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.CREATE_TYPEPLACE})
        API.createTypePlace(data)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 201){
                dispatch({
                    type: types.CREATE_TYPEPLACE_SUCCESS,
                    payload: {...result.data.typePlace}
                })
                callback()
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã thêm loại địa hình thành công!"
                })
            }else{
                dispatch({
                    type: types.CREATE_TYPEPLACE_FAIL
                })
            }
        }))
        .catch((error)=>{
            useNotification.Error({
                title: "Lỗi!",
                message:"Server Error!"
            })
            dispatch({
                type: types.CREATE_TYPEPLACE_FAIL
            })
        })
    }
}

const updateTypePlace = (id, data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.UPDATE_TYPEPLACE})
        API.updateTypePlace(id, data)
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.UPDATE_TYPEPLACE_SUCCESS,
                    payload: {
                        id: id,
                        data: result.data.typePlace
                    }
                })
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã cập nhật loại địa hình thành công!"
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TYPEPLACE_FAIL
                })
            }
        }))
        .catch((error)=>{
            useNotification.Error({
                title: "Lỗi!",
                message:"Server Error!"
            })
            dispatch({
                type: types.GET_TYPEPLACE_FAIL
            })
        })
    }
}

const deleteTypePlace = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.DELETE_TYPEPLACE})
        API.deleteTypeplace(id)
        .then((result=>{
            if(result.status === 204){
                dispatch({
                    type: types.DELETE_TYPEPLACE_SUCCESS,
                    payload: id
                })
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã xóa loại địa hình thành công!"
                })
                callback()
            } 
            else{
                dispatch({
                    type: types.DELETE_TYPEPLACE_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.DELETE_TYPEPLACE_FAIL,
                payload: error
            })
            useNotification.Error({
                title: "Lỗi",
                message:`Có tour đang sử dụng loại địa hình này!\n Không thể xóa`
            })
        })
    }
}

export {
    getTypePlace,
    createTypePlace,
    updateTypePlace,
    deleteTypePlace
}