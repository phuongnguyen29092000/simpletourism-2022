import * as types from './types'
import API from '../../../api/TypePlaceAPI'

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
                callback()
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
export {
    getTypePlace,
}