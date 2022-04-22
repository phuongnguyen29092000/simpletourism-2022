import * as types from './types'
import API from '../../../api/ListTourAPI'

// import API from
const getAllTour = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR})
        API.getAllTour()
        .then((response)=>response.json())
        .then((result=>{
            // if(result.status)
            if(result.data){
                dispatch({
                    type: types.GET_TOUR_SUCCESS,
                    payload: {...result}
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_FAIL
            })
        })
    }
}

export default {
    getAllTour
}