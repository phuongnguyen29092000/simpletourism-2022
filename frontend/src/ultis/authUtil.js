// import { getRefreshToken, getTimeRefresh, removeAccessToken, removeOrganization, removeRefreshToken, removeTimeRefresh, removeUser, setAccessToken, setRefreshToken, setTimeRefresh } from "hooks/localAuth"
// import authAPI from "api/authAPI";
// import useNotification from "hooks/notification";
// import Cookies from "js-cookie";

// export const CheckExpiredToken = () => {
 
//   const now = new Date()
//   const time_refresh = getTimeRefresh()
//   const refresh_token = getRefreshToken()
//   if (now.getTime() >= time_refresh) {
//     if (refresh_token) {
//       if (now.getTime() >= time_refresh) {
//         authAPI
//           .refreshToken()
//           .then((response) => response.json())
//           .then(async (result) => {
//             if (result.status === 200) {
//               await setAccessToken(result.access_token)
//               await setRefreshToken(result.refresh_token)
//               await setTimeRefresh(result.expires_in)
//               window.location.reload()
//             } else {
//               useNotification.Error({
//                 title: 'Message',
//                 message: result.message,
//               })
//             }
//           })
//           .catch((error) =>
//             useNotification.Error({
//               title: 'Message',
//               message: 'Error connection server!',
//             })
//           )
//       }
//     }
//     else Logout()
//   }
// }

// export const Logout = () => {

//   authAPI.logout()
//   removeUser()
//   removeAccessToken()
//   removeOrganization()
//   removeRefreshToken()
//   removeTimeRefresh()
//   Cookies.remove()

//   window.location.href = "/login"

// }