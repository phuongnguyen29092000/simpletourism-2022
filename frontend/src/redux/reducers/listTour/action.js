import * as types from './types'
import API from '../../../api/ListTourAPI'
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil'

const getAllTour = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR})
        API.getAllTour()
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_SUCCESS,
                    payload: {...result.data}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_FAIL
            })
        })
    }
}

const getTourByOwner = (id,callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_TOUR_BY_OWNER})
        API.getTourByOwner(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_BY_OWNER_SUCCESS,
                    payload: {...result.data}
                })
                callback(result.data.data)
            }else{
                dispatch({
                    type: types.GET_TOUR_BY_OWNER_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_BY_OWNER_FAIL
            })
        })
    }
}

const addTour = (data, callback=()=>{}) =>{
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.ADD_TOUR})
        API.addTour(data)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 201){
                dispatch({
                    type: types.ADD_TOUR_SUCCESS,
                    payload: result.data.data
                })
                callback()
                useNotification.Success({
                    title: "Th??nh c??ng!",
                    message:"B???n ???? th??m tour th??nh c??ng!"
                })
            }else{
                dispatch({
                    type: types.ADD_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.ADD_TOUR_FAIL
            })
            useNotification.Error({
                title: "L???i!",
                message:"Server Error!"
            })
        })
    }
}

const deleteTour = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.DELETE_TOUR})
        API.deleteTour(id)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 204){
                dispatch({
                    type: types.DELETE_TOUR_SUCCESS,
                    payload: id
                })
                callback()
                useNotification.Success({
                    title:"Th??nh c??ng!",
                    message:"X??a tour th??nh c??ng!"
                })
            }else{
                dispatch({
                    type: types.DELETE_TOUR_FAIL
                })
                useNotification.Error({
                    title:"L???i!",
                    message:"Server Error!"
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.DELETE_TOUR_FAIL
            })
            useNotification.Error({
                title:"L???i!",
                message:"Server Error!"
            })
        })
    }
}

const updateTour = (id, data,callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.UPDATE_TOUR})
        API.updateTour(id, data)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 200){
                dispatch({
                    type: types.UPDATE_TOUR_SUCCESS,
                    payload: {
                        id: id,
                        tour: result.data.data
                    }
                })
                callback()
                useNotification.Success({
                    title:"Th??nh c??ng!",
                    message:"B???n ???? c???p nh???t tour th??nh c??ng!"
                })
            }else{
                dispatch({
                    type: types.UPDATE_TOUR_FAIL
                })
                useNotification.Success({
                    title:"L???i!",
                    message:"Server Error!"
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.UPDATE_TOUR_FAIL
            })
            useNotification.Error({
                title:"L???i!",
                message:"Server Error!"
            })
        })
    }
}

const getAllTourDomestic = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_DOMESTIC})
        API.getAllTourDomestic()
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_DOMESTIC_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_DOMESTIC_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_DOMESTIC_FAIL
            })
        })
    }
}

const getAllTourInternational = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_INTERNATIONAL})
        API.getAllTourInternational()
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_INTERNATIONAL_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_INTERNATIONAL_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_INTERNATIONAL_FAIL
            })
        })
    }
}

const filterTour = (param, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.FILTER_TOUR})
        API.filterTour(param)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.FILTER_TOUR_SUCCESS,
                    payload: [...result.data.data]
                })
                callback(result.data.data)
            }else{
                callback([])
                dispatch({
                    type: types.FILTER_TOUR_FAIL
                })

            }
        })
        .catch((error)=>{
            dispatch({
                type: types.FILTER_TOUR_FAIL
            })
            callback([])
        })
    }
}

const getOutstandingTour = (callback=()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_OUTSTANDING_TOUR})
        API.getOutstandingTour()
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_OUTSTANDING_TOUR_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_OUTSTANDING_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_OUTSTANDING_TOUR_FAIL
            })
        })
    }
}

const getTourById = (id, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_DETAIL})
        API.getTourById(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_DETAIL_SUCCESS,
                    payload: {...result.data}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_DETAIL_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_DETAIL_FAIL
            })
        })
    }
}


export {
    getAllTour,
    addTour,
    deleteTour,
    getAllTourDomestic,
    getAllTourInternational,
    filterTour,
    getOutstandingTour,
    getTourById,
    getTourByOwner,
    updateTour
}