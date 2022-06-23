import axiosClient from "./axiosClient";
import {getHeaderWithToken} from "./getHeaderWithToken"

const addTour = (data) => {
  const url = '/tour';
  return axiosClient.post(url, data, {headers: getHeaderWithToken()})
}

const getAllTour = () => {
  const url = '/tour';
  return axiosClient.get(url)
}

const deleteTour = (id) => {
  const url = `/tour/${id}`;
  return axiosClient.delete(url, {headers: getHeaderWithToken()});
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

const updateTour = (id, data) =>{
  const url = `/tour/${id}`
  return axiosClient.put(url, data, {headers: getHeaderWithToken()})
}

const getTourByOwner = (id) => {
  const url = `/tour/owner/${id}`
  return axiosClient.get(url, {headers: getHeaderWithToken()})
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
    updateTour,
    getTourByOwner
}