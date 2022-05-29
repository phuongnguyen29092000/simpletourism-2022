import axiosClient from "./axiosClient"

const getAllTicket = () => {
    let url = '/ticket'
    return axiosClient.get(url)
}
const deleteTicket = (id) => {
    let url =`ticket/${id}`
    return axiosClient.delete(url)
}
const getTicketById = (id) => {
    let url = `ticket/${id}`
    return axiosClient.get(url)
}
const createTicket = (id, data) => {
    let url = `ticket/create/${id}`;
    return axiosClient.post(url, data)
}
export default {
    getAllTicket,
    deleteTicket,
    getTicketById,
    createTicket
}