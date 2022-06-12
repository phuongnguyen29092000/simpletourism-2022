import axiosClient from "./axiosClient";
import {getHeaderWithToken} from "./getHeaderWithToken";

const addNews = (data) => {
  const url = '/news/create';
  return axiosClient.post(url, data, {headers: getHeaderWithToken()})
}

const getAllNews = () => {
  const url = '/news';
  return axiosClient.get(url)
}

const getNewsPerCompany = (idCompany) => {
	const url = `/news/company/${idCompany}`;
	return axiosClient.get(url, {headers: getHeaderWithToken()})
}
  
const getNewById = (id) => {
	const url = `/news/${id}`
	return axiosClient.get(url)
}

const updateNews = (id, data) => {
  const url = `/news/${id}`
  return axiosClient.put(url, data, {headers: getHeaderWithToken()})
}

const updateViewer = (id) => {
  const url = `/news/viewer/${id}`
  return axiosClient.put(url)
}


const deleteNews = (id) => {
  const url = `/news/${id}`;
  return axiosClient.delete(url, {headers: getHeaderWithToken()});
}


export default {
  addNews,
	getAllNews,
	getNewsPerCompany,
	getNewById,
	updateNews,
	deleteNews,
  updateViewer
}