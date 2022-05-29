import axiosClient from "./axiosClient";

const addNews = (data) => {
  const url = '/news/create';
  return axiosClient.post(url, data)
}

const getAllNews = () => {
  const url = '/news';
  return axiosClient.get(url)
}

const getNewsPerCompany = (idCompany) => {
	const url = `/news/company/${idCompany}`;
	return axiosClient.get(url)
}
  
const getNewById = (id) => {
	const url = `/news/${id}`
	return axiosClient.get(url)
}

const updateNews = (id, data) => {
  const url = `/news/${id}`
  return axiosClient.put(url, data)
}

const deleteNews = (id) => {
  const url = `/news/${id}`;
  return axiosClient.delete(url);
}


export default {
  addNews,
	getAllNews,
	getNewsPerCompany,
	getNewById,
	updateNews,
	deleteNews
}