import { getAccessToken } from "hooks/localAuth"
import axiosClient from "./axiosClient"
import HeadersSetup from "./HeadersSetup"

const getAllTicket = (id) => {
    let url = `/ticket/company/${id}`
    return axiosClient.get(url, { headers: HeadersSetup})
}

const getTicketPerTour = (id) => {     
    let url = `/tour/${id}/tickets`
    return axiosClient.get(url, { headers: HeadersSetup})
}
const deleteTicket = (id) => {
    let url =`/ticket/${id}`
    return axiosClient.delete(url, { headers: HeadersSetup})
}
const getTicketById = (id) => {
    let url = `/ticket/${id}`
    return axiosClient.get(url)
}   
const createTicket = (id, data) => {
    console.log(data);
    let url = `/ticket/create/${id}`;
    return axiosClient.post(url, data, { headers: HeadersSetup})
}
const getHistoryTicket = (id) => {
    let url = `/ticket/history/${id}`;
    return axiosClient.get(url, { headers: getHeaderWithToken()})
}
export default {
    getAllTicket,
    getTicketPerTour,
    deleteTicket,
    getTicketById,
    createTicket,
    getHistoryTicket
}