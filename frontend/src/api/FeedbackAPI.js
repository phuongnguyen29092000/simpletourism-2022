import axiosClient from "./axiosClient"
import {getHeaderWithToken} from "./getHeaderWithToken"

const createFeedback = (data) => {
    let url = '/feedback'
    return axiosClient.post(url,data, {headers: getHeaderWithToken()})
}

const getFeedbackForTour = (idTour) => {
    let url =`/feedback/tour/${idTour}`
    return axiosClient.get(url)
}

const deleteFeedback = (idFeedback) => {
    let url =`/feedback/${idFeedback}`
    return axiosClient.delete(url, {headers: getHeaderWithToken()})
}

const updateFeedback = (idFeedback, data) => {
    let url = `/feedback/${idFeedback}`
    return axiosClient.patch(url,data, {headers: getHeaderWithToken()})
}

export default {
    createFeedback,
    getFeedbackForTour,
    deleteFeedback,
    updateFeedback
}