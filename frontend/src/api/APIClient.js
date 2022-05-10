import axiosClient from "./axiosClient";

const getDataHomePage = () => {
    const url = '/';
    return axiosClient.get(url);
};

const getTourDetail = (id) => {
    const url = `/tour/${id}`;
    return axiosClient.get(url)
}

const getTourList = (params, region) => {
    const url = `/${region}`;
    return axiosClient.get(url, { params })
}

const getNewsList = () => {
    const url = '/news'
    return axiosClient.get(url)
}
const getNewsDetail = (id) => {
    const url = `/news/${id}`;
    return axiosClient.get(url)
}

const getResultFilter = (param) => {
    const url = '/cua-hang';
    return axiosClient.get(url, { params: param });
}

const postBookingInfo = (id, { data }) => {
    const url = `/tickets/book/${id}`;
    return axiosClient.post(url, { data })
}

const login = (data) => {
    const url = '/auth/login/';
    return axiosClient.post(url, {...data });
}

const createTour = (data) => {
    const url = '/tour';
    return axiosClient.post(url, data)
}

const getAllManager = () => {
    const url = '/users';
    return axiosClient.get(url);
}

const deleteManager = (id) => {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
}

const createManager = (data) => {
    const url = '/users/create';
    return axiosClient.post(url, data)
}

const getManagerById = (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url)
}

const updateManager = (id, data) => {
    const url = `/users/${id}`;
    return axiosClient.put(url, data)
}

const sendFeedback = (id, data) => {
    const url = `/feedbacks/create/${id}`;
    return axiosClient.post(url, data)
}

const updateTour = (id, data) => {
    const url = `/${id}`;
    return axiosClient.put(url, data)
}

const deleteTour = (id) => {
    const url = `/${id}`;
    return axiosClient.delete(url);
}

const checkLoginToken = () => {
    const url = '/auth/getrole';
    return axiosClient.get(url);
}

const getAllTicket = () => {
    const url = 'tickets/listTicket';
    return axiosClient.get(url);
}

const getListTicketsTour = (id) => {
    const url = `/tickets/tour/${id}`;
    return axiosClient.get(url);
}

const updateStatusTicket = (idTicket, idStatus) => {
    const url = `/tickets/updateStatus/${idTicket}/${idStatus}`;
    return axiosClient.put(url);
}

const deleteTicket = (idTicket) => {
    const url = `/tickets/delete/${idTicket}`;
    return axiosClient.delete(url);
}

const filterTicketsPerDate = (date) => {
    const url = `/tickets/date/${date}`;
    return axiosClient.get(url);
}

const filterTicketsPerRegion = (idRegion) => {
    const url = `/tickets/region/${idRegion}`;
    return axiosClient.get(url);
}

const getStatistic = (month) => {
    const url = `/statistic/${month}`;
    return axiosClient.get(url);
}
const searchTicketByPhone = (phone) => {
    const url = `/tickets/phone/${phone}`;
    return axiosClient.get(url);
}

const changePassword = (data) => {
    const url = '/auth/changepass';
    return axiosClient.post(url, data);
}

const getTotalStatistic = () => {
    const url = '/statistic/tours';
    return axiosClient.get(url);
}

const APIClient = {
    getDataHomePage,
    getTourDetail,
    getTourList,
    getNewsList,
    getNewsDetail,
    getResultFilter,
    postBookingInfo,
    login,
    createTour,
    getAllManager,
    deleteManager,
    createManager,
    getManagerById,
    updateManager,
    sendFeedback,
    updateTour,
    deleteTour,
    checkLoginToken,
    getAllTicket,
    getListTicketsTour,
    updateStatusTicket,
    deleteTicket,
    filterTicketsPerDate,
    filterTicketsPerRegion,
    getStatistic,
    searchTicketByPhone,
    changePassword,
    getTotalStatistic
}

export default APIClient;