import { getRefreshToken, getTimeRefresh, removeAccessToken, removeOrganization, removeRefreshToken, removeTimeRefresh, removeUser, setAccessToken, setRefreshToken, setTimeRefresh, setUser } from "../hooks/localAuth"
import AuthAPI from "../api/AuthAPI";
import useNotification from "../hooks/notification";
import Cookies from "js-cookie";
import { ROUTE_HOME } from "../route/type";
import moment from "moment";
// import { useDispatch } from "react-redux";
// import { setAccountInfo } from "redux/reducers/user/action";

export const CheckExpiredToken = async() => {
  const now = Date.now()
  const time_refresh = getTimeRefresh()
  const refresh_token = getRefreshToken()
  console.log('xxxxx',now >= time_refresh);
  if (now >= time_refresh) {
    if (refresh_token) {
      if (now >= time_refresh) {
        await AuthAPI
          .refreshToken({refreshToken: refresh_token})
          .then((result) => {
            if (result.status === 200) {
              setAccessToken(result.data.accessInfo.token)
              setTimeRefresh(result.data.accessInfo.expires)
              // window.location.reload()
            } else {
              useNotification.Error({
                title: 'Message',
                message: result.message,
              })
            }
          })
          .catch((error) =>
            useNotification.Error({
              title: 'Message',
              message: 'Error connection server!',
            })
          )
      }
    }
    else Logout()
  }
}

export const Logout = () => {

//   AuthAPI.logout()
  removeUser()
  removeAccessToken()
  removeOrganization()
  removeRefreshToken()
  removeTimeRefresh()
  Cookies.remove()

  window.location.href = ROUTE_HOME

}

export const loginWithGoogle = (info) => {
    // const dispatch = useDispatch()
    AuthAPI.loginWithGoogle(info)
    // .then((response) => response.json())
          .then((result) => {
            if (result.status === 200) {
              console.log(result)
              // dispatch(setAccountInfo(result.data.profile))
              setAccessToken(result.data.tokenAuth.access.token)
              setRefreshToken(result.data.tokenAuth.refresh.token)
              setTimeRefresh(new Date(result.data.tokenAuth.refresh.expires).getTime()+"")
              setUser(JSON.stringify(result.data.profile))
              // window.location.reload()
            } else {
              // useNotification.Error({
              //   title: 'Message',
              //   message: result.message,
              // })
              console.log(result.message)
            }
          })
          .catch((error) =>
            console.log(error)
            // useNotification.Error({
            //   title: 'Message',
            //   message: 'Error connection server!',
            // })
          )
}