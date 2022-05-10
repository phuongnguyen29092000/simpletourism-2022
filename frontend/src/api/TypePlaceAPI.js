import axiosClient from "./axiosClient"

const getAllTypePlace = () => {
    let url = '/typeplace'
    return axiosClient.get(url)
}
const getCountries = () => {
    let url ='https://restcountries.com/v3.1/all'
    return axiosClient.get(url)
}

export default {
    getAllTypePlace,
    getCountries
}