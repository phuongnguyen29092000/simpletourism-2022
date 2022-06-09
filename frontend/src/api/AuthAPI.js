import axiosClient from "./axiosClient";

const loginWithGoogle = (data) => {
    let url = '/auth/login'
    return axiosClient.post(url,data)
}

const refreshToken = (token) => {
    let url ='/auth/refresh-tokens'
    return axiosClient.post(url, token)
}

export default {
    loginWithGoogle,
    refreshToken
}