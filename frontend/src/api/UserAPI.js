import axiosClient from "./axiosClient"
import {getHeaderWithToken} from "./getHeaderWithToken"

const getListOwner = () =>{
    const url = '/user/admin/owner-list'
    return axiosClient.get(url, {headers: getHeaderWithToken()})
}

const getListCustomer = () =>{
    const url = '/user/admin/customer-list'
    return axiosClient.get(url, {headers: getHeaderWithToken()})
}

const getAllCustomerBooked = (idOwner) =>{
    const url = `user/owner/${idOwner}/customers`
    return axiosClient.get(url, {headers: getHeaderWithToken()})
}

const getInfoUser = (idUser) =>{
    const url = `/user/${idUser}`
    return axiosClient.get(url, {headers: getHeaderWithToken()})
}

const becomeOwner = (customerId, data) => {
    const url = `/user/become-owner/${customerId}`
    return axiosClient.put(url, data, {headers: getHeaderWithToken()})
}

const deleteUser = (idUser) => {
    const url = `/user/${idUser}`
    return axiosClient.delete(url, {headers: getHeaderWithToken()})
}
export default {
    getListOwner,
    getListCustomer, 
    getAllCustomerBooked,
    getInfoUser, 
    becomeOwner,
    deleteUser
}