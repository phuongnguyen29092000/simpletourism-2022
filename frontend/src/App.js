import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/common/sidebar.css'
import SideBar from './components/SideBar'
import Header from './containers/Header'
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux'
import store from './store';
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
import { useEffect } from 'react'
import {gapi} from 'gapi-script'

function App() {
  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: process.env.REACT_GOOGLE_CLIENT_ID,
        scope:""
      })
    }
    gapi.load('client:auth2', start)
  })
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;