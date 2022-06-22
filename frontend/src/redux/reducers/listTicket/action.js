import * as types from './types'
import API from '../../../api/TicketAPI'
import { CheckExpiredToken } from 'ultis/authUtil'
import useNotification from 'hooks/notification'

const getAllTicket = (id,callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_TICKET})
        API.getAllTicket(id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TICKET_SUCCESS,
                    payload: [...result.data.tickets]
                })
                callback([...result.data.tickets])
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

const getTicketPerTour = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_TICKET_PER_TOUR})
        API.getTicketPerTour(id)
        // .then((response)=>response.json())
        .then((result)=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_TICKET_PER_TOUR_SUCCESS,
                    payload: [...result.data.tickets]
                })
                callback()
            }else {
                dispatch({
                    type: types.GET_TICKET_PER_TOUR_FAIL
                })
            }
        })
        .catch((error)=>{
            useNotification.Error({
                message:"Thông báo",
                title:"Chưa có vé nào được đặt cho tour này!"
            })
            dispatch({
                type: types.GET_TICKET_PER_TOUR_FAIL
            })
        })
    }
}

const deleteTicket = (id, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
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

const resetTicket = () => {
    return (dispatch) => {
        dispatch({type: types.RESET_TICKET})
    }
}
export {
    getAllTicket,
    getTicketPerTour,
    deleteTicket,
    resetTicket
}