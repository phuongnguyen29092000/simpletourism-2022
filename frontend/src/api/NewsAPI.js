import axiosClient from "./axiosClient";
import HeadersSetup from "./HeadersSetup";

const addNews = (data) => {
  const url = '/news/create';
  return axiosClient.post(url, data, {headers: HeadersSetup})
}

const getAllNews = () => {
  const url = '/news';
  return axiosClient.get(url)
}

const getNewsPerCompany = (idCompany) => {
	const url = `/news/company/${idCompany}`;
	return axiosClient.get(url, {headers: HeadersSetup})
}
  
const getNewById = (id) => {
	const url = `/news/${id}`
	return axiosClient.get(url)
}

const updateNews = (id, data) => {
  const url = `/news/${id}`
  return axiosClient.put(url, data, {headers: HeadersSetup})
}

const deleteNews = (id) => {
  const url = `/news/${id}`;
  return axiosClient.delete(url, {headers: HeadersSetup});
}


export default {
  addNews,
	getAllNews,
	getNewsPerCompany,
	getNewById,
	updateNews,
	deleteNews
}