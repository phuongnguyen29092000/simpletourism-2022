import * as types from './types'
// import API from '../../../api/UserAPI'
import AuthAPI from 'api/AuthAPI'
import UserAPI from 'api/UserAPI';
import { removeAccessToken, removeRefreshToken, removeTimeRefresh, removeUser, setAccessToken, setRefreshToken, setTimeRefresh, setUser } from 'hooks/localAuth'
import Cookies from "js-cookie";
import useNotification from 'hooks/notification'
import { CheckExpiredToken } from 'ultis/authUtil';

const setAccountInfo = (account, callback = ()=> {}) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_ACCOUNT_INFO,
            payload: account
        })
        callback()
    }
}

const loginWithGoogle = (info, callback = ()=>{}) => {
    return (dispatch) => {
        AuthAPI.loginWithGoogle(info)
        // .then((response) => response.json())
              .then((result) => {
                if (result) {
                  setAccessToken(result.data.tokenAuth.access.token)
                  setRefreshToken(result.data.tokenAuth.refresh.token)
                  setTimeRefresh(result.data.tokenAuth.access.expires)
                  setUser(JSON.stringify(result.data.profile))
                  if(result.data.profile.role) {
                    callback(result.data.profile)
                  }
                  window.location.reload()
                  dispatch({
                      type: types.SET_ACCOUNT_INFO,
                      payload: result.data.profile
                  })
                } else {
                  // useNotification.Error({
                  //   title: 'Message',
                  //   message: result.message,
                  // })
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
const logoutGoogle = (callback = ()=>{}) => { 
    return async(dispatch) => {
        await CheckExpiredToken()
        AuthAPI.logout()
        .then(res => {
            if(res?.data?.status === 200 ){
                dispatch({
                    type: types.RESET_ACCOUNT_INFO,
                })
                removeUser()
                removeAccessToken()
                removeRefreshToken()
                removeTimeRefresh()
                Cookies.remove()
                useNotification.Success({
                    title: "Thành công!",
                    message:"Đăng xuất thành công!",
                    duration: 4
                })
                callback()
            } else {
                useNotification.Error({
                    title: "Lỗi server!",
                    message:"Đăng xuất thất bại!"
                })
            }
        })
        .catch((error)=>{
            useNotification.Error({
                title: "Lỗi server!",
                message:"Đăng xuất thất bại!"
            })
         
        })
      }
      // window.location.reload()
}

const getAllCustomerBooked = (idOwner, callback = ()=>{}) => {
  return async(dispatch) => {
      await CheckExpiredToken()
      dispatch({type: types.GET_USER_OWNER})
      UserAPI.getAllCustomerBooked(idOwner)
      // .then((response)=>response.json())
      .then((result=>{
          if(result.status === 200){
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

const getAllCustomerAdmin= (callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_CUSTOMER_ADMIN})
        UserAPI.getListCustomer()
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_CUSTOMER_ADMIN_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_CUSTOMER_ADMIN_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_CUSTOMER_ADMIN_FAIL
            })
        })
    }
  }

const getAllOwnerAdmin= (callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.GET_OWNER_ADMIN})
        UserAPI.getListOwner()
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.GET_OWNER_ADMIN_SUCCESS,
                    payload: [...result.data.data]
                })
                callback()
            }else{
                dispatch({
                    type: types.GET_OWNER_ADMIN_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.GET_OWNER_ADMIN_FAIL
            })
        })
    }
  }

  const becomeOwner= (id, data, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.BECOME_OWNER})
        UserAPI.becomeOwner(id, data)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.BECOME_OWNER_SUCCESS,
                    payload: {
                        id: id,
                        data: {...result.data.data}
                    }
                })
                useNotification.Success({
                    title: "Thành công!",
                    message:"Bạn đã cấp quyền công ty thành công!"
                })
                callback()
            }else{
                dispatch({
                    type: types.BECOME_OWNER_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.BECOME_OWNER_FAIL
            })
            useNotification.Error({
                title: "Lỗi!",
                message:"Server Error!"
            })
        })
    }
  }

const setActive = (owner, callback = ()=>{}) => {
    return async(dispatch) => {
        await CheckExpiredToken()
        dispatch({type: types.SET_ACTIVE_OWNER})
        UserAPI.setActiveUser(owner._id)
        // .then((response)=>response.json())
        .then((result=>{
            if(result.status === 200){
                dispatch({
                    type: types.SET_ACTIVE_OWNER_SUCCESS,
                    payload: {
                        id: owner._id,
                        data: {...result.data.user}
                    }
                })
                useNotification.Success({
                    title: "Thành công!",
                    message:`Bạn đã ${owner?.active ? 'ngừng' : 'thiết lập'} hoạt động công ty ${owner?.companyName}!`
                })
                callback()
            }else{
                dispatch({
                    type: types.SET_ACTIVE_OWNER_FAIL
                })
            }
        }))
        .catch((error)=>{
            dispatch({
                type: types.SET_ACTIVE_OWNER_FAIL
            })
            useNotification.Error({
                title: "Lỗi!",
                message:"Server Error!"
            })
        })
    }
  }


export {
    setAccountInfo,
    loginWithGoogle,
    logoutGoogle,
    getAllCustomerBooked,
    getAllCustomerAdmin,
    getAllOwnerAdmin,
    becomeOwner,
    setActive
}