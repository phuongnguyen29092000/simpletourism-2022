import axiosClient from "./axiosClient";

const loginWithGoogle = (data) => {
    let url = '/auth/login'
    return axiosClient.post(url,data)
}

export default {
    loginWithGoogle,
}