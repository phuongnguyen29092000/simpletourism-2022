import axiosClient from "./axiosClient"
import HeadersSetup from "./HeadersSetup"

const getListOwner = () =>{
    const url = '/user/admin/owner-list'
    return axiosClient.get(url, {headers: HeadersSetup})
}

const getListCustomer = () =>{
    const url = '/user/admin/customer-list'
    return axiosClient.get(url, {headers: HeadersSetup})
}

const getAllCustomerBooked = (idOwner) =>{
    const url = `/owner/${idOwner}/customers`
    return axiosClient.get(url, {headers: HeadersSetup})
}

const getInfoUser = (idUser) =>{
    const url = `/user/${idUser}`
    return axiosClient.get(url, {headers: HeadersSetup})
}

const becomeOwner = (customerId, data) => {
    const url = `/user/become-owner/${customerId}`
    return axiosClient.put(url, data, {headers: HeadersSetup})
}

const deleteUser = (idUser) => {
    const url = `/user/${idUser}`
    return axiosClient.delete(url, {headers: HeadersSetup})
}
export default {
    getListOwner,
    getListCustomer, 
    getAllCustomerBooked,
    getInfoUser, 
    becomeOwner,
    deleteUser
}