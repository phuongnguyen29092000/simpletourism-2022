import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/common/sidebar.css'
import SideBar from './components/SideBar'
import Header from './containers/Header'
import HomePage from './pages/HomePage'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import OwnerRoutes from './route/ownerRoutes'
import UserRoutes from './route/userRoutes'
import AdminRoutes from 'route/AdminRoutes'
import './styles/index.scss'
import React, { useEffect } from 'react'
import {gapi} from 'gapi-script'
import { getUser } from 'hooks/localAuth'
import { setAccountInfo } from 'redux/reducers/user/action'
import { ReactNotifications } from 'react-notifications-component'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: process.env.REACT_GOOGLE_CLIENT_ID,
        scope:""
      })
    }
    gapi.load('client:auth2', start)
  })
  useEffect(() => {
    let account = getUser();
    console.log(account)
    if(account) dispatch(setAccountInfo(account))
  },[])
  return (
      <BrowserRouter>
        <div className="App">
          <ReactNotifications/>
          <Routes>
            {/* <Route path="/" exact element={<SideBar />} /> */}
          </Routes>
          <OwnerRoutes/>
          <UserRoutes/>
          <AdminRoutes/>
          {/* <Header /> */}
          {/* <HomePage/> */}
        </div>
      </BrowserRouter>
  );
}

export default App;