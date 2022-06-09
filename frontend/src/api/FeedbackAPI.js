import axiosClient from "./axiosClient"
import HeadersSetup from "./HeadersSetup"

const createFeedback = (data) => {
    let url = '/feedback'
    return axiosClient.post(url,data, {headers: HeadersSetup})
}

const getFeedbackForTour = (idTour) => {
    let url =`/feedback/tour/${idTour}`
    return axiosClient.get(url)
}

const deleteFeedback = (idFeedback) => {
    let url =`/feedback/${idFeedback}`
    return axiosClient.delete(url, {headers: HeadersSetup})
}

const updateFeedback = (idFeedback, data) => {
    let url = `/feedback/${idFeedback}`
    return axiosClient.patch(url,data, {headers: HeadersSetup})
}

export default {
    createFeedback,
    getFeedbackForTour,
    deleteFeedback,
    updateFeedback
}