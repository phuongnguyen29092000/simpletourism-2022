const getAllTour = () => {
    // const token = getAccessToken()
    let myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${token}`)
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
  
    return fetch(`/tour`, requestOptions)
}

export default {
    getAllTour
}