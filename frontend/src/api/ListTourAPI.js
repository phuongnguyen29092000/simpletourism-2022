import axiosClient from "./axiosClient";

const addTour = (data) => {
  const url = '/tour';
  return axiosClient.post(url, data)
}

const getAllTour = () => {
  const url = '/tour';
  return axiosClient.get(url)
}

const deleteTour = (id) => {
  const url = `/tour/${id}`;
  return axiosClient.delete(url);
}


export default {
    getAllTour,
    addTour,
    deleteTour
}