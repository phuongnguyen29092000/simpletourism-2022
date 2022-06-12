import * as types from './types'
// import API from '../../../api/UserAPI'
import AuthAPI from 'api/AuthAPI'
import UserAPI from 'api/UserAPI';
import { removeAccessToken, removeRefreshToken, removeTimeRefresh, removeUser, setAccessToken, setRefreshToken, setTimeRefresh, setUser } from 'hooks/localAuth'
import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';

const setAccountInfo = (account) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_ACCOUNT_INFO,
            payload: account
        })
    }
}

const loginWithGoogle = (info, callback = ()=>{}) => {
    return (dispatch) => {
        AuthAPI.loginWithGoogle(info)
        // .then((response) => response.json())
              .then((result) => {
                if (result) {
                  console.log(result)
                  setAccessToken(result.data.tokenAuth.access.token)
                  setRefreshToken(result.data.tokenAuth.refresh.token)
                  setTimeRefresh(new Date(result.data.tokenAuth.refresh.expires).getTime()+"")
                  setUser(JSON.stringify(result.data.profile))
                  if(result.data.profile.role === "owner") {
                    callback()
                  }
                //   else window.location.reload()
                  dispatch({
                      type: types.SET_ACCOUNT_INFO,
                      payload: result.data.profile
                  })
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

const getAllCustomerBooked= (idOwner, callback = ()=>{}) => {
  return (dispatch) => {
      dispatch({type: types.GET_USER_OWNER})
      UserAPI.getAllCustomerBooked(idOwner)
      // .then((response)=>response.json())
      .then((result=>{
          if(result.status === 200){
            console.log(result);
              dispatch({
                  type: types.GET_USER_OWNER_SUCCESS,
                  payload: [...result.data.allCustomerBookedTour]
              })
              callback()
          }else{
              dispatch({
                  type: types.GET_USER_OWNER_FAIL
              })
          }
      }))
      .catch((error)=>{
          dispatch({
              type: types.GET_USER_OWNER_FAIL
          })
      })
  }
}
export {
    setAccountInfo,
    loginWithGoogle,
    logoutGoogle,
    getAllCustomerBooked
}