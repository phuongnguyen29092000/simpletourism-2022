import axiosClient from "./axiosClient";
import {getHeaderWithToken} from "./getHeaderWithToken";

const loginWithGoogle = (data) => {
    let url = '/auth/login'
    return axiosClient.post(url,data)
}

const refreshToken = (data) => {
    let url = '/auth/refresh-tokens'
    return axiosClient.post(url, data)
}

const logout = (data) => {
    let url = '/auth/logout'
    return axiosClient.post(url, data, {headers: getHeaderWithToken()})
}

export default {
    loginWithGoogle,
    refreshToken,
    logout
}