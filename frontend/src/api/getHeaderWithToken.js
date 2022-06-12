import { getAccessToken } from "hooks/localAuth"

const getHeaderWithToken = () => {
    const token = getAccessToken()
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export {
    getHeaderWithToken
}