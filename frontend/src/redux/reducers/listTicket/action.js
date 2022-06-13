import * as types from './types'
import API from '../../../api/TicketAPI'
import { CheckExpiredToken } from 'ultis/authUtil'

const getAllTicket = (id,callback = ()=>{}) => {
    return (dispatch) => {
        CheckExpiredToken()
        dispatch({type: types.GET_TICKET})
        API.getAllTicket(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TICKET_SUCCESS,
                    payload: [...result.data.tickets]
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

const getTicketPerTour = (id,callback = ()=>{}) => {
    return (dispatch) => {
        CheckExpiredToken()
        dispatch({type: types.GET_TICKET_PER_TOUR})
        API.getTicketPerTour(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                console.log(result.data.tickets);
                dispatch({
                    type: types.GET_TICKET_PER_TOUR_SUCCESS,
                    payload: [...result.data.tickets]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_TICKET_PER_TOUR_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_TICKET_PER_TOUR_FAIL
            })
        })
    }
}

const deleteTicket = (id, callback = ()=>{}) => {
    return (dispatch) => {
        CheckExpiredToken()
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
    getTicketPerTour,
    deleteTicket
}