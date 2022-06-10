import { getAccessToken } from "hooks/localAuth";
const token = getAccessToken()
export default {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
} 
