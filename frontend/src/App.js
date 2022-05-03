import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/common/sidebar.css'
import SideBar from './components/SideBar';
import Header from './containers/Header';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux'
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import OwnerRoutes from './route/ownerRoutes';
import './styles/common/layout.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/admin" exact element={<SideBar />} />
          </Routes>
        <OwnerRoutes/>
          {/* <Header /> */}
          {/* <HomePage/> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;