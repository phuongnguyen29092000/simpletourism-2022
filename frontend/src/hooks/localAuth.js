import Cookies from 'js-cookie'

export const setAccessToken = (token) => Cookies.set('token', token)
export const setOrganization = (org) => Cookies.set('organization', org)
export const setRefreshToken = (token) => Cookies.set('refresh_token', token)
export const setUser = (user) => Cookies.set('user', user)
export const setTimeRefresh = (expires_in) => {
  const time = new Date()
  const time_refresh = time.getTime() + expires_in * 1000
  return Cookies.set('time_refresh', time_refresh)
}

export const getAccessToken = () => {
  const token = Cookies.get('token')
  return token && `${Cookies.get('token')}`
}

export const getOrganization = () => {
  const token = Cookies.get('organization')
  return token && `${Cookies.get('organization')}`
}

export const getRefreshToken = () => {
  const token = Cookies.get('refresh_token')
  return token && `${Cookies.get('refresh_token')}`
}

export const getUser = () => {
  const user = Cookies.get('user')
  return user ? JSON.parse(user) : user
}

export const getTimeRefresh = () => {
  const time = Cookies.get('time_refresh')
  return time
}

export const removeAccessToken = () => {
  return Cookies.remove('token')
}

export const removeOrganization = () => {
  return Cookies.remove('organization')
}

export const removeRefreshToken = () => {
  return Cookies.remove('refresh_token')
}

export const removeUser = () => {
  return Cookies.remove('user')
}

export const removeTimeRefresh = () => {
  return Cookies.remove('time_refresh')
}
