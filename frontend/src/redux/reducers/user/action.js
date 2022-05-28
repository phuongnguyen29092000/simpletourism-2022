import * as types from './types'
// import API from '../../../api/UserAPI'
import AuthAPI from 'api/AuthAPI'
import { removeAccessToken, removeRefreshToken, removeTimeRefresh, removeUser, setAccessToken, setRefreshToken, setTimeRefresh, setUser } from 'hooks/localAuth'
import Cookies from "js-cookie";

const setAccountInfo = (account) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_ACCOUNT_INFO,
            payload: account
        })
    }
}

const loginWithGoogle = (info) => {
    return (dispatch) => {
        AuthAPI.loginWithGoogle(info)
        // .then((response) => response.json())
              .then((result) => {
                if (result.status === 200) {
                  console.log(result)
                    dispatch({
                        type: types.SET_ACCOUNT_INFO,
                        payload: result.data.profile
                    })
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
}
const logoutGoogle = () => {
    return (dispatch) => {
        dispatch({
            type: types.RESET_ACCOUNT_INFO,
        })
        removeUser()
        removeAccessToken()
        removeRefreshToken()
        removeTimeRefresh()
        Cookies.remove()
      }
      // window.location.reload()
}

export {
    setAccountInfo,
    loginWithGoogle,
    logoutGoogle
}