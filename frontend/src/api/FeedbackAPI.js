import axiosClient from "./axiosClient"

const createFeedback = (data) => {
    let url = '/feedback'
    return axiosClient.post(url,data)
}

const getFeedbackForTour = (idTour) => {
    let url =`/feedback/tour/${idTour}`
    return axiosClient.get(url)
}

const deleteFeedback = (idFeedback) => {
    let url =`/feedback/${idFeedback}`
    return axiosClient.delete(url)
}

const updateFeedback = (idFeedback, data) => {
    let url = `/feedback/${idFeedback}`
    return axiosClient.patch(url,data)
}

export default {
    createFeedback,
    getFeedbackForTour,
    deleteFeedback
}