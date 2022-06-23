import { getUser } from "hooks/localAuth";
import axiosClient from "./axiosClient";
import { getHeaderWithToken } from "./getHeaderWithToken";

const getStatisticPerMonth = (year, month) => {
    const url =`/statistic/owner/${getUser()._id}/${year}/${month}`
    return axiosClient.get(url,{headers: getHeaderWithToken()})
}

const getStatisticYear = (year) => {
    const url =`/statistic/owner/${getUser()._id}/${year}`
    return axiosClient.get(url,{headers: getHeaderWithToken()})
}


const getStatisticAdminPerMonth = (year, month) => {
    const url =`/statistic/admin/${year}/${month}`
    return axiosClient.get(url,{headers: getHeaderWithToken()})
}

const getStatisticAdminYear = (year) => {
    const url =`/statistic/admin/${year}`
    return axiosClient.get(url,{headers: getHeaderWithToken()})
}
export default {
    getStatisticPerMonth,
    getStatisticYear,
    getStatisticAdminPerMonth,
    getStatisticAdminYear
}