import * as types from './types'
import API from '../../../api/UserAPI'

const getAllTourDomestic = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TOUR_DOMESTIC})
        API.getAllTourDomestic()
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TOUR_DOMESTIC_SUCCESS,
                    payload: [...result.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TOUR_DOMESTIC_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_TOUR_DOMESTIC_FAIL
            })
        })
    }
}
export {
    getAllTourDomestic,
}