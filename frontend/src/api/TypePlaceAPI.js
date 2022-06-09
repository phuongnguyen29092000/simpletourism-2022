import axiosClient from "./axiosClient"
import HeadersSetup from "./HeadersSetup"

const getAllTypePlace = () => {
    let url = '/typeplace'
    return axiosClient.get(url)
}
const getCountries = () => {
    let url ='https://restcountries.com/v3.1/all'
    return axiosClient.get(url)
}

const createTypePlace = (data) => {
    let url = '/typeplace'
    return axiosClient.post(url, { headers: HeadersSetup})
}

const updateTypePlace = (id, data) => {
    let url = `/typeplace/${id}`
    return axiosClient.put(url, data, { headers: HeadersSetup})
}

const deleteTypeplace = (id) => {
    let url = `/typeplace/${id}`
    return axiosClient.delete(url, { headers: HeadersSetup})
}

export default {
    getAllTypePlace,
    getCountries,
    createTypePlace,
    updateTypePlace,
    deleteTypeplace
}