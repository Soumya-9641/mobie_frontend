
import './App.css';
import Navbar from './components/Navbar';
import styles from "./style"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mobile from './pages/Mobile';
import Home from './pages/Home';
import Orders from './pages/Orders';
import UpdateMobile from './pages/UpdateMobile';
import CreateMobile from './pages/CreateMobile';

import {  Routes, Route } from "react-router-dom"
function App() {
 
 
  return (
    <div className="">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/>
            </div>
          </div>
          <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Routes>
                      <Route path='/' element={<><Home/></>}/>
                      <Route  path='/login' element={<><Login/></>}/>
                      <Route path='/signup' element={<><Signup/></>}/>
                      <Route  path='/create' element={<><CreateMobile/></>}/>
                      <Route  path='/mobile/:mobileId' element={<><Mobile/></>}/>
                      <Route  path='/update/:mobileId' element={<><UpdateMobile/></>}/>\
                      <Route  path='/order/:createdBy' element={<><Orders/></>}/>
                    </Routes>
                </div>
          </div>
    </div>
  );
}

export default App;
