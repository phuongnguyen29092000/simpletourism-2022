const getAllTour = () => {
    // const token = getAccessToken()
    let myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${token}`)
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
  
    return fetch(`http://localhost:4000/tour`, requestOptions)
}
const addTour = (data) => {
    // const token = getAccessToken()
    let myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${token}`)
  
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
    }

    return fetch('http://localhost:4000/tour', requestOptions)
}

const deleteTour = (id) => {
    // const token = getAccessToken()
    let myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${token}`)
    myHeaders.append({'content-type': 'multipart/form-data'})
  
    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(),
    }

    return fetch(`http://localhost:4000/tour/${id}`, requestOptions)
}



export default {
    getAllTour,
    addTour,
    deleteTour
}