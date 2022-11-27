import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import SignIn from './SignIn';
import Home from './Home'
import Key from './Key';
import BuySell from './BuySell';
import DashBoard from './Dashboard';
import Trade from './Trade';
import History from './History'
import Strategic from './Strategic';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/sign_in' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/key' element={<Key/>}></Route>
        <Route path='/buysell' element={<BuySell/>}></Route>
        <Route path='/dashboard' element={<DashBoard/>}></Route>
        <Route path='/trade' element={<Trade/>}></Route>
        <Route path='/history' element={<History/>}></Route>
        <Route path='/strategic' element={<Strategic/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
