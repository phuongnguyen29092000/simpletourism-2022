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
import './styles/common/layout.scss'
import './styles/common/TourForm.scss'
import './styles/common/slide.scss'
import './styles/component/CommonHeader.scss'
import './styles/component/ListTour.scss'
import './styles/component/ListTicket.scss'
import './styles/component/Modal.scss'
import './styles/component/OutstandingTour.scss'
import './styles/component/HotPlaces.scss'
import './styles/component/Login.scss'
import './styles/component/TourDetail.scss'
import './styles/component/Footer.scss'
import { useEffect } from 'react'
import {gapi} from 'gapi-script'
import { getUser } from 'hooks/localAuth'
import { setAccountInfo } from 'redux/reducers/user/action'

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
          <Routes>
            {/* <Route path="/" exact element={<SideBar />} /> */}
          </Routes>
        <OwnerRoutes/>
        <UserRoutes/>
          {/* <Header /> */}
          {/* <HomePage/> */}
        </div>
      </BrowserRouter>
  );
}

export default App;