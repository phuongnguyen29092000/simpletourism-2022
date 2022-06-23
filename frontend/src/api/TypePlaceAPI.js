import axiosClient from "./axiosClient"
import {getHeaderWithToken} from "./getHeaderWithToken"

const getAllTypePlace = () => {
    let url = '/typeplace'
    return axiosClient.get(url)
}
const getCountries = () => {
    let url ='https://restcountries.com/v3.1/all'
    return axiosClient.get(url)
}

const createTypePlace = (data) => {
    let url = '/typeplace/create'
    return axiosClient.post(url, data, { headers: getHeaderWithToken()})
}

const updateTypePlace = (id, data) => {
    let url = `/typeplace/${id}`
    return axiosClient.put(url, data, { headers: getHeaderWithToken()})
}

const deleteTypeplace = (id) => {
    let url = `/typeplace/${id}`
    return axiosClient.delete(url, { headers: getHeaderWithToken()})
}

export default {
    getAllTypePlace,
    getCountries,
    createTypePlace,
    updateTypePlace,
    deleteTypeplace
}