import React from 'react'
import NavBar from './components/Navbar/NavBar';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
//import "./App.css"

//import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {

const[showLogin, setShowLogin] = React.useState(false)

  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
    </div>
    </>

  )
}

export default App;
