import axiosClient from "./axiosClient";
import HeadersSetup from "./HeadersSetup"

const addTour = (data) => {
  const url = '/tour';
  return axiosClient.post(url, data, {headers: HeadersSetup})
}

const getAllTour = () => {
  const url = '/tour';
  return axiosClient.get(url)
}

const deleteTour = (id) => {
  const url = `/tour/${id}`;
  return axiosClient.delete(url, {headers: HeadersSetup});
}

const getOutstandingTour = () => {
  const url = '/tour/tour-noi-bat'
  return axiosClient.get(url)
}

const filterTour = (param) => {
  const url = `/tour/`
  return axiosClient.get(url, { params: param });
}

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

const searchTour = (param) => {
  const url ='/tour/search'
  return axiosClient.get(url, { params: param });
}

const updateTour = (id) =>{
  const url = `/tour/${id}`
  return axiosClient.patch(url, {headers: HeadersSetup})
}
export default {
    getAllTour,
    addTour,
    deleteTour,
    getOutstandingTour,
    filterTour,
    getAllToursUser,
    getAllTourDomestic,
    getAllTourInternational,
    getTourById,
    searchTour,
    updateTour
}