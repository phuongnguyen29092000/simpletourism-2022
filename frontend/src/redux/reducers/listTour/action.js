import * as types from './types'
import API from '../../../api/ListTourAPI'

const getAllTour = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR})
        API.getAllTour()
        // .then((response)=>response.json())
        .then((result)=>{
            console.log(result)
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

const addTour = (data, callback=()=>{}) =>{
    return (dispatch) => {
        dispatch({type: types.ADD_TOUR})
        API.addTour(data)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 201){
                dispatch({
                    type: types.ADD_TOUR_SUCCESS,
                    payload: {...data}
                })
                callback()
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
        })
    }
}

const deleteTour = (id, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.DELETE_TOUR})
        API.deleteTour(id)
        // .then((response)=>response.json())
        .then((result)=>{
            // if(result.status)
            if(result.status === 204){
                dispatch({
                    type: types.DELETE_TOUR_SUCCESS,
                    payload: {...result}
                })
                callback()
            }else{
                dispatch({
                    type: types.DELETE_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.DELETE_TOUR_FAIL
            })
        })
    }
}

const getAllTourDomestic = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_DOMESTIC})
        API.getAllTourDomestic()
        // .then((response)=>response.json())
        .then((result)=>{
            console.log(result)
            if(result.status === 200){
                console.log(result.data.data)
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
                console.log(result.data.data)
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
                callback()
            }else{
                dispatch({
                    type: types.FILTER_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.FILTER_TOUR_FAIL
            })
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
    getTourById
}