import * as types from './types'
import API from '../../../api/TicketAPI'

const getAllTicket = (callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.GET_TICKET})
        API.getAllTicket()
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TICKET_SUCCESS,
                    payload: [...result.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TICKET_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_TICKET_FAIL
            })
        })
    }
}
const deleteTicket = (id, callback = ()=>{}) => {
    return (dispatch) => {
        dispatch({type: types.DELETE_TICKET})
        API.deleteTicket(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.DELETE_TICKET_SUCCESS,
                    payload: {...result}
                })
                callback()
            }else{
                dispatch({
                    type: types.DELETE_TICKET_FAIL
                })
            }
        })
        .catch((error)=>{
            dispatch({
                type: types.DELETE_TICKET_FAIL
            })
        })
    }
}

export {
    getAllTicket,
    deleteTicket
}