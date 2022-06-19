import axiosClient from "./axiosClient";
import {getHeaderWithToken, refreshTokenValue} from "./getHeaderWithToken";


const loginWithGoogle = (data) => {
    let url = '/auth/login'
    return axiosClient.post(url,data)
}

const refreshToken = (data) => {
    let url = '/auth/refresh-tokens'
    return axiosClient.post(url, data)
}

const logout = () => {
    console.log('xxx',refreshTokenValue());
    let url = '/auth/logout'
    return axiosClient.post(url, refreshTokenValue(), {headers: getHeaderWithToken()})
}

export default {
    loginWithGoogle,
    refreshToken,
    logout
}