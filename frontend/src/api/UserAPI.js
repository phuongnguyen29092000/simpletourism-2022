import axiosClient from "./axiosClient"

const getAllToursUser = () => {
    const url = '/tour';
    return axiosClient.get(url)
}
const getAllTourDomestic = () => {
    const url ='/tour/trong-nuoc'
    return axiosClient.get(url)
}
const getAllTourInternational = () => {
    const url ='/tour/quoc-te'
    return axiosClient.get(url)
}
const getTourById = (id) => {
    const url = `/tour/${id}`
    return axiosClient.get(url)
}
export default {
    getAllToursUser,
    getAllTourDomestic,
    getAllTourInternational,
    getTourById
}