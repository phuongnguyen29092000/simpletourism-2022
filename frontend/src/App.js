import { Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/common/sidebar.css'
import SideBar from './components/SideBar';
import Header from './containers/Header';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux'
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        <Route path="/admin" exact element={<SideBar />} />
      </Routes>
      {/* <Header/> */}
      {/* <HomePage/> */}
    </div>
    </Provider>
  );
}

export default App;