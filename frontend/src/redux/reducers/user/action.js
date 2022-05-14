import * as types from './types'
import API from '../../../api/UserAPI'

const getAllTourDomestic = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_DOMESTIC})
        API.getAllTourDomestic()
        // .then((response)=>response.json())
        .then((result)=>{
            console.log(result)
            if(result.status == 200){
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
            console.log(result)
            if(result.status == 200){
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
export {
    getAllTourDomestic,
    getAllTourInternational
}