import './App.css';
import PublicView from './Pages/PublicView'
import PrivateView from './Pages/PrivateView';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo,setUserInfo] = useState([])

  return (
    // <div className=''>f
    //   <PublicView/>
    //   {/* <PrivateView/> */}
    // </div>

    <Router>
      <Routes>
        <Route path='/' element={<PublicView />} />
        <Route path='/signup' element={<Signup setUserInfo={setUserInfo} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} />} />
        <Route path='/privateview' element={ <PrivateView isAuthenticated={isAuthenticated} userInfo={userInfo} setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo} /> } ></Route>
      </Routes>
    </Router>
  );
}

export default App;
